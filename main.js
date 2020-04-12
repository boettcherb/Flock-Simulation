const numCanvases = 3;
const canvases = [];
for (let i = 1; i <= numCanvases; ++i) {
    canvases.push(new Canvas('canvas' + i));
}

const inputIDs = ['count', 'speed'];
function getInputs() {
    let inputValues = [];
    for (let id of inputIDs) {
        inputValues.push(document.getElementById(id).value);
    }
    return inputValues;
}

window.addEventListener('resize', resizeCanvases);

function resizeCanvases() {
    canvases.forEach(canvas => canvas.resize());
}

let runningCanvas = 0;
function mainLoop() {
    if (runningCanvas !== -1) {
        canvases[runningCanvas].nextFrame(getInputs());
        requestAnimationFrame(mainLoop);
    }
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

requestAnimationFrame(mainLoop);