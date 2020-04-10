const numCanvases = 3;
const canvases = [];
for (let i = 1; i <= numCanvases; ++i) {
    canvases.push(new Canvas('canvas' + i));
}

window.addEventListener('resize', resizeCanvases);

function resizeCanvases() {
    canvases.forEach(canvas => canvas.resize());
}

function togglePause(clickEvent) {
    const id = clickEvent.target.id;
    const number = parseInt(id.slice(-1), 10) - 1;
    if (runningCanvas === number) {
        runningCanvas = -1;
    } else {
        runningCanvas = number;
        requestAnimationFrame(mainLoop);
    }
}

let runningCanvas = 0;
function mainLoop() {
    if (runningCanvas !== -1) {
        canvases[runningCanvas].nextFrame();
        requestAnimationFrame(mainLoop);
    }
}

requestAnimationFrame(mainLoop);