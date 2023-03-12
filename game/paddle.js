class Paddle extends Actor {
    constructor(canvas, pos, width, height, speed, color) {
        super(canvas, pos);
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.color = color;
        this.rect = new Rectangle(0, 0, width, height)

        this.direction = new Vector(0, 0);
    }

    input() {
        this.direction = new Vector(0, 0);

        if (keyIsDown(LEFT_ARROW) || keyIsDown(A_KEY)) {
            this.direction.x -= 1;
        }

        if (keyIsDown(RIGHT_ARROW) || keyIsDown(D_KEY)) {
            this.direction.x += 1;
        }

        this.direction = this.direction.normalize();
    }

    update(dt) {
        this.position.x += this.direction.multiply(this.speed).multiply(dt).x;
        this.position.x = clamp(this.position.x, 0, this.canvas.width - this.width);
        this.rect.x = this.position.x;
        this.rect.y = this.position.y;
    }

    draw() {
        noStroke();
        fill(this.color);
        rect(this.position.x, this.position.y, this.width, this.height);

        //  this.drawDebug()
    }

    drawDebug() {
        noFill();
        stroke(255, 0, 0);
        rect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
    }
}