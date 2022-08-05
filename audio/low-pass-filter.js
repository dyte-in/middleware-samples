// Refer to https://dyte.io/blog/streams-blog/ to learn how to use this middlewares

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
