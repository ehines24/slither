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
/**
 * This function sets up the background and title block for the slither game.
 * 
 * @param {Number} width - The width of the canvas to draw on. 
 * @param {Number} height - The height of the canvas to draw on. 
 * @returns {{ ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement }}
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
        return { ctx, canvas };
    };
};
/**
 * Draw a grid onto a canvas with a given width, height, and lineSpacing, and starting height. 
 * 
 * @param {CanvasRenderingContext2D} ctx - The canvas context to render the grid on.
 * @param {Number} width - Width of the canvas that we are rendering the grid on
 * @param {Number} height - Height of the canvas that we are rendering the grid on. 
 * @param {*} lineSpacing - Into what pieces of equal size should we space out the lines.
 * @param {*} startingHeight - Allows for a banner to take up the first chunk of the canvas.
 */
const draw_grid = (ctx, width, height, lineSpacing = 10, startingHeight=60) => {
    // CSS colors are supported here
    // Stroke styles can be used with format strings to programmatically change throughout a for loop
    // Or you can use the CanvasGradient object
    ctx.strokeStyle = "#FFFFFF";
    ctx.fillStyle = "#AAA";
    ctx.fillRect(0,0, width, startingHeight);
    let grid = new Path2D();
    for(let i = 0; i < width; i+=lineSpacing) {
       // Align the stroke edges with the pixel boundaries by adding 0.5
       grid.moveTo(i+0.5, startingHeight);
       grid.lineTo(i+0.5,height);
    }
    for(let j = startingHeight; j < height; j+=lineSpacing) {
       grid.moveTo(0,j+.5);
       grid.lineTo(width,j+.5);
    }
    ctx.stroke(grid);
};   

/**
     * The future location of the gameplay loop function.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context for the gameplay loop.
     * @param {Int} width - The width of the canvas to draw to. 
     * @param {Int} height - The height of the canvas to draw to.
     * @returns {null}
     */
const loop = (ctx, width = 640, height=480) => {
    /**
     * Basic animation where the snake moves from left to right on the screen. 
     * 
     * @returns {null}
     */ 
    const basic_animate_snake = () => {
        ctx.fillRect(0+x,60+y,10,10);
        // Keep the snake on screen
        if (x > width-10 || x < 0) {
            mvmt_factor = -mvmt_factor;
            y+=Math.abs(mvmt_factor);
            intermediate_x = x < 0 ? x+10 : x-10;
            ctx.fillRect(intermediate_x, 60+y, 10,10);
            y+=Math.abs(mvmt_factor);
        }
        if (y > height) {
            return;
        }
        x += mvmt_factor; 
        ctx.restore();
        window.requestAnimationFrame(basic_animate_snake);
    };   

    ctx.fillStyle = "#FFF";
    let mvmt_factor = 10;
    let x = 0;
    let y = 0;
    window.requestAnimationFrame(basic_animate_snake);
}

const main = () => {
    const { ctx, canvas } = create_canvas(640,480);
    console.log(ctx);
    loop(ctx);
}

window.onload = main;
