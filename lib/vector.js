class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Soma o vetor atual (p) com um novo vetor (q)
    // e retorna um novo vetor 
    add(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    // Subtraí o vetor atual (p) com um novo vetor (q)
    // e retorna um novo vetor
    subtract(other) {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    // Multiplica o vetor atual (p) por um escalar (s)
    // e retorna um novo vetor
    multiply(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    // Divide o vetor atual (p) por um escalar (s)
    // e retorna um novo vetor
    divide(scalar) {
        return new Vector(this.x / scalar, this.y / scalar);
    }

    // Retorna o módulo do vetor atual (p)
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    // Normaliza o vetor para um valor entre 0 e 1
    normalize() {
        const mag = this.magnitude();
        if (mag === 0) {
            return new Vector(0, 0);
        }
        return this.divide(mag);
    }

    // Calcula a distancia entre dois vetores (p e q)
    distance(other) {
        const dx = Math.abs(this.x - other.x);
        const dy = Math.abs(this.y - other.y);
        return Math.sqrt(dx * dx + dy * dy);
    }

    rerp() {
        return { 
            x: this.x,
            y: this.y
         }
    }
}