const BOID_SIZE = 6.5;

class Boid {
    constructor(x, y) {
        this.position = new Vector2D(x, y);
        const velX = Math.random() * 10 - 5;
        const velY = Math.random() * 10 - 5;
        this.velocity = new Vector2D(velX, velY);
        this.points = [[], [], []];
        switch(Math.floor(Math.random() * 5)) {
            case 0: this.color = '#14e0ff'; break;
            case 1: this.color = '#34c8f5'; break;
            case 2: this.color = '#34b4f5'; break;
            case 3: this.color = '#348cf5'; break;
            case 4: this.color = '#3478d5'; break;
        }
    }

    setSpeed() {
        const speedInput = document.getElementById('boid-speed');
        this.velocity.setMagnitude(speedInput.value);
        speedInput.nextElementSibling.innerText = `Speed: ${ speedInput.value } px / frame`;
    }

    update(maxX, maxY) {
        this.setSpeed();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        // wrap around
        if (this.position.x < 0) {
            this.position.x = maxX;
        } else if (this.position.x > maxX) {
            this.position.x = 0;
        }
        if (this.position.y < 0) {
            this.position.y = maxY;
        } else if (this.position.y > maxY) {
            this.position.y = 0;
        }
    }

    draw(ctx) {
        this.setPoints(this.velocity.angle());
        ctx.fillStyle = this.color;
        ctx.beginPath();
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