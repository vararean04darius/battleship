class Ship {
    hitTimes = 0;
    constructor(length) {
        this.length = length;
    }
    hit() {
        if(this.hitTimes < this.length) {
            this.hitTimes++;
        }
    }
    isSunk() {
        if(this.hitTimes == this.length) {
            return true;
        }
        return false;
    }
}
module.exports = Ship;