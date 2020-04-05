const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
const boids = [];
for (let i = 0; i < 200; ++i) {
    let X = canvas.width * Math.random();
    let Y = canvas.height * Math.random();
    boids[boids.length] = new Boid(X, Y);
}
drawBoids();

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.95;
    canvas.height = window.innerHeight * 0.95;
}

function drawBoids() {
    boids.forEach(boid => boid.draw(ctx));
}