/**
 * NOTE(ravindra-dyte):
 * This is a sample Video middleware to indicate how a video middleware will look like
 * This is NOT a DEFAULT middlware by any means & is not being used in sdk work flow
 * This file is kept in .js format to have plug & play sample
 */

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
