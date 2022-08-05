// Refer to https://dyte.io/blog/streams-blog/ to learn how to use this middlewares

function RetroTheme() {
    return (canvas, ctx) => {
        ctx.filter = 'grayscale(1)';
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 20;
        ctx.lineWidth = 50;
        ctx.strokeStyle = '#000';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    };
}

export default RetroTheme;
