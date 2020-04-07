class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    setMagnitude(newMagnitude) {
        this.normalize();
        this.x *= newMagnitude;
        this.y *= newMagnitude;
    }

    scale(scaleValue) {
        this.x *= scaleValue;
        this.y *= scaleValue;
    }

    add(otherVector) {
        this.x += otherVector.x;
        this.y += otherVector.y;
    }

    subtract(otherVector) {
        this.x -= otherVector.x;
        this.y -= otherVector.y;
    }

    // give the vector a magnitude of 1
    normalize() {
        const magnitude = this.getMagnitude();
        if (magnitude > 0) {
            this.x /= magnitude;
            this.y /= magnitude;
        }
    }

    // In computer graphics, the coordinate system has the origin at the top
    // left of the screen. +y is downwards. This explains the inverted +/-
    // inside the atan functions.
    // When I draw the boid, I consider an angle of zero to be pointed 
    // upwards, but on the coordinate plane this is an angle of PI / 2.
    // (this is why the angle starts at PI / 2)
    angle() {
        let angle = Math.PI / 2; 
        if (this.x > 0) {
            if (this.y < 0) {
                angle += Math.atan(-this.y / this.x); // first quadrant
            } else {
                angle -= Math.atan(this.y / this.x); // fourth quadrant
            }
        } else if (this.x < 0) {
            if (this.x > 0) {
                angle -= Math.PI - Math.atan(this.y / this.x); // second quadrant
            } else {
                angle += Math.PI + Math.atan(-this.y / this.x); // fourth quadrant
            }
        } else {
            // if x is zero, come here (so I don't divide by zero)
            return y < 0 ? angle : -angle;
        }
        return angle;
    }
}