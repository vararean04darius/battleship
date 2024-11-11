
const Ship = require('./ship')
let myShip;

function initializeShip() {
    myShip = new Ship(3);
}

beforeAll( () => {
    initializeShip();
})

test("Ship length is visible", () => {
    expect(myShip.length).toBe(3)
})