// const Gameboard = require('./gameboard')
import { Gameboard } from "./gameboard.js";

export class Player { 
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.gameboard = new Gameboard();
    }
}
// module.exports = Player