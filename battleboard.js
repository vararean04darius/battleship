
// const Player = require("./player");
import { Player } from "./player.js";

const container = document.getElementById("container");

function createTable() {
    const table = document.createElement("div")
    table.id = "table-holder"
    container.appendChild(table)

    const player1Table = document.createElement("div")
    player1Table.classList.add("table")
    player1Table.classList.add("player1")
    const player2Table = document.createElement("div")
    player2Table.classList.add("table")
    player2Table.classList.add("player2")

    table.appendChild(player1Table)
    table.appendChild(player2Table)
    createBoard();
}

function createBoard() {
    const player1Table = document.getElementsByClassName("player1")[0]
    const player2Table = document.getElementsByClassName("player2")[0]
    const player1Board = document.createElement("div")
    const player2Board = document.createElement("div")
    player1Board.id = "board1"
    player1Board.classList.add("board")
    player1Table.appendChild(player1Board)
    addTable(player1Board.id)





    player2Board.id = "board2"
    player2Board.classList.add("board")
    player2Table.appendChild(player2Board)
    addTable(player2Board.id)
}

createTable();
function addTable(id) {
    const myTable = document.getElementById(id)
    let player1 = new Player("Ionut", "real");
    player1.gameboard.addShip(0, 0, 4, "row")
    player1.gameboard.addShip(3, 3, 1, "row")
    player1.gameboard.addShip(5, 5, 2, "col")
    player1.gameboard.receiveAttack(5, 6)
    player1.gameboard.receiveAttack(6, 5)

    for(let i = 0; i < player1.gameboard.boardMatrix.length; i++) {
        for(let j = 0; j < player1.gameboard.boardMatrix[i].length; j++) {
            const newButton = document.createElement("button")
            if(typeof player1.gameboard.boardMatrix[i][j] == "object"){
                newButton.textContent = "S";
                // newButton.style.backgroundColor = "aqua"
            }
            if(player1.gameboard.hitMatrix[i][j] == 'h' ) {
                newButton.textContent = 'H';
                newButton.classList.add("marked")
                newButton.disabled = true;
                // newButton.style.backgroundColor = "crimson"
            }
            if(player1.gameboard.hitMatrix[i][j] == 'm' ) {
                newButton.textContent = 'x';
                newButton.classList.add("missed")
                newButton.disabled = true;
                // newButton.style.backgroundColor = "crimson"
            }
            myTable.appendChild(newButton)
        }
    }
}
