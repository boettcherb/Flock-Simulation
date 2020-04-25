// resize the canvases when the window resizes
window.addEventListener('resize', resizeCanvases);

const resetButtons = document.getElementsByClassName('reset-button');
for (let button of resetButtons) {
    button.addEventListener('click', resetInputs);
}

// constants defining the IDs and initial values of the range inputs
const inputIDs = [
    ['count0', 'speed0'],
    ['count1', 'speed1', 'perception1', 'separation1'],
    ['count2', 'speed2', 'perception2', 'alignment2'],
    ['count3', 'speed3', 'perception3', 'cohesion3'],
    ['count4', 'speed4', 'perception4', 'separation4', 'alignment4', 'cohesion4']
];
const initialValues = [
    [250, 1.5],
    [250, 2.5, 30, 0.06],
    [250, 2.5, 30, 0.045],
    [250, 2.5, 30, 0.05],
    [250, 2.5, 30, 0.06, 0.045, 0.05]
]

// create the canvases, each with its own id
const numCanvases = 5;
const canvases = new Array(numCanvases);
for (let i = 0; i < numCanvases; ++i) {
    canvases[i] = new Canvas('canvas' + i);
}

// give the range inputs their initial values and an event listener
for (let i = 0; i < inputIDs.length; ++i) {
    for (let j = 0; j < inputIDs[i].length; ++j) {
        const rangeInput = document.getElementById(inputIDs[i][j]);
        rangeInput.value = initialValues[i][j];
        rangeInput.addEventListener('input', getInputs);
    }
}

// the id of the canvas that is currently running (only 1 canvas can run at a time)
let runningCanvas = 0;

// initialize the inputs
getInputs();

// start the main animation loop
requestAnimationFrame(mainLoop);

function getInputs(event) {
    let resetSpeed = false;
    if (event !== undefined) {
        let id = event.target.id;
        if (id.substring(0, id.length - 1) === 'speed') {
            resetSpeed = true;
        }
    }
    if (runningCanvas !== -1) {
        let currentInputs = new Array(inputIDs[runningCanvas]);
        for (let i = 0; i < inputIDs[runningCanvas].length; ++i) {
            currentInputs[i] = document.getElementById(inputIDs[runningCanvas][i]).value;
        }
        canvases[runningCanvas].setInputs(currentInputs, runningCanvas);
        if (resetSpeed) {
            canvases[runningCanvas].setBoidSpeed();
        }
    }
}

function mainLoop() {
    if (runningCanvas !== -1) {
        canvases[runningCanvas].nextFrame();
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

function resetInputs(event) {
    let index = parseInt(event.target.value, 10);
    for (let i = 0; i < inputIDs[index].length; ++i) {
        document.getElementById(inputIDs[index][i]).value = initialValues[index][i];
    }
    canvases[index].setInputs(initialValues[index], index);
}