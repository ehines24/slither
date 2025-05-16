const create_canvas = () => {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    console.log("Loaded canvas.");
    ctx.fillStyle = "green";
    ctx.fillRect(0,0,640,480);
};
window.onload = create_canvas;