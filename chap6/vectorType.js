// My solution is probably not completely correct, as the methods plus and
// minus manipulate the x and y values of the current vector instead
// of returning a new vector.

class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    plus({ x, y }) {
        this.x = this.x + x;
        this.y = this.y + y;
        return this;
    }
    minus({ x, y }) {
        this.x = this.x - x;
        this.y = this.y - y;
        return this;
    }
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5

/* 

Solution Haverbeke:

class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }

    minus(other) {
        return new Vec(this.x - other.x, this.y - other.y);
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

*/
