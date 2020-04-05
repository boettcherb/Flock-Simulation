const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const boid = new Boid(80, 40);
boid.draw(ctx);

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.95;
    canvas.height = window.innerHeight * 0.95;
}