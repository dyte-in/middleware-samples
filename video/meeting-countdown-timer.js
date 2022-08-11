// Refer to https://dyte.io/blog/streams-blog/ to learn how to use this middleware

async function CountdownTimer() {
    
    function convertSecondsToHHMMSS(sec) {
        let hours   = Math.floor(sec / 3600); // get hours
        let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
        let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
        
        // add 0 if value < 10; Example: 2 => 02
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}

        return hours+':'+minutes+':'+seconds; // Result in HH : MM : SS format
    }

    const meetingTill = new Date().getTime() + 1800000; // current + 30 mins
    return (canvas, ctx) => {
        let remainingSeconds = Math.floor((meetingTill - new Date().getTime()) / 1000);
        remainingSeconds = remainingSeconds > 0 ? remainingSeconds : 0; // fail-safe
    
        const timeRemainingInHHMMSS = convertSecondsToHHMMSS(remainingSeconds);
        ctx.font = '30px serif';
        ctx.fillText(timeRemainingInHHMMSS, canvas.width * 4 / 5, canvas.height / 5);
    };
}

export default CountdownTimer;