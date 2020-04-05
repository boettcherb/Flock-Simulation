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

    normalize() {
        const magnitude = this.getMagnitude();
        if (magnitude > 0) {
            this.x /= magnitude;
            this.y /= magnitude;
        }
    }

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
                angle -= Math.PI - Math.atan(this.y / this.x);
            } else {
                angle += Math.PI + Math.atan(-this.y / this.x);
            }
        } else {
            return y < 0 ? angle : -angle;
        }
        return angle;
    }
}