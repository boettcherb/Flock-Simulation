window.addEventListener('resize', resizeCanvases);

const numCanvases = 3;
const canvases = [];
for (let i = 1; i <= numCanvases; ++i) {
    canvases.push(new Canvas('canvas' + i));
}

const inputIDs = ['count', 'speed', 'perception', 'separation', 'alignment', 'cohesion'];
for (let id of inputIDs) {
    document.getElementById(id).addEventListener('input', getInputs);
}

const inputValues = new Array(inputIDs.length);
getInputs();

let runningCanvas = 0;
requestAnimationFrame(mainLoop);

function getInputs() {
    for (let i = 0; i < inputIDs.length; ++i) {
        inputValues[i] = document.getElementById(inputIDs[i]).value;
    }
}

function mainLoop() {
    if (runningCanvas !== -1) {
        canvases[runningCanvas].nextFrame(inputValues);
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

function resizeCanvases() {
    canvases.forEach(canvas => canvas.resize());
}