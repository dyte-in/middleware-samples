// Refer to https://dyte.io/blog/streams-blog/ to learn how to use this middleware

async function CompanyBranding() {
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

    /*
    * Logo URL must allow cross origin retrival otherwise the video will get stuck.
    * Tip: A transparent logo looks much better.
    * Issue: https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#security_and_tainted_canvases
    * Solution for S3: https://aws.amazon.com/premiumsupport/knowledge-center/s3-configure-cors/
    */
    const logo = await loadLogo('https://s3.ap-south-1.amazonaws.com/cdn.dyte.in/logos/dyte.png');

    return (canvas, ctx) => {
        ctx.drawImage(logo, canvas.width - 200, 100, 100, 100)
    };
}

export default CompanyBranding;
