// const Gameboard = require('./gameboard')
import { Gameboard } from "./gameboard.js";

export class Player { 
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.gameboard = new Gameboard( type );
        this.moves = 0;
    }
    addMove() {
        this.moves++;
    }
    removeMove() {
        this.moves--;
    }
}
// module.exports = Player