const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

window.addEventListener('resize', resizeCanvas);
canvas.addEventListener('click', togglePause);

resizeCanvas();
let running = true;
const boids = [];
for (let i = 0; i < 200; ++i) {
    let X = canvas.width * Math.random();
    let Y = canvas.height * Math.random();
    boids.push(new Boid(X, Y));
}
requestAnimationFrame(mainLoop);

function mainLoop() {
    clearCanvas();
    boids.forEach(boid => boid.update(canvas.width, canvas.height));
    boids.forEach(boid => boid.draw(ctx));
    if (running) {
        requestAnimationFrame(mainLoop);
    }
}

function resizeCanvas() {
    // set the canvas width to 90% of the parent element's width
    console.log(canvas.parentElement);
    canvas.width = canvas.parentElement.clientWidth * 0.9;
    // make the canvas width to height ratio the same as the screen 
    const screenRatio = window.innerHeight / window.innerWidth;
    canvas.height = canvas.width * screenRatio;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function togglePause() {
    running = !running;
    if (running) {
        requestAnimationFrame(mainLoop);
    }
}