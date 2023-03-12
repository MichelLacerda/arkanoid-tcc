class Brick extends Actor {

    constructor(canvas, pos, width, height, color) {
        super(canvas, pos);
        this.width = width;
        this.height = height;
        this.color = color;
        this.rect = new Rectangle(pos.x, pos.y, width, height);
    }

    
    draw() {
        noStroke()
        fill(this.color);
        rect(this.position.x, this.position.y, this.width, this.height);

        // this.drawDebug()
    }

    drawDebug() {
        noFill();
        stroke(255, 0, 0);
        rect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
    }
}