class Canvas {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.canvas.addEventListener('click', togglePause);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.boids = [];
        this.currentInputs = [];
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
        this.setNumBoids(this.currentInputs[0]);
        this.boids.forEach(boid => {
            boid.update(this.boids, this.currentInputs);
            boid.wrap(this.canvas.width, this.canvas.height);
            boid.draw(this.ctx);
        });
    }

    setInputs(inputs, runningCanvas) {
        let arr = [];
        this.currentInputs = new Array();
        this.currentInputs.push(inputs[0]);
        this.currentInputs.push(inputs[1]);
        switch (runningCanvas) {
            case 0: arr = [null, null, null, null]; break;
            case 1: arr = [inputs[2], inputs[3], null, null]; break;
            case 2: arr = [inputs[2], null, inputs[3], null]; break;
            case 3: arr = [inputs[2], null, null, inputs[3]]; break;
            case 4: arr = [inputs[2], inputs[3], inputs[4], inputs[5]]; break;
        }
        for (let element of arr) {
            this.currentInputs.push(element);
        }
        console.log(this.currentInputs);
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