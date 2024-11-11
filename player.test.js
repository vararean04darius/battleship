
const Player = require('./player')
let player1;
let player2;

function initializePlayers() {
    player1 = new Player("Miguel", "real");
    player2 = new Player("Computer", "computer")
}

beforeAll( () => {
    initializePlayers();
})

test("Players are initialized correctly", () => {
    expect(typeof player1).toBe('object')
    expect(player1.type).toBe("real")
    expect(player2.type).toBe("computer")
})