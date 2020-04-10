class Canvas {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.canvas.addEventListener('click', togglePause);
        this.numBoids = 100;
        this.boids = [];
        for (let i = 0; i < this.numBoids; ++i) {
            let X = this.canvas.width * Math.random();
            let Y = this.canvas.height * Math.random();
            this.boids.push(new Boid(X, Y));
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resize() {
        this.canvas.width = this.canvas.parentElement.clientWidth * 0.9;
        const screenRatio = window.innerHeight / window.innerWidth;
        this.canvas.height = this.canvas.width * screenRatio;
    }

    nextFrame() {
        this.clear();
        this.boids.forEach(boid => boid.update(this.canvas.width, this.canvas.height));
        this.boids.forEach(boid => boid.draw(this.ctx));
    }
}