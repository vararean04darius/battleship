
console.log("This is the place of the ship class and all it's methods")

class Ship {
    hitTimes = 0;
    constructor(length) {
        this.length = length;
    }
    hit() {
        this.hitTimes++;
    }
    isSunk() {
        if(this.hitTimes == this.length) {
            return true;
        }
        return false;
    }
}