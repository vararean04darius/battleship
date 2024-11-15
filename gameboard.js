// const Ship = require('./ship');
import { Ship } from "./ship.js";


export class Gameboard {
    constructor() {
        this.ships = [];
        this.sunk = 0;
        this.missed = 0;
        this.boardMatrix = new Array(10);
        for(let i = 0; i < this.boardMatrix.length; i++) {
            this.boardMatrix[i] = new Array(10);
        }
        this.hitMatrix = new Array(10);
        for(let i = 0; i < this.hitMatrix.length; i++) {
            this.hitMatrix[i] = new Array(10);
        }
        this.enemyMatrix = new Array(10);
        for(let i = 0; i < this.enemyMatrix.length; i++) {
            this.enemyMatrix[i] = new Array(10);
        }
    }

    addShip(x, y, length, direction) {   
        let newShip = new Ship(length);
        let shipArray = [];

        if(direction == 'row') {
            while(length >= 1) {
                this.boardMatrix[x][y] = newShip;
                let newPair = [x, y];
                shipArray.push(newPair)
                y++;
                length--;
            }
        } else {
            while(length >= 1) {
                this.boardMatrix[x][y] = newShip;
                let newPair = [x, y];
                shipArray.push(newPair)
                x++;
                length--;
            }
        }
        this.ships.push(shipArray);
    }

    receiveAttack(x, y) {
        if(this.boardMatrix[x][y] != undefined) {
            this.boardMatrix[x][y].hit();
            this.hitMatrix[x][y] = 'h'
            // add 'c' to all adjacent diagonals
            if(x+1 <= 9 && y+1 <= 9){
                if(this.hitMatrix[x+1][y+1] == undefined) {
                    this.hitMatrix[x+1][y+1] = "c";
                }
            }
            if(x+1 <= 9 && y-1 >= 0){
                if(this.hitMatrix[x+1][y-1] == undefined) {
                    this.hitMatrix[x+1][y-1] = "c";
                }
            }
            if(x-1 >= 0 && y+1 <= 9){
                if(this.hitMatrix[x-1][y+1] == undefined) {
                    this.hitMatrix[x-1][y+1] = "c";
                }
            }
            if(x-1 >= 0 && y-1 >= 0){
                if(this.hitMatrix[x-1][y-1] == undefined) {
                    this.hitMatrix[x-1][y-1] = "c";
                }
            }
            if(this.boardMatrix[x][y].isSunk()) {
                this.sunk++;
                let wholeShip = this.getWholeShip(x, y);
                // add 'c' in adjacent cells for row and column
                for(let i = 0; i < wholeShip.length; i++) {
                    //check hitmatrix[x+1][y], [x-1][y], [x][y+1], [x][y-1] and set to 'c' if it is undefined
                    let cx = wholeShip[i][0];
                    let cy = wholeShip[i][1];
                    if(cx-1 >= 0 ){
                        if(this.hitMatrix[cx-1][cy] == undefined) {
                            this.hitMatrix[cx-1][cy] = "c";
                        }
                    }
                    if(cx+1 <= 9 ){
                        if(this.hitMatrix[cx+1][cy] == undefined) {
                            this.hitMatrix[cx+1][cy] = "c";
                        }
                    }
                    if(cy-1 >= 0 ){
                        if(this.hitMatrix[cx][cy-1] == undefined) {
                            this.hitMatrix[cx][cy-1] = "c";
                        }
                    }
                    if(cy+1 <= 9){
                        if(this.hitMatrix[cx][cy+1] == undefined) {
                            this.hitMatrix[cx][cy+1] = "c";
                        }
                    }
                }

            }
            return true;
        } else {
            this.hitMatrix[x][y] = 'm'
            this.missed++;
            return false;
        }
    }
    allSunk() {
        for(let i = 0; i < this.ships.length; i++) {
            if(this.boardMatrix[this.ships[i][0][0]][this.ships[i][0][1]].isSunk() == false) {
                return false;
            }
        }
        return true;
    }
    getWholeShip(x, y) {
        let pair = [x, y]
        for( let i = 0; i < this.ships.length; i++) {
            let curr = this.ships[i];
            for(let j = 0; j < curr.length; j++ ) {
                if(curr[j][0] == pair[0] && curr[j][1] == pair[1]) {
                    return curr;
                }
            }
        }
    }
}

// module.exports = Gameboard;