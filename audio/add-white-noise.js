// Refer to https://dyte.io/blog/streams-blog/ to learn how to use this middlewares

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
