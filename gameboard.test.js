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
})