// resize the canvases whenever the window resizes
window.addEventListener('resize', resizeCanvases);

// constants for the canvases
const numCanvases = 5;
const canvasBehaviors = [
    [1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 0, 0],
    [1, 1, 1, 0, 1, 0],
    [1, 1, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1]
];

// create the canvases, each with its own id
const canvases = [];
for (let i = 0; i < numCanvases; ++i) {
    canvases.push(new Canvas('canvas' + i));
}

// constants defining the IDs and initial values of the range inputs
const inputIDs = ['count', 'speed', 'perception', 'separation', 'alignment', 'cohesion'];
const initialInputValues = [250, 1.5, 30, 0.06, 0.045, 0.05];

// set the initial values of the range inputs
for (let i = 0; i < inputIDs.length; ++i) {
    document.getElementById(inputIDs[i]).value = initialInputValues[i];
}

// give each range input an input listener
for (let id of inputIDs) {
    document.getElementById(id).addEventListener('input', getInputs);
}

// an array to hold the current input values.
const inputValues = new Array(inputIDs.length);

// the id of the canvas that is currently running (only 1 canvas can run at a time)
let runningCanvas = 0;

// initialize the inputs
getInputs();

// start the main animation loop
requestAnimationFrame(mainLoop);

function getInputs(event) {
    let resetSpeed = event !== undefined && event.target.id === 'speed';
    if (runningCanvas !== -1) {
        for (let i = 0; i < inputIDs.length; ++i) {
            inputValues[i] = document.getElementById(inputIDs[i]).value;
            inputValues[i] *= canvasBehaviors[runningCanvas][i];
        }
        if (resetSpeed) {
            for (let boid of canvases[runningCanvas].boids) {
                boid.velocity.setMagnitude(inputValues[1]);
            }
        }
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
    const number = parseInt(id.slice(-1), 10);
    if (runningCanvas === number) {
        runningCanvas = -1;
    } else {
        runningCanvas = number;
        getInputs();
        requestAnimationFrame(mainLoop);
    }
}

function resizeCanvases() {
    canvases.forEach(canvas => canvas.resize());
}