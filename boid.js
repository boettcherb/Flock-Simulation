class Boid {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        ctx.fillStyle = '#34b4f5'
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 3, this.y + 12);
        ctx.lineTo(this.x - 3, this.y + 12);
        ctx.fill();
    }
}