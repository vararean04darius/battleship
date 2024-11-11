
const container = document.getElementById("container");

function createBoard() {
    const table = document.createElement("div")
    table.id = "table-holder"
    container.appendChild(table)

    const player1Table = document.createElement("div")
    player1Table.classList.add("table")
    player1Table.classList.add("player1")
    const player2Table = document.createElement("div")
    player2Table.classList.add("table")
    player2Table.classList.add("player2")

    table.appendChild(player1Table)
    table.appendChild(player2Table)
}

createBoard();