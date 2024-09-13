async function CompanyBranding({ canvas, WorkerTimers }) {
        const loadLogo = (url) => {
                return new Promise((resolve) => {
                    const image = new Image();
                    image.src = url;
                    image.onload = () => {
                        resolve(image);
                    }
                    image.crossOrigin = true;
                });
        }
        const logo = await loadLogo('https://s3.ap-south-1.amazonaws.com/cdn.dyte.in/logos/dyte.png');

        const ctx = canvas.getContext('2d');
        const rawVideoFeedElement = document.createElement('video');

        const originalVideoTrack = meeting.self.rawVideoTrack;
        const originalVideoStream = new MediaStream();
        originalVideoStream.addTrack(originalVideoTrack);

        rawVideoFeedElement.addEventListener(
          'play',
          () => {
            canvas.width = rawVideoFeedElement.width
              || originalVideoTrack.getSettings().width;
              canvas.height = rawVideoFeedElement.width
              || originalVideoTrack.getSettings().height;
            
              const intervalTimer = WorkerTimers.setInterval(() => {
                if(!meeting.self.videoEnabled){
                  WorkerTimers.clearInterval(intervalTimer);
                  return;
                }
                ctx.drawImage(rawVideoFeedElement, 0, 0);
                ctx.drawImage(logo, canvas.width - 200, 100, 100, 100);
              }, 50);
          },
          false,
        );

        rawVideoFeedElement.srcObject = originalVideoStream;
        // rawVideoFeedElement.autoplay = true;
        await rawVideoFeedElement.play();
}

// Disable per frame rendering
await meeting.self.setVideoMiddlewareGlobalConfig({disablePerFrameCanvasRendering: true});
// Add middleware
await meeting.self.addVideoMiddleware(CompanyBranding);