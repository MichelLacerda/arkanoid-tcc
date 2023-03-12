class Ball extends Actor {
    constructor(canvas, pos, radius, speed, deadzone, color) {
        super(canvas, pos);
        this.radius = radius;
        this.diameter = radius * 2;
        this.speed = speed;
        this.deadzone = deadzone;
        this.color = color;
        this.direction = new Vector(-1, -1);
        this.rect = new Rectangle(0, 0, 0, 0);
    }

    update(dt) {
        this.bounceCanvas();
        this.position = this.position.add(this.direction.multiply(dt * this.speed));
        
        this.rect.x = this.position.x - this.radius;
        this.rect.y = this.position.y - this.radius;
        this.rect.width = this.diameter;
        this.rect.height = this.diameter;
    }

    draw() {
        fill(this.color);
        circle(this.position.x, this.position.y, this.diameter);
        // this.drawDebug();
    }

    drawDebug() {
        noFill();
        stroke(255, 0, 0);
        rect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
    }

    bounceCanvas() {
        if (this.position.x - this.radius <= 0.0 || this.position.x + this.radius >= this.canvas.width) {
            this.direction.x *= -1;
            sfx.ball?.play();
        }

        if (this.position.y - this.radius <= 0.0 || this.position.y + this.radius >= this.canvas.height) {
            this.direction.y *= -1;
            sfx.ball?.play();
        }
    }

    checkCollisionWithPaddle(paddle) {
        if (this.isColliding(paddle)) {
            this.invertDirectionY();
            sfx.ball?.play();
        }
    }

    checkCollisionWithBrick(brick) {
        if (this.isColliding(brick)) {
            this.invertDirectionY();
            return true
        }

        return false;
    }

    invertDirectionY() {
        this.direction.y *= -1;
    }

    isColliding(other) {
        return this.rect.x < other.rect.x + other.rect.width &&
            other.rect.x < this.rect.x + this.rect.width &&
            this.rect.y < other.rect.y + other.rect.height &&
            other.rect.y < this.rect.y + this.rect.height; 
    }

    isDead() {
        return this.position.y > this.deadzone;
    }
}