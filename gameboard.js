const Ship = require('./ship');

class Gameboard {
    constructor() {
        this.ships = 0;
        this.hits = 0;
        this.missed = 0;
        //10x10 board
        this.boardMatrix = new Array(10);
        for(let i = 0; i < this.boardMatrix.length; i++) {
            this.boardMatrix[i] = new Array(10);
        }
    }

    addShip(x, y, length, direction) {
        // x, y >= 0 <=9
        // length >= 1 <= 4
        // direction 'row' || 'col'       
        let newShip = new Ship(length);
        
        if(direction == 'row') {
            while(length >= 1) {
                this.boardMatrix[x][y] = newShip;
                x++;
                length--;
            }
        } else {
            while(length >= 1) {
                this.boardMatrix[x][y] = newShip;
                y++;
                length--;
            }
        }
        this.ships++
    }

    receiveAttack(x, y) {
        if(this.boardMatrix[x][y] != undefined) {
            this.boardMatrix[x][y].hit();
            this.hits++;
        } else {
            this.boardMatrix[x][y] = 'x';
            this.missed++;
        }
    }
}

module.exports = Gameboard;