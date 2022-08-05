// Refer to https://dyte.io/blog/streams-blog/ to learn how to use this middleware

async function SpecifyUserRole() {
    const roles = ['Doctor', 'Patient'];
    const randomRole = roles[Math.floor(Math.random()*roles.length)];
    return (canvas, ctx) => {
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.font = '20px serif';
        ctx.fillText(randomRole, canvas.width / 5, canvas.height / 5);
    };
}

export default SpecifyUserRole;
