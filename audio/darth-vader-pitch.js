/**
 * NOTE(ravindra-dyte):
 * This is a sample Audio middleware to indicate how a audio middleware will look like
 * This is NOT a DEFAULT middlware by any means & is not being used in sdk work flow
 * This file is kept in .js format to have plug & play sample
*/

function darthVaderPitch(audioContext) {
    function getHanningWindow(length) {
        const hanningWindow = new Float32Array(length);
        for (let i = 0; i < length; i += 1) {
            hanningWindow[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (length - 1)));
        }
        return hanningWindow;
    }

    function linearInterpolation(a, b, t) {
        return a + (b - a) * t;
    }

    const grainSize = 256;
    const pitchRatio = 0.65; // 0.5 darth vader to 2 kid, 0.65 is best
    const overlapRatio = 0;

    const pitchShifterProcessor = audioContext.createScriptProcessor(grainSize, 1, 1);

    pitchShifterProcessor.buffer = new Float32Array(grainSize * 2);
    pitchShifterProcessor.grainWindow = getHanningWindow(grainSize);

    pitchShifterProcessor.onaudioprocess = function onaudioprocess(event) {
        const inputData = event.inputBuffer.getChannelData(0);
        const outputData = event.outputBuffer.getChannelData(0);

        for (let i = 0; i < inputData.length; i += 1) {
            // Apply the window to the input buffer
            inputData[i] *= this.grainWindow[i];

            // Shift half of the buffer
            this.buffer[i] = this.buffer[i + grainSize];

            // Empty the buffer tail
            this.buffer[i + grainSize] = 0.0;
        }

        // Calculate the pitch shifted grain re-sampling and looping the input
        const grainData = new Float32Array(grainSize * 2);
        for (let i = 0, j = 0.0;
            i < grainSize;
            i += 1, j += pitchRatio) {
            const index = Math.floor(j) % grainSize;
            const a = inputData[index];
            const b = inputData[(index + 1) % grainSize];
            grainData[i] += linearInterpolation(a, b, j % 1.0) * this.grainWindow[i];
        }

        // Copy the grain multiple times overlapping it
        for (let i = 0; i < grainSize; i += Math.round(grainSize * (1 - overlapRatio))) {
            for (let j = 0; j <= grainSize; j += 1) {
                this.buffer[i + j] += grainData[j];
            }
        }

        // Output the first half of the buffer
        for (let i = 0; i < grainSize; i += 1) {
            outputData[i] = this.buffer[i];
        }
    };

    return pitchShifterProcessor;
}

export default darthVaderPitch;
