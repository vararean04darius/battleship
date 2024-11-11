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
    myGameboard.addShip(2, 1, 2, "row")
    expect(typeof myGameboard.boardMatrix[2][1]).toBe('object')
    expect(typeof myGameboard.boardMatrix[3][1]).toBe('object')
    expect(myGameboard.boardMatrix[1][1]).toBe(undefined)
    expect(myGameboard.boardMatrix[4][1]).toBe(undefined)
    expect(myGameboard.boardMatrix[3][1].hitTimes).toBe(0)
})

test("Ships receive attacks correctly and are sunk when received enough hits", () => {
    myGameboard.receiveAttack(3, 1)
    expect(myGameboard.boardMatrix[3][1].hitTimes).toBe(1)
    expect(myGameboard.boardMatrix[3][1].isSunk()).toBe(false)
    myGameboard.receiveAttack(2, 1)
    expect(myGameboard.boardMatrix[3][1].isSunk()).toBe(true)
})

test("Ship is added correctly on column", () => {
    myGameboard.addShip(5, 5, 3, "col");
    expect(typeof myGameboard.boardMatrix[5][5]).toBe('object')
    expect(myGameboard.boardMatrix[5][5].length).toBe(3)
    expect(myGameboard.boardMatrix[5][6].length).toBe(3)
    expect(myGameboard.boardMatrix[5][7].length).toBe(3)
    expect(myGameboard.boardMatrix[5][8]).toBe(undefined)

}) 