const BOID_SIZE = 6.5;

class Boid {
    constructor(x, y) {
        this.position = new Vector2D(x, y);
        const velX = Math.random() * 10 - 5;
        const velY = Math.random() * 10 - 5;
        this.velocity = new Vector2D(velX, velY);
        this.acceleration = new Vector2D();
        this.points = [[], [], []];
        switch(Math.floor(Math.random() * 5)) {
            case 0: this.color = '#14e0ff'; break;
            case 1: this.color = '#34c8f5'; break;
            case 2: this.color = '#34b4f5'; break;
            case 3: this.color = '#348cf5'; break;
            case 4: this.color = '#3478d5'; break;
        }
    }

    distTo(otherBoid) {
        const xDist = this.position.x - otherBoid.position.x;
        const yDist = this.position.y - otherBoid.position.y;
        return Math.sqrt(xDist * xDist + yDist * yDist);
    }

    update(boids, inputs) {
        this.acceleration.add(this.flock(boids, inputs));
        this.velocity.add(this.acceleration);
        this.velocity.limit(inputs[1]);
        this.position.add(this.velocity);
        this.acceleration.multiply(0);
    }

    wrap(maxX, maxY) {
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

    flock(boids, inputs) {
        let numPerceivedBoids = 0;
        let toocloseBoids = 0;
        let separation = new Vector2D();
        let alignment = new Vector2D();
        let cohesion = new Vector2D();
        let maxSpeed = inputs[1];

        for (let other of boids) {
            const dist = this.distTo(other);
            if (dist > 0 && dist < inputs[2]) {
                ++numPerceivedBoids;
                if (dist < inputs[2] / 2) {
                    ++toocloseBoids;
                    // separation
                    let diff = new Vector2D(this.position.x, this.position.y);
                    diff.subtract(other.position);
                    diff.divide(dist);
                    separation.add(diff);
                }
                // alignment
                alignment.add(other.velocity);
                // cohesion
                cohesion.add(other.position);
            }
        }

        let steer = new Vector2D();
        if (toocloseBoids > 0) {
            separation.divide(toocloseBoids);
            separation.setMagnitude(maxSpeed);
            separation.subtract(this.velocity);
            separation.limit(inputs[3]);
            steer.add(separation);
        }
        if (numPerceivedBoids > 0) {
            alignment.divide(numPerceivedBoids);
            alignment.setMagnitude(maxSpeed);
            alignment.subtract(this.velocity);
            alignment.limit(inputs[4]);
            steer.add(alignment);

            cohesion.divide(numPerceivedBoids);
            cohesion.subtract(this.position);
            cohesion.setMagnitude(maxSpeed);
            cohesion.subtract(this.velocity);
            cohesion.limit(inputs[5]);
            steer.add(cohesion);
        }
        return steer;
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