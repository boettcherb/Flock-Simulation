class Canvas {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.canvas.addEventListener('click', togglePause);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.boids = [];
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resize() {
        this.canvas.width = this.canvas.parentElement.clientWidth * 0.9;
        const screenRatio = window.innerHeight / window.innerWidth;
        this.canvas.height = this.canvas.width * screenRatio;
    }

    nextFrame(inputs) {
        this.clear();
        this.setNumBoids(inputs[0]);
        this.boids.forEach(boid => {
            boid.update(this.boids, inputs);
            boid.wrap(this.canvas.width, this.canvas.height);
            boid.draw(this.ctx);
        });
    }

    setNumBoids(numBoids) {
        for (let i = this.boids.length; i < numBoids; ++i) {
            let X = this.canvas.width * Math.random();
            let Y = this.canvas.height * Math.random();
            this.boids.push(new Boid(X, Y));
        }
        for (let i = this.boids.length; i > numBoids; --i) {
            this.boids.pop();
        }
    }
}