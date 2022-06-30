/**
 * NOTE(ravindra-dyte):
 * This is a sample Audio middleware to indicate how a audio middleware will look like
 * This is NOT a DEFAULT middlware by any means & is not being used in sdk work flow
 * This file is kept in .js format to have plug & play sample
 */

function lowPassFilter(audioContext) {
    const bufferSize = 512;
    let lastOut = 0.0;
    const lowPassFilterProcessor = audioContext.createScriptProcessor(bufferSize, 1, 1);
    lowPassFilterProcessor.onaudioprocess = function onaudioprocess(e) {
        const input = e.inputBuffer.getChannelData(0);
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i += 1) {
            output[i] = (input[i] + lastOut) / 2.0;
            lastOut = output[i];
        }
    };
    return lowPassFilterProcessor;
}

export default lowPassFilter;
