/*
Transformation matrix
a c e 
b d f
0 0 1

a scales horizontally
b skews horizontally (makes vertical lines angled by b radians)
c skews vertically (makes horizontal line angled by b radians)
d scales vertically
e horizontal moving
f vertical moving 
*/
const create_canvas = (width, height) => {
    const canvas = document.getElementById("game");
    console.log(`The canvas is ${canvas}`);
    if(canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.fillRect(0,0,width,height);
        draw_grid(ctx, width, height);
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        ctx.fillStyle = "green";
        ctx.shadowColor = "rgb(0 0 0 / 50%)";
        ctx.font = "48px sans-serif";
        ctx.fillText("Slither", 250, 48);
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        return ctx;
    };
};
const draw_grid = (ctx, width, height, divFactor = 10, startingHeight=60) => {
    // CSS colors are supported here
    // Stroke styles can be used with format strings to programmatically change throughout a for loop
    // Or you can use the CanvasGradient object
    ctx.strokeStyle = "#FFFFFF";
    ctx.fillStyle = "#AAA";
    console.log("here");
    ctx.fillRect(0,0, width, startingHeight);
    let grid = new Path2D();
    console.log("Here too!");
    for(let i = 0; i < width; i+=divFactor) {
       grid.moveTo(i+.5, startingHeight);
       grid.lineTo(i+.5,height);
    }
    for(let j = startingHeight; j < height; j+=divFactor) {
       grid.moveTo(0,j+.5);
       grid.lineTo(width,j+.5);
    }
    ctx.stroke(grid);
};   


const loop = (ctx, width = 640, height=480) => {
    const animate_square = () => {
        console.log("Executing the next frame of animation.");
        ctx.fillRect(0+x,60+y,10,10);
        if (x > width || x < 0) {
            mvmt_factor = -mvmt_factor;
            y+=Math.abs(mvmt_factor);
            console.log(width+mvmt_factor);
            ctx.fillRect(x+mvmt_factor*2, 60+y, 10,10);
            y+=Math.abs(mvmt_factor);

        }
        if (y > height) {
            return;
        }
        x += mvmt_factor; 
        ctx.restore();
        window.requestAnimationFrame(animate_square);
    };   
    ctx.fillStyle = "#FFF";
    let mvmt_factor = 10;
    let x = 0;
    let y = 0;
    window.requestAnimationFrame(animate_square);
}

const main = () => {
    const ctx = create_canvas(640,480);
    console.log("The canvas was created.");
    loop(ctx);
}

window.onload = main;