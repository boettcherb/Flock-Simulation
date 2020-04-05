const BOID_SIZE = 6.5;

class Boid {
    constructor(x, y) {
        this.position = new Vector2D(x, y);
        const velX = Math.random() * 10 - 5;
        const velY = Math.random() * 10 - 5;
        this.velocity = new Vector2D(velX, velY);
        this.velocity.normalize();
        this.points = [[], [], []];
        switch(Math.floor(Math.random() * 5)) {
            case 0: this.color = '#14e0ff'; break;
            case 1: this.color = '#34c8f5'; break;
            case 2: this.color = '#34b4f5'; break;
            case 3: this.color = '#348cf5'; break;
            case 4: this.color = '#3478d5'; break;
        }
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        this.setPoints(this.velocity.angle());
        ctx.moveTo(this.points[0][0], this.points[0][1]);
        ctx.lineTo(this.points[1][0], this.points[1][1]);
        ctx.lineTo(this.points[2][0], this.points[2][1]);
        ctx.fill();
    }

    setPoints(theta) {
        this.points[0][0] = BOID_SIZE * Math.sin(theta) + this.position.x;
        this.points[0][1] = BOID_SIZE * Math.cos(theta) + this.position.y;
        this.points[1][0] = BOID_SIZE * Math.sin(theta + 2.6) + this.position.x;
        this.points[1][1] = BOID_SIZE * Math.cos(theta + 2.6) + this.position.y;
        this.points[2][0] = BOID_SIZE * Math.sin(theta - 2.6) + this.position.x;
        this.points[2][1] = BOID_SIZE * Math.cos(theta - 2.6) + this.position.y;
    }
}