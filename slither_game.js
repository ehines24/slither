const create_canvas = (width, height) => function() {
    const canvas = document.getElementById("game");
    if(canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.fillRect(0,0,width,height);
        draw_grid(ctx, width, height);
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        ctx.fillStyle = "purple";
        ctx.shadowColor = "rgb(0 0 0 / 50%)";
        ctx.font = "48px sans-serif";
        ctx.fillText("Slither", 250, 48);
    }
};
const draw_grid = (ctx, width, height, divFactor = 10) => {
    // CSS colors are supported here
    // Stroke styles can be used with format strings to programmatically change throughout a for loop
    // Or you can use the CanvasGradient object
    ctx.strokeStyle = "#FFFFFF";
    console.log("here");
    let grid = new Path2D();
    console.log("Here too!");
    for(let i = 10; i < width; i+=divFactor) {
       grid.moveTo(i+.5,0);
       grid.lineTo(i+.5,height);
    }
    for(let j = 10; j < height; j+=divFactor) {
       grid.moveTo(0,j+.5);
       grid.lineTo(width,j+.5);
    }
    ctx.stroke(grid);
};
window.onload = create_canvas(640,480);