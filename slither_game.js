const create_canvas = (width, height) => function() {
    const canvas = document.getElementById("game");
    if(canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.fillRect(0,0,width,height);
        draw_grid(ctx, width, height);
    }
};
const draw_grid = (ctx, width, height, divFactor = 10) => {
    ctx.strokeStyle = "#FFFFFF";
    console.log("here");
    let grid = new Path2D();
    console.log("Here too!");
    for(let i = 10; i < width; i+=divFactor) {
       grid.moveTo(i,0);
       grid.lineTo(i,height);
    }
    for(let j = 10; j < height; j+=divFactor) {
       grid.moveTo(0,j);
       grid.lineTo(width,j);
    }
    ctx.stroke(grid);
};
window.onload = create_canvas(640,480);