import { Player } from "./player.js";
import { computerRound, createBoard, createLand, createPositioningBoard, deletePositioningBoard, disableBoard, enableBoard, getFinalPlayersArray, hideTables, makePositioningBoardVisible, myRoundEnded, reloadCurrentBoard, reloadEnemyMiniature, showInputsAndStartButton, stopGame, switchBoards } from "./battleboard.js";
import { computerPlayRound, computerPositionShips } from "./computer.js";

const firstName = document.getElementById("first-player-input");
const secondName = document.getElementById("second-player-input")

firstName.addEventListener("input", () => {
    checkName();
})
checkName();
function checkName() {
    const firstName = document.getElementById("first-player-input");
    if(firstName.value.length < 3) {
        document.getElementById("start-game").disabled = true;
    } else {
        document.getElementById("start-game").disabled = false;
    }
}

showInputsAndStartButton();


function createPlayers(name1, shipsArray1, name2, shipsArray2) {
    console.log("suntem in createPlayers");
    
    console.log(name1);
    console.log(shipsArray1);
    console.log(name2);
    console.log(shipsArray2);
    
    let player1 = new Player(name1, "real");
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            if(typeof shipsArray1[i][j] === "object") {
                let length = shipsArray1[i][j][0]
                let direction = shipsArray1[i][j][1]
                player1.gameboard.addShip(i, j, length, direction)
            }
        }
    }
    let player2;
    if(name2 == '') {
        player2 = new Player("PC", "computer");
    } else {
        player2 = new Player(name2, "real");
    }
    console.log(player2.type);
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            if(typeof shipsArray2[i][j] === "object") {
                let length = shipsArray2[i][j][0]
                let direction = shipsArray2[i][j][1]
                player2.gameboard.addShip(i, j, length, direction)
            }
        }
    }
    return [player1, player2];
}

let currentPlayerRound;
let currentPlayers;
let currentEnemy;

export function initializeGame(pl1, pl2) {
    pl1.addMove();
    currentPlayers = [pl1, pl2];
    currentPlayerRound = pl1;
    currentEnemy = pl2;
    enableBoard(getCurrentBoard())
    myRoundEnded(gameBoards);
}

export function getCurrentPlayers() {
    return currentPlayers;
}

export function getCurrentPlayerRound() {
    return currentPlayerRound;
}

export function getCurrentEnemy() {
    return currentEnemy;
}

export function swapRounds() {
    let aux = currentEnemy;
    currentEnemy = currentPlayerRound;
    currentPlayerRound = aux;
    currentPlayerRound.addMove();
}

export function launchAttack(player, x, y) {
    let resultOfAttack = currentEnemy.gameboard.receiveAttack(x, y)
    reloadCurrentBoard();
    if(currentEnemy.type == 'real') {
        reloadEnemyMiniature();
    }
    if(!resultOfAttack) {
        getCurrentPlayerRound().removeMove();
        console.log(player);
        swapRounds();
    }
    roundEnded();
}

export function startPositioning(playersArr) {
    if(playersArr[0] == '') {
        let computerBoard = computerPositionShips();    
        let finalArray = getFinalPlayersArray();
        finalArray.push(['', computerBoard])
        endPositioningAndStartGame(finalArray);
    } else {
        if(!document.getElementById("positioning-board")) {
            createPositioningBoard();
        }
        makePositioningBoardVisible(playersArr)
    }
}

let gameBoards;

export function getCurrentBoard() {
    if(currentPlayerRound == currentPlayers[0]) {
        return gameBoards[0];
    } else {
        return gameBoards[1];
    }
}

export function getEnemyBoard() {
    if(currentPlayerRound == currentPlayers[0]) {
        return gameBoards[1];
    } else {
        return gameBoards[0];
    }
}

// export function getEnemyMiniature() {
//     if(currentPlayerRound == currentPlayers[0]) {
//         return gameBoards[0]
//     } else {
//         return gameBoards[1];
//     }
// }

export function endPositioningAndStartGame(finalArr) {    
    deletePositioningBoard();
    let name1 = finalArr[0][0];
    let shipsArray1 = finalArr[0][1];
    let name2 = finalArr[1][0];
    let shipsArray2 = finalArr[1][1];
    if(name2 != '') {
        setTimeout(() => {
            alert(name1 + " is starting, if you're " + name2 + " move away from the computer so you don't see your enemy's board.")
        }, 1);
    }
    let players = createPlayers(name1, shipsArray1, name2, shipsArray2);
    let player1 = players[0];
    let player2 = players[1];
    let myTable = createLand();
    // createEndScreen();
    setTimeout(() => {
        gameBoards = createBoard(player1, player2)
        disableBoard(gameBoards[0])
        disableBoard(gameBoards[1])

        addHoverEvent(myTable, document.getElementById("hide"))
        if(player2.type == 'real') {
            document.getElementById("hide").style.display = "block";
        }
        document.getElementById("finish-selection").style.display = "none";
        initializeGame(player1, player2);
    }, 10);
}

function addHoverEvent(myTable, toggler) {
    toggler.addEventListener("mouseover", () => {
        toggler.textContent = "Move mouse away if it's your turn"
        myTable.style.display = "none";
        myRoundEnded(gameBoards)
    })
    toggler.addEventListener("mouseout", () => {
        toggler.textContent = "Put your mouse here when your turn is over"
        myTable.style.display = "flex";
    })
}

// export function initialise(name1, name2) {
//     let players = createPlayers(name1, name2);
//     let player1 = players[0];
//     let player2 = players[1];
//     let myTable = createTable();
//     // createEndScreen();
//     let boards = createBoard(player1, player2)
//     disableBoard(boards[0])
//     disableBoard(boards[1])

//     addHoverAndClickEvent(myTable, document.getElementById("hide"), boards)
    
//     startGame(player1, boards)
// }

export function roundEnded() {
    let myPlayers = getCurrentPlayers();
    console.log(myPlayers);
    let res = gameEnded(myPlayers[0], myPlayers[1]);
    if(res == false) {
        switchBoards();
        if(myPlayers[1].type == 'computer' && myPlayers[0].moves == 0) {
            computerRound(gameBoards[0]);
            computerPlayRound(myPlayers[1], myPlayers[0]);
        }
        // if(myPlayers[0].moves == 0) {
        //     if(myPlayers[1].type == "computer") {
        //         
        //     }

    } else {
        stopGame(res[1]);
    }
}

function gameEnded(player1, player2) {
    if(player1.gameboard.allSunk()) {
        return [true, player2];
    }
    if( player2.gameboard.allSunk() ) {
        return [true, player1];
    }
    return false;
}

function addShipsToArray() {
    // user must have these counts:
    // 1 ship with 4 length
    // 2 ships with 3 length
    // 3 ships with 2 length
    // 4 ships with 1 length
    // when all are placed, user can confirm the board placement
    //also, ships must have 1 empty space between them, diagonal, vertical or horizontal
    
}