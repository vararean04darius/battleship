
const Ship = require('./ship')
let myShip;

function initializeShip() {
    myShip = new Ship(3);
}

beforeAll( () => {
    initializeShip();
})

test("Ship is created correctly", () => {
    expect(typeof myShip).toBe('object')
})

test("Value of hitTimes is 0", () => {
    expect(myShip.hitTimes).toBe(0)
})

test("Ship's hitTimes is increased after being hit", () => {
    myShip.hit();
    expect(myShip.hitTimes).toBe(1)
})

test("Ship is not sunk if hitTimes is lower than it's length", () => {
    myShip.hit();
    expect(myShip.isSunk()).toBe(false)
})

test("Ship is sunk when hitTimes is equal to length", () => {
    myShip.hit();
    expect(myShip.isSunk()).toBe(true);
})

test("Ship is still sunk after forcing another hit", () => {
    myShip.hit();
    expect(myShip.isSunk()).toBe(true);
})