// Getting all the elements
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
let counter = 0;
let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], //row postions
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], //col positions
    [0, 4, 8],
    [2, 4, 6], //Diagonal positions
];

newGameBtn.addEventListener("click", initGame);

// Let create afuncction to initialise the Game
function initGame() {
    boxes.forEach((box) => {
        box.textContent = "";
        box.classList.remove("x", "o");
        box.classList.remove("win");
        box.style.pointerEvents = "all";
    });
    currentPlayer = "X";
    gameInfo.innerText = "Current Player - " + currentPlayer;
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    newGameBtn.classList.remove("active");
}
initGame();

function checkWinner() {
    for (let i = 0; i < winningPositions.length; i++) {
        let [a, b, c] = winningPositions[i];
        if (
            (gameGrid[a] != "" || gameGrid[b] != "" || gameGrid[c] != "") && gameGrid[a] == gameGrid[b] && gameGrid[b] == gameGrid[c]) {
            boxes[a].classList.add("win");
            boxes[b].classList.add("win");
            boxes[c].classList.add("win");
            answer = gameGrid[a];
            gameInfo.innerText = "Player - " + gameGrid[a] + " wins!";
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
            newGameBtn.classList.add("active");
            return;
        }
    }
}

function gameOver() {
    let flag = 0;
    for (let i = 0; i < 9; i++) {
        if (gameGrid[i] == "") flag = 1;
    }
    if (flag == 0) {
        newGameBtn.classList.add("active");
        gameInfo.innerText = "Draw! Game Over";
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", function() {
        if (gameGrid[index] == "") {
            gameGrid[index] = currentPlayer;
            box.innerText = currentPlayer;
            box.style.pointerEvents = "none";
            currentPlayer = currentPlayer == "X" ? "O" : "X";
            gameInfo.innerText = "Current Player - " + currentPlayer;
            checkWinner();
        }
        gameOver();
    });
});
