const Gameboard = require('./gameboard')
let myGameboard;
function initializeGameboard() {
    myGameboard = new Gameboard();
}

beforeAll( () => {
    initializeGameboard();
})

test("Gameboard is created correctly", () => {
    expect(typeof myGameboard).toBe('object')
    expect(Array.isArray(myGameboard.boardMatrix)).toBe(true)
    expect(myGameboard.boardMatrix.length).toBe(10)
    expect(myGameboard.boardMatrix[0].length).toBe(10)
    expect(myGameboard.boardMatrix[0][0]).toBe(undefined)
})

test("Ship with length 1 is added correctly", () => {
    myGameboard.addShip(0, 0, 1, "row")
    expect(typeof myGameboard.boardMatrix[0][0]).toBe('object')
    expect(myGameboard.boardMatrix[0][0].length).toBe(1)
    expect(myGameboard.boardMatrix[0][1]).toBe(undefined)
})

test("Ship with length 2 is added correctly", () => {
    myGameboard.addShip(1, 2, 2, "row")
    expect(typeof myGameboard.boardMatrix[1][2]).toBe('object')
    expect(typeof myGameboard.boardMatrix[1][3]).toBe('object')
    expect(myGameboard.boardMatrix[1][1]).toBe(undefined)
    expect(myGameboard.boardMatrix[1][4]).toBe(undefined)
    expect(myGameboard.boardMatrix[1][3].hitTimes).toBe(0)
})

test("Ships receive attacks correctly and are sunk when received enough hits", () => {
    myGameboard.receiveAttack(1, 3)
    expect(myGameboard.boardMatrix[1][3].hitTimes).toBe(1)
    expect(myGameboard.boardMatrix[1][3].isSunk()).toBe(false)
    myGameboard.receiveAttack(1, 2)
    expect(myGameboard.boardMatrix[1][2].isSunk()).toBe(true)
})

test("Ship is added correctly on column", () => {
    myGameboard.addShip(5, 5, 3, "col");
    expect(typeof myGameboard.boardMatrix[5][5]).toBe('object')
    expect(myGameboard.boardMatrix[5][5].length).toBe(3)
    expect(myGameboard.boardMatrix[6][5].length).toBe(3)
    expect(myGameboard.boardMatrix[7][5].length).toBe(3)
    expect(myGameboard.boardMatrix[8][5]).toBe(undefined)
}) 

function showGameboard() {
    for( let i = 0; i<= 9; i++) {
        let currString = '';
        for( let j = 0; j<= 9; j++) {
            if(myGameboard.boardMatrix[i][j] == undefined) {
                currString += 'e '; 
            } else if(typeof myGameboard.boardMatrix[i][j] == "string") {
                currString += myGameboard.boardMatrix[i][j];
            } else {
                if(myGameboard.hitMatrix[i][j] == 'h') {
                    currString += myGameboard.hitMatrix[i][j] + ' ';
                } else {
                    currString += myGameboard.boardMatrix[i][j].length + ' '; 
                }
            }
        }
        console.log(currString)
    }
}

test("Length 4 ship is added correct on last column bottom side", () => {
    myGameboard.addShip(6, 9, 4, "col")
    expect(typeof myGameboard.boardMatrix[6][9]).toBe('object')
    expect(myGameboard.boardMatrix[6][9].length).toBe(4)
    expect(myGameboard.boardMatrix[7][9].length).toBe(4)
    expect(myGameboard.boardMatrix[8][9].length).toBe(4)
    expect(myGameboard.boardMatrix[9][9].length).toBe(4)
    expect(myGameboard.boardMatrix[5][9]).toBe(undefined)
    myGameboard.receiveAttack(9, 9)
    myGameboard.receiveAttack(9, 8)
    expect(myGameboard.boardMatrix[6][9].hitTimes).toBe(1)
    expect(myGameboard.boardMatrix[6][9].isSunk()).toBe(false)
})

test("if all sunk function is working", () => {
    expect(myGameboard.allSunk()).toBe(false);
})

test("if checking for sunk is working after attacking all ships", () => {
    myGameboard.receiveAttack(0, 0)
    myGameboard.receiveAttack(5, 5)
    myGameboard.receiveAttack(6, 5)
    myGameboard.receiveAttack(7, 5)
    myGameboard.receiveAttack(7, 9)
    myGameboard.receiveAttack(8, 9)
    myGameboard.receiveAttack(9, 9)
    showGameboard();
    expect(myGameboard.allSunk()).toBe(true);
})

test("if all sunk is false after adding another ship", () => {
    myGameboard.addShip(7, 7, 1, "row");
    expect(myGameboard.allSunk()).toBe(false);
})