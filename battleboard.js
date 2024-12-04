
// const Player = require("./player");

import { updateEnemyMatrix } from "./computer.js";
import { endPositioningAndStartGame, getCurrentBoard, getCurrentEnemy, getCurrentPlayerRound, getCurrentPlayers, getEnemyBoard, launchAttack, roundEnded, startPositioning } from "./main.js";

const container = document.getElementById("container");

let finalPlayers = [];

export function getFinalPlayersArray() {
    return finalPlayers;
}


export function createLand() {
    const land = document.createElement("div")
    land.id = "land-holder"
    container.appendChild(land)

    const player1Land = document.createElement("div")
    player1Land.classList.add("land")
    player1Land.classList.add("player1")
    player1Land.id = "player1-land"

    const player2Land = document.createElement("div")
    player2Land.classList.add("land")
    player2Land.classList.add("player2")
    player2Land.id = "player2-land"

    land.appendChild(player1Land)
    land.appendChild(player2Land)
    return land;
}

let miniatures;

export function getEnemyMiniature() {
    if(getCurrentPlayerRound() == getCurrentPlayers()[0]) {
        return miniatures[1]
    } else {
        return miniatures[0];
    }
}

export function createBoard(player1, player2) {
    // const player1Table = document.getElementsByClassName("player1")[0]
    // const player2Table = document.getElementsByClassName("player2")[0]
    const player1Land = document.getElementById("player1-land");
    const player2Land = document.getElementById("player2-land");

    const player1Board = document.createElement("div")
    player1Board.id = "player1-board"
    player1Board.classList.add("board")
    player1Land.appendChild(player1Board)

    const miniature1 = document.createElement("div");
    miniature1.classList.add("miniature")
    miniature1.id = "player1-miniature"
    player1Land.appendChild(miniature1)

    const player2Board = document.createElement("div")
    player2Board.id = "player2-board"
    player2Board.classList.add("board")
    player2Land.appendChild(player2Board)
    const miniature2 = document.createElement("div");
    miniature2.classList.add("miniature")
    miniature2.id = "player2-miniature";
    player2Land.appendChild(miniature2)

    miniatures = [miniature1, miniature2];

    addTable(player1, player1Board);
    addMiniature(miniature1, player1)

    addTable(player2, player2Board);
    if(player2.type == 'real') {
        addMiniature(miniature2, player2)
    } else {
        addMiniature(miniature2, player1)
    }

    return [player1Board, player2Board];
}

function addTable(thePlayer, theBoard) {
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            const newButton = document.createElement("button")
            newButton.addEventListener("click", () => {
                launchAttack(thePlayer, i, j)
                // if(second.type == "real") {
                //     reloadMiniature(otherTable.parentElement.getElementsByClassName("miniature")[0].id, first) 
                // }
                // roundEnded(first, second, boards);
            })
            if(thePlayer.gameboard.hitMatrix[i][j] == 'h' ) {
                newButton.textContent = 'H';
                newButton.classList.add("hit")
                newButton.disabled = true;
            }
            if(thePlayer.gameboard.hitMatrix[i][j] == 'm' ) {
                newButton.textContent = 'x';
                newButton.classList.add("missed")
                newButton.disabled = true;
            }
            if(thePlayer.gameboard.hitMatrix[i][j] == 'c') {
                newButton.textContent = 'x';
                newButton.classList.add("confirmed")
                newButton.disabled = true;
            }
            theBoard.appendChild(newButton)
        }
    }
}

function addMiniature(miniature, player) {
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            const newButton = document.createElement("button")
            newButton.disabled = true;
            newButton.classList.add("preview")
            if(typeof player.gameboard.boardMatrix[i][j] == "object"){
                newButton.classList.remove("preview")
                newButton.classList.add("alive")
            }
            if(player.gameboard.hitMatrix[i][j] == 'h' ) {
                newButton.classList.remove("preview")
                newButton.classList.add("hit")
            }
            if(player.gameboard.hitMatrix[i][j] == 'm' ) {
                newButton.classList.remove("preview")
                newButton.classList.add("missed")
            }
            if(player.gameboard.hitMatrix[i][j] == 'c') {
                newButton.classList.remove("preview")
                newButton.classList.add("confirmed")
            }
            miniature.appendChild(newButton)
        }
    }
}

export function reloadCurrentBoard() {
    let myBoard = getCurrentBoard();
    while(myBoard.children.length > 0) {
        myBoard.removeChild(myBoard.lastChild)
    }
    addTable(getCurrentEnemy(), myBoard);
}

export function reloadEnemyMiniature() {
    let enemyMiniature = getEnemyMiniature();
    while(enemyMiniature.children.length > 0) {
        enemyMiniature.removeChild(enemyMiniature.lastChild)
    }
    addMiniature(enemyMiniature, getCurrentEnemy());
}

export function reloadMiniature(id, player) {
    const myTable = document.getElementById(id)
    while(myTable.children.length > 0) {
        myTable.removeChild(myTable.lastChild)
    }
    addMiniature(id, player)
}

export function disableBoard(currBoard) {
    currBoard.classList.remove("active")
    let buttons = currBoard.children.length;
    for(let i = 0; i < buttons; i++ ) {
        currBoard.children[i].disabled = true;
    }
}

export function enableBoard(currBoard) {
    currBoard.classList.add("active")
    let buttons = currBoard.children.length;
    for(let i = 0; i < buttons; i++ ) {
        currBoard.children[i].disabled = false;
        if(currBoard.children[i].classList.contains("hit") || currBoard.children[i].classList.contains("missed") || currBoard.children[i].classList.contains("confirmed")) {
            currBoard.children[i].disabled = true;  
        }
    }
}

export function myRoundEnded(arr) {
    if(arr[0].classList.contains("active")) {
        arr[1].parentElement.classList.add("hidden")
        arr[0].parentElement.classList.remove("hidden")
    } else if(arr[1].classList.contains("active")){
        arr[0].parentElement.classList.add("hidden")
        arr[1].parentElement.classList.remove("hidden")
    }
}

export function switchBoards(arr) {
    let curr = getCurrentBoard();
    let enem = getEnemyBoard();
    disableBoard(enem);
    enableBoard(curr);
}
export function stopGame(winner) {
    disableBoard(getCurrentBoard())
    disableBoard(getEnemyBoard())
    setTimeout(() => {
        hideTables();
        showEndScreen(winner)
        showReset();
    }, 2000);
}

export function hideTables() {
    const land = document.getElementById("land-holder");
    let arr = Array.from(land.children);
    arr.forEach(element => {
        element.style.display = "none";
    });
    document.getElementById("hide").style.display = "none";
}

export function showEndScreen(winner) {
    // const container = document.getElementById("container");
    // let arr = Array.from(container.children);
    // for(let i = 0; i < arr.length; i++ ) {
    //     arr[i].style.display = "none";
    // }
    if(document.getElementById("land-holder")) {
        container.removeChild(document.getElementById("land-holder"))
    }
    const displayContainer = document.createElement("div");
    displayContainer.id = "game-ended";
    const gameOverDisplay = document.createElement("div");
    gameOverDisplay.id = "winner-display"
    gameOverDisplay.classList.add("display")
    gameOverDisplay.textContent = "The game has ended, " + winner.name + " is the winner."; 
    displayContainer.style.display = "flex";
    displayContainer.appendChild(gameOverDisplay);
    container.appendChild(displayContainer);

}

export function hideEndScreen() {
    const displayContainer = document.getElementById("game-ended");
    displayContainer.style.display = "none";
} 

export function hideInputsAndStartButton(){
    const rules = document.getElementById("rules");
    const firstName = document.getElementById("first-player-input");
    const secondName = document.getElementById("second-player-input")
    const startButton = document.getElementById("start-game")
    const topbar = document.getElementById("topbar")
    firstName.style.display = "none";
    secondName.style.display = "none";
    startButton.style.display = "none";
    if(document.getElementById("rules")) {
        document.getElementById("rules").style.display = "none"
    }
    topbar.style.height = "5vh";
    document.getElementById("finish-selection").style.display = "block";
    document.getElementById("container").style.height = "95vh";
}

function resetFinalArray() {
    finalPlayers = [];
}
let currentPlayersArray = [];
document.getElementById("finish-selection").addEventListener("click", () => {
    if(checkContainers()) {
        let theShips = new Array(10);
        for (let index = 0; index < theShips.length; index++) {
            theShips[index] = new Array(10);
        }
        for(let i = 0; i < 10; i++) {
            for( let j = 0; j< 10; j ++) {
                theShips[i][j] = shipsArray[i][j];
            }
        }
        finalPlayers.push([currentPlayersArray[0], theShips]);
        
        if(currentPlayersArray.length == 1) {
            resetShipsArray();
            endPositioningAndStartGame(finalPlayers);
            currentPlayersArray = [];
        } else {
            currentPlayersArray.shift()
            deletePositioningBoard();
            resetShipsArray();
            startPositioning(currentPlayersArray)
        }
    }
})

export function deletePositioningBoard() {
    let container = document.getElementById("container")
    if(document.getElementById("positioning-board")) {
        container.removeChild(document.getElementById("positioning-board"));
    }
}

function checkContainers() {
    let one = document.getElementById("one-piece-container");
    let two = document.getElementById("two-piece-container");
    let three = document.getElementById("three-piece-container");
    let four = document.getElementById("long-piece-container");
    let containersArray = [one, two, three, four];
    let myflag = true;
    for(let i = 0; i < containersArray.length; i++) {
        if(containersArray[i].children.length != 0) {
            myflag = false;
        }
    }
    if(myflag == false) {
        document.getElementById("finish-selection").disabled = true;
    } else {
        document.getElementById("finish-selection").disabled = false;
    }
    return myflag;
}

const resetButton = document.getElementById("reset") 
resetButton.addEventListener("click", () => {
    const fPlayer = document.getElementById("first-player-input")
    const sPlayer = document.getElementById("second-player-input")
    fPlayer.value = '';
    sPlayer.value = '';
    resetButton.style.display = "none";
    if(document.getElementById("game-ended")) {
        document.getElementById("game-ended").parentElement.removeChild(document.getElementById("game-ended"));
    }
    showInputsAndStartButton();
    if(document.getElementById("winner-display")) {
        document.getElementById("winner-display").style.display = "none";
    }
})

export function showReset() {
    const topbar = document.getElementById("topbar")
    const resetButton = document.getElementById("reset") 
    resetButton.style.display = "block";
    topbar.style.height = "15vh";
    document.getElementById("container").style.height = "85vh"
}

export function showInputsAndStartButton(){
    const firstName = document.getElementById("first-player-input");
    const secondName = document.getElementById("second-player-input")
    const startButton = document.getElementById("start-game")
    firstName.style.display = "block";
    secondName.style.display = "block";
    startButton.style.display = "block";
    if(document.getElementById("rules")) {
        rules.style.display = "flex";
    }
}

const firstName = document.getElementById("first-player-input");
const secondName = document.getElementById("second-player-input")
const startButton = document.getElementById("start-game")
startButton.addEventListener("click", () => { 
    hideInputsAndStartButton();
    resetFinalArray();
    startPositioning([firstName.value, secondName.value])
});
export function makePositioningBoardVisible(playersArr) {
    document.getElementById("positioning-board").style.display = "grid";
    document.getElementById("player-name").textContent = playersArr[0];
    for(let i = 0; i< playersArr.length; i++) {
        currentPlayersArray[i] = playersArr[i];
    }
}

export function computerRound(board) {
    let buttons = board.children.length;
    for(let i = 0; i < buttons; i++ ) {
        board.children[i].disabled = true;
    }
}

let shipsArray = new Array(10);
for (let index = 0; index < shipsArray.length; index++) {
    shipsArray[index] = new Array(10);
}

for (let index = 0; index < shipsArray.length; index++) {
    for( let jndex = 0; jndex < shipsArray[index].length; jndex++) {
        shipsArray[index][jndex] = 0;
    }
}

function resetShipsArray() {
    for(let i=0; i< 10; i++) {
        for(let j= 0; j< 10; j++) {
            shipsArray[i][j] = 0;
        }
    }
}

function rotatePiece(elem) {
    let coords = getXandYfromId(elem.parentElement.id)
    let currX = parseInt(coords[0]);
    let currY = parseInt(coords[1]);
    let length = parseInt(elem.dataset.length);
    let direction = elem.dataset.direction;
    removeOccupiedAndAdjacent(currX, currY, length, direction)
    toggleDirection(elem)
    direction = elem.dataset.direction;
    let classes = Array.from(elem.classList);
    for(let i=0; i < classes.length; i++) {
        if(classes[i].includes("horizontal")) {
            let oldClass = classes[i];
            elem.classList.remove(classes[i]);
            let newclass = oldClass.replace("horizontal", 'vertical')
            elem.classList.add(newclass)
        }
        if(classes[i].includes("vertical")) {
            let oldClass = classes[i];
            elem.classList.remove(classes[i]);
            let newclass = oldClass.replace("vertical", 'horizontal')
            elem.classList.add(newclass)
        }
    }
    addObjectAndAdjacent(currX, currY, length, direction, shipsArray);
    reRenderPositioning();
}

function toggleDirection(elem) {
    if(elem.dataset.direction == "row") {
        elem.dataset.direction = "col";
    } else {
        elem.dataset.direction = "row";
    }
}

let currentDragged = {
    length : 0,
    direction: "col"
}

function createPiece(length, quarterForAppending) {
    let idArray = ["one", "two", "three", "four"]
    let classArray = ["one-piece", "two-piece-horizontal", "three-piece-vertical", "long-piece-vertical"]
    let numberOfPieces = 5 - length;
    let currentClass = classArray[length-1];
    let direction ='';
    if(length < 3) {
        direction = "row";
    } else {
        direction = "col"
    }
    for(let index = 1; index <= numberOfPieces; index++) {
        const newPiece = document.createElement("div");
        newPiece.id = idArray[length-1] + index;
        newPiece.draggable = true;
        newPiece.classList.add("ship", currentClass)
        newPiece.dataset.length = length;
        newPiece.dataset.direction = direction;
        addDragStart(newPiece);
        addDragEnd(newPiece);
        if(length != 1) {
            addClick(newPiece);
        }
        quarterForAppending.appendChild(newPiece);
    }
}

function addClick(element) {
    element.addEventListener("click", (event) => {
        if(checkRotation(event.target.parentElement)) {
            rotatePiece(event.target);
        }
    })
}

function addDragStart(element) {
    element.addEventListener("dragstart", (event) => {
        currentDragged.direction = event.target.dataset.direction;
        currentDragged.length =event.target.dataset.length;
        drag(event);
        if(event.target.parentElement.classList.contains("cell")) {
            let coords = getXandYfromId(event.target.parentElement.id)
            let x = coords[0];
            let y = coords[1];
            removeOccupiedAndAdjacent(x, y, event.target.dataset.length, event.target.dataset.direction)
        }
    })
}

function addDragEnd(element) {
    element.addEventListener("dragend", (event) => {
        if(element.parentElement.classList.contains("cell")) {
            let finalElement = document.elementFromPoint(event.clientX, event.clientY)
            if(!finalElement.classList.contains("ship") || (finalElement.classList.contains("ship") && finalElement.parentElement.id != event.target.parentElement.id)) {
                let coords = getXandYfromId(event.target.parentElement.id)
                addObjectAndAdjacent(coords[0], coords[1], currentDragged.length, currentDragged.direction, shipsArray);
                reRenderPositioning();
            }
        }
    })
}

function checkRotation(cell) {
    let coords = getXandYfromId(cell.id)
    let currX = parseInt(coords[0]);
    let currY = parseInt(coords[1]);
    let currentPiece = cell.firstChild;
    let currentDirection = currentPiece.dataset.direction;
    let currLength = parseInt(currentPiece.dataset.length)
    if(currLength == 1) {
        return false;
    }
    if(currentDirection == "col") {     //if direction == col => check if it fits on row
        for(let i=1; i < currLength; i++) {
            if(currY + currLength-1 <= 9) {
                if(i == 1) {
                    if(shipsArray[currX][currY + i] > 1) {
                        return false;
                    }
                } else if( shipsArray[currX][currY + i] != 0) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    } else { // row                     //if direction == row => check if it fits on col
        for(let i=1; i < currLength; i++) {
            if(currX + currLength-1 <= 9) {
                if(i == 1) {
                    if(shipsArray[currX + i][currY] > 1) {
                        return false;
                    }
                } else if( shipsArray[currX + i][currY] != 0) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    }
}

export function createPositioningBoard() {
    let positioningBoard = document.createElement("div")
    positioningBoard.id = "positioning-board";
    container.appendChild(positioningBoard);

    const nameContainer = document.createElement("div") //name
    nameContainer.id = "name-container"
    const playerName = document.createElement("h2");
    playerName.id = "player-name";
    nameContainer.appendChild(playerName)
    positioningBoard.appendChild(nameContainer);


    const longPieceQuarter = document.createElement("div")  // long piece quarter
    longPieceQuarter.classList.add("quarter");
    longPieceQuarter.id = "long-piece-container"
    createPiece(4, longPieceQuarter);
    positioningBoard.appendChild(longPieceQuarter)

    const threePieceQuarter = document.createElement("div") // 3square piece quarter x2
    threePieceQuarter.classList.add("quarter");
    threePieceQuarter.id = "three-piece-container"
    createPiece(3, threePieceQuarter);
    positioningBoard.appendChild(threePieceQuarter)

    const twoPieceQuarter = document.createElement("div") // 2square piece quarter x3
    twoPieceQuarter.classList.add("quarter");
    twoPieceQuarter.id = "two-piece-container"
    createPiece(2, twoPieceQuarter);
    positioningBoard.appendChild(twoPieceQuarter)

    const onePieceQuarter = document.createElement("div") // 1square piece quarter x4
    onePieceQuarter.classList.add("quarter");
    onePieceQuarter.id = "one-piece-container"  
    createPiece(1, onePieceQuarter);
    positioningBoard.appendChild(onePieceQuarter)

    const pieceBoard = document.createElement("div")    // board for placing the pieces
    pieceBoard.id = "the-board";
    for(let i = 0; i < 10; i++ ) {
        for(let j = 0; j< 10; j++) {
            let cellName = "cell-" + i + '-' + j;
            const newCell = document.createElement("div");
            newCell.classList.add("cell");
            newCell.id = cellName;
            newCell.draggable = false;
            pieceBoard.appendChild(newCell);
            newCell.addEventListener("dragover", (event) => {
                if(checkLength(newCell, currentDragged) && newCell.classList.length < 2) {
                    event.preventDefault();                 
                }
            })
            newCell.addEventListener("drop", (event) => {
                drop(event, i, j);
            })
        }
    }
    const boardContainer = document.createElement("div")
    boardContainer.id = "board-container"
    boardContainer.appendChild(pieceBoard);
    positioningBoard.appendChild(boardContainer);
}

function checkLength(currentCell, currentElement) {
    let coords = getXandYfromId(currentCell.id)
    let currX = parseInt(coords[0]);
    let currY = parseInt(coords[1]);
    let currentDirection = currentElement.direction;
    let currLength = parseInt(currentElement.length)

    if(currentDirection == "row") {
        if(currY + currLength-1 <= 9) {
            for(let i = 1; i < currLength; i++) {
                if(shipsArray[currX][currY + i] != 0) {
                    return false;
                } 
            }
            return true;
        } else {
            return false;
        }
    } else { // row
        if(currX + currLength-1 <= 9) {
            for(let i = 1; i < currLength; i++) {
                if(shipsArray[currX + i][currY] != 0) {
                    return false;
                } 
            }
            return true;
        } else {
            return false;
        }
    }
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function removeOccupiedAndAdjacent(x, y, length, direction) {
    x = parseInt(x);
    y = parseInt(y);
    if(direction == "row") { //row
        for(let i=0; i < length; i++ ) {
            if(i == 0) { //first
                if( y-1 >= 0 ) {
                    if( x-1 >= 0) {
                        shipsArray[x-1][y-1]--;
                    }
                    shipsArray[x][y-1]--;
                    if( x+1 <= 9) {
                        shipsArray[x+1][y-1]--;
                    }
                }
                shipsArray[x][y] = 0;
            } //middle
            if( x-1 >= 0) {
                shipsArray[x-1][y]--;
            }
            if( x+1 <= 9) {
                shipsArray[x+1][y]--;
            }
            if(Array.isArray(shipsArray[x][y]) != true) {
                shipsArray[x][y] = 0;
            }
            if( i == length-1) { //last
                if(y+1 <= 9) {
                    if(x-1 >= 0) {
                        shipsArray[x-1][y+1]--;
                    }
                    shipsArray[x][y+1]--;
                    if(x+1 <= 9) {
                        shipsArray[x+1][y+1]--;
                    }
                }
                if(Array.isArray(shipsArray[x][y]) != true) {
                    shipsArray[x][y] = 0;
                }
            }
            y++;
        }
    } else {  //col
        for(let i=0; i < length; i++ ) {
            if(i == 0) { //first
                if( x-1 >= 0 ) {
                    if( y-1 >= 0) {
                        shipsArray[x-1][y-1]--;
                    }
                    shipsArray[x-1][y]--;
                    if( y+1 <= 9) {
                        shipsArray[x-1][y+1]--;
                    }
                }
                shipsArray[x][y] = 0;
            } //middle
            if( y-1 >= 0) {
                shipsArray[x][y-1]--;
            }
            if( y+1 <= 9) {
                shipsArray[x][y+1]--;
            }
            if(Array.isArray(shipsArray[x][y]) != true) {
                shipsArray[x][y] = 0;
            }
            if( i == length-1) { //last
                if(x+1 <= 9) {
                    if(y-1 >= 0) {
                        shipsArray[x+1][y-1]--;
                    }
                    shipsArray[x+1][y]--;
                    if(y+1 <= 9) {
                        shipsArray[x+1][y+1]--;
                    }
                }
                if(Array.isArray(shipsArray[x][y]) != true) {
                    shipsArray[x][y] = 0;
                }
            }
            x++;
        }
    }
    reRenderPositioning();
}

function getXandYfromId(currId) {
    let x = currId.toString().slice(-3, -2);
    let y = currId.toString().slice(-1);
    return [x, y];
}

function drop(ev, x, y) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let element = document.getElementById(data)
    let length = element.dataset.length;
    let direction = element.dataset.direction;
    if(ev.target != element) {
        ev.target.appendChild(element);
        addObjectAndAdjacent(x, y, length, direction, shipsArray)
        reRenderPositioning();
    } else {
        if(element.parentElement.classList.contains("cell")) {
            addObjectAndAdjacent(x, y, length, direction, shipsArray)
            reRenderPositioning();
        }
    }
    checkContainers();
}

export function addObjectAndAdjacent(x, y, length, direction, board) {
    x = parseInt(x);
    y = parseInt(y);
    if(direction == "row") { //row
        for(let i=0; i < length; i++ ) {
            if(i == 0) { //first
                if( y-1 >= 0 ) {
                    if( x-1 >= 0) {
                        board[x-1][y-1]++;
                    }
                    board[x][y-1]++;
                    if( x+1 <= 9) {
                        board[x+1][y-1]++;
                    }
                }
                board[x][y] = [length, direction];
            } //middle
            if( x-1 >= 0) {
                board[x-1][y]++;
            }
            if( x+1 <= 9) {
                board[x+1][y]++;
            }
            if(Array.isArray(board[x][y]) != true) {
                board[x][y] = "s";
            }
            if( i == length-1) { //last
                if(y+1 <= 9) {
                    if(x-1 >= 0) {
                        board[x-1][y+1]++;
                    }
                    board[x][y+1]++;
                    if(x+1 <= 9) {
                        board[x+1][y+1]++;
                    }
                }
                if(Array.isArray(board[x][y]) != true) {
                    board[x][y] = "s";
                }
            }
            y++;
        }
    } else { //col
        for(let i=0; i < length; i++ ) {
            if(i == 0) { //first
                if( x-1 >= 0 ) {
                    if( y-1 >= 0) {
                        board[x-1][y-1]++;
                    }
                    board[x-1][y]++;
                    if( y+1 <= 9) {
                        board[x-1][y+1]++;
                    }
                }
                board[x][y] = [length, direction];
            } //middle
            if( y-1 >= 0) {
                board[x][y-1]++;
            }
            if( y+1 <= 9) {
                board[x][y+1]++;
            }
            if(Array.isArray(board[x][y]) != true) {
                board[x][y] = "s";
            }
            if( i == length-1) { //last
                if(x+1 <= 9) {
                    if(y-1 >= 0) {
                        board[x+1][y-1]++;
                    }
                    board[x+1][y]++;
                    if(y+1 <= 9) {
                        board[x+1][y+1]++;
                    }
                }
                if(Array.isArray(board[x][y]) != true) {
                    board[x][y] = "s";
                }
            }
            x++;
        }
    }
}

function reRenderPositioning() {
    for(let i = 0; i < 10; i++ ) {
        for(let j = 0; j< 10; j++) {
            let currentCellId = "cell-" + i + '-' + j;
            let currentCell = document.getElementById(currentCellId)
            if(shipsArray[i][j] != 0) {
                if(typeof shipsArray[i][j] == "number") {
                    currentCell.classList.add("adjacent")
                }
                if(typeof shipsArray[i][j] == "string") {
                    currentCell.classList.add("occupied")
                }
                if(typeof shipsArray[i][j] == "object") {
                    currentCell.classList.add("head")
                }
            }
            if(shipsArray[i][j] == 0) {
                currentCell.classList.remove("adjacent")
                currentCell.classList.remove("occupied")
                currentCell.classList.remove("head")
            }
        }
    }
}