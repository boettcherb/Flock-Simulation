const BOID_SIZE = 6.5;

class Boid {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.theta = Math.random() * 2 * Math.PI;
        this.points = [[], [], []];
        switch(Math.floor(Math.random() * 5)) {
            case 0: this.color = '#14e0ff'; break;
            case 1: this.color = '#34c8f5'; break;
            case 2: this.color = '#34b4f5'; break;
            case 3: this.color = '#348cf5'; break;
            case 4: this.color = '#3478d5'; break;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        this.setPoints(this.theta);
        ctx.moveTo(this.points[0][0], this.points[0][1]);
        ctx.lineTo(this.points[1][0], this.points[1][1]);
        ctx.lineTo(this.points[2][0], this.points[2][1]);
        ctx.fill();
    }

    setPoints(theta) {
        this.points[0][0] = BOID_SIZE * Math.sin(theta) + this.x;
        this.points[0][1] = BOID_SIZE * Math.cos(theta) + this.y;
        this.points[1][0] = BOID_SIZE * Math.sin(theta + 2.6) + this.x;
        this.points[1][1] = BOID_SIZE * Math.cos(theta + 2.6) + this.y;
        this.points[2][0] = BOID_SIZE * Math.sin(theta - 2.6) + this.x;
        this.points[2][1] = BOID_SIZE * Math.cos(theta - 2.6) + this.y;
    }
}