import { reloadMiniature, computerRound, addObjectAndAdjacent, reloadCurrentBoard, reloadEnemyMiniature } from "./battleboard.js";
import { getCurrentEnemy, getCurrentPlayerRound, roundEnded, swapRounds } from "./main.js";

export function updateEnemyMatrix() {
    let computer = getCurrentPlayerRound();
    let player = getCurrentEnemy();
    for(let i = 0; i < 10; i++ ) {
        for(let j = 0; j < 10; j++ ) {
            computer.gameboard.enemyMatrix[i][j] = player.gameboard.hitMatrix[i][j];
        }
    }
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

export function generateCoordinatesForAttack(player1) {
    let x = getRandomInt(0, 10)
    let y = getRandomInt(0, 10)
    while(player1.gameboard.enemyMatrix[x][y] != undefined) {
        x = getRandomInt(0, 10);
        y = getRandomInt(0, 10);
    }
    return [x, y];
}

const timer = ms => new Promise(res => setTimeout(res, ms))

export async function computerPlayRound() {
    let computer = getCurrentPlayerRound();
    let player = getCurrentEnemy();
    let timePerMove = 350;
    while(computer.moves > 0) {
        await timer(timePerMove);
        let coords = generateCoordinatesForAttack(computer);
        if(!player.gameboard.receiveAttack(coords[0], coords[1])) {
            computer.removeMove();
        }
        reloadCurrentBoard();
        // computerRound(boards);
        reloadEnemyMiniature();
        updateEnemyMatrix();
    }
    await timer(timePerMove);
    swapRounds();
    roundEnded();
}

function checkEmpty(x, y, length, direction, shipsArray) {
    if(direction == "row") {
        if(y + length-1 <= 9) {
            for(let i = 1; i < length; i++) {
                if(shipsArray[x][y + i] != 0) {
                    return false;
                } 
            }
            return true;
        } else {
            return false;
        }
    } else { // row
        if(x + length-1 <= 9) {
            for(let i = 1; i < length; i++) {
                if(shipsArray[x + i][y] != 0) {
                    return false;
                } 
            }
            return true;
        } else {
            return false;
        }
    }
}

function generateCoordinatesForPlacement(currLength, currBoard) {
    let x;
    let y;
    let found = false;
    let currentDirection = '';
    while(found != true) {
        x = getRandomInt(0, 10);
        y = getRandomInt(0, 10);
        let directions = ['row', 'col'];
        if(getRandomInt(1, 11) % 2 == 0) {
            currentDirection = directions[1];
        } else {
            currentDirection = directions[0];
        }
        if(currBoard[x][y] == 0 && checkEmpty(x, y, currLength, currentDirection, currBoard)) {
            found = true;
        } else {
            x = getRandomInt(0, 10);
            y = getRandomInt(0, 10);
        }
    }
    return [x, y, currentDirection];
}

export function computerPositionShips() {
    let computerShipsArray = new Array(10);
    for( let i = 0; i< 10; i++) {
        computerShipsArray[i] = new Array(10);
        for( let j = 0; j< 10; j++) {
            computerShipsArray[i][j] = 0;
        }
    }
    let remainingShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    while(remainingShips.length) {
        let currLength = remainingShips.shift();
        let result = generateCoordinatesForPlacement(currLength, computerShipsArray);
        let x = result[0];
        let y = result[1];
        let dir = result[2];
        addObjectAndAdjacent(x, y, currLength, dir, computerShipsArray);
    }
    return computerShipsArray;
}