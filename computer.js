import { reloadMiniature, reloadBoard, computerRound } from "./battleboard.js";
import { roundEnded } from "./main.js";

export function updateEnemyMatrix(player1) {
    for(let i = 0; i < player1.gameboard.hitMatrix.length; i++ ) {
        let currArray = player1.gameboard.hitMatrix[i];
        for(let j = 0; j < currArray.length; j++ ) {
            player1.gameboard.enemyMatrix[i][j] = player1.gameboard.hitMatrix[i][j];
        }
    }
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

export function generateCoordinates(player1) {
    let x = getRandomInt(0, 10)
    let y = getRandomInt(0, 10)
    while(player1.gameboard.enemyMatrix[x][y] != undefined) {
        x = getRandomInt(0, 10);
        y = getRandomInt(0, 10);
    }
    return [x, y];
}

const timer = ms => new Promise(res => setTimeout(res, ms))

export async function computerPlayRound(computer, enemy, boards) {
    let timePerMove = 350;
    while(computer.moves > 0) {
        await timer(timePerMove);
        let coords = generateCoordinates(computer);
        if(!computer.gameboard.receiveAttack(coords[0], coords[1])) {
            computer.removeMove();
        }
        reloadBoard("board2", "board1", computer, enemy)
        computerRound(boards);
        reloadMiniature("min1", computer);
        reloadMiniature("min2", computer);
        updateEnemyMatrix(computer);
    }
    
    await timer(timePerMove);
    roundEnded(computer, enemy, boards);
}