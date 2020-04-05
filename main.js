const canvas = document.getElementById('canvas');
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
    boids.forEach(boid => boid.update());
    boids.forEach(boid => boid.draw(ctx));
    if (running) {
        requestAnimationFrame(mainLoop);
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.95;
    canvas.height = window.innerHeight * 0.95;
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

function drawBoids() {
    boids.forEach(boid => boid.draw(ctx));
}