/**
 * NOTE(ravindra-dyte):
 * This is a sample Audio middleware to indicate how a audio middleware will look like
 * This is NOT a DEFAULT middlware by any means & is not being used in sdk work flow
 * This file is kept in .js format to have plug & play sample
 */

async function addWhiteNoise(audioContext) {
    const moduleScript = `
            class WhiteNoiseProcessor extends AudioWorkletProcessor {
            process (inputs, outputs, parameters) {
                const output = outputs[0]
                output.forEach(channel => {
                for (let i = 0; i < channel.length; i++) {
                    channel[i] = Math.random() * 1.0 - 0.5
                }
                })
                return true
            }
            }

            registerProcessor('white-noise-processor', WhiteNoiseProcessor);
            `;

    const scriptUrl = URL.createObjectURL(new Blob([moduleScript], { type: 'text/javascript' }));
    await audioContext.audioWorklet.addModule(scriptUrl);

    const whiteNoise = new AudioWorkletNode(audioContext, 'white-noise-processor');
    return whiteNoise;
}

export default addWhiteNoise;
