const Ship = require('./ship');

class Gameboard {
    constructor() {
        this.ships = [];
        this.hits = 0;
        this.missed = 0;
        this.boardMatrix = new Array(10);
        for(let i = 0; i < this.boardMatrix.length; i++) {
            this.boardMatrix[i] = new Array(10);
        }
        this.hitMatrix = new Array(10);
        for(let i = 0; i < this.hitMatrix.length; i++) {
            this.hitMatrix[i] = new Array(10);
        }
    }

    addShip(x, y, length, direction) {   
        let newShip = new Ship(length);
        let newPair = [x, y];
        this.ships.push(newPair);
        if(direction == 'row') {
            while(length >= 1) {
                this.boardMatrix[x][y] = newShip;
                y++;
                length--;
            }
        } else {
            while(length >= 1) {
                this.boardMatrix[x][y] = newShip;
                x++;
                length--;
            }
        }
    }

    receiveAttack(x, y) {
        if(this.boardMatrix[x][y] != undefined) {
            this.boardMatrix[x][y].hit();
            this.hitMatrix[x][y] = 'h'
            this.hits++;
        } else {
            this.hitMatrix[x][y] = 'm'
            this.missed++;
        }
    }
    allSunk() {
        console.log(this.ships)
        for(let i = 0; i < this.ships.length; i++) {
            if(this.boardMatrix[this.ships[i][0]][this.ships[i][1]].isSunk() == false) {
                return false;
            }
        }
        // this.ships.forEach(el => {
        //     if(this.boardMatrix[el[0]][el[1]].isSunk() == false) {
        //         return false;
        //     }
        // });
        return true;
    }
}

module.exports = Gameboard;