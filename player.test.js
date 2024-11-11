
const Player = require('./player')
let player1;

function initializePlayer() {
    player1 = new Player("Miguel", "real");
}

beforeAll( () => {
    initializePlayer();
})

test("Player is initialized correctly", () => {
    expect(typeof player1).toBe('object')
    expect(player1.name).toBe("Miguel")
})