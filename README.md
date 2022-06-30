# Dyte stream middlewares

This repo contains the middlewares which can be applied on Dyte's media streams.

Please refer to `audio` and `video` folders to find few sample middlewares.

## Usage

For the `video` middleware, residing in `./video/retro-theme` of this repo, integration will look like the following.

```
//Somewhere in your codebase
const meeting = await DyteClient.init(...);

function RetroTheme() {
		console.log('Initialising RetroTheme');
    return (canvas, ctx) => {
        ctx.filter = 'grayscale(1)';
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 20;
        ctx.lineWidth = 50;
        ctx.strokeStyle = '#000';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    };
}

// Add video middleware
meeting.self.addVideoMiddleware(RetroTheme);
```