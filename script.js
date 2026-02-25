let rows, cols, minesCount;
let board = [];
let gameOver = false;
let timer = 0;
let interval;
let firstClick = true;
let currentDifficulty = "easy";
let minesPlaced = false;

const boardElement = document.getElementById("board");
const timerDisplay = document.getElementById("timer");
const mineDisplay = document.getElementById("mine-count");
const restartBtn = document.getElementById("restart");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");

difficultyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        difficultyButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentDifficulty = btn.dataset.level;
        init();
    });
});

restartBtn.onclick = init;

function init() {

    if (currentDifficulty === "easy") {
        rows = cols = 9;
        minesCount = 10;
    } else if (currentDifficulty === "medium") {
        rows = cols = 12;
        minesCount = 20;
    } else {
        rows = cols = 16;
        minesCount = 40;
    }

    board = [];
    boardElement.innerHTML = "";
    gameOver = false;
    firstClick = true;
    minesPlaced = false;

    boardElement.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    timer = 0;
    clearInterval(interval);
    timerDisplay.textContent = "00:00";

    interval = setInterval(() => {
        if (!gameOver && !firstClick) {
            timer++;
            timerDisplay.textContent =
                String(Math.floor(timer / 60)).padStart(2,"0") +
                ":" +
                String(timer % 60).padStart(2,"0");
        }
    }, 1000);

    mineDisplay.textContent = minesCount;

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < cols; c++) {

            let cell = {
                mine: false,
                revealed: false,
                count: 0
            };

            row.push(cell);

            const div = document.createElement("div");
            div.classList.add("cell");
            div.dataset.row = r;
            div.dataset.col = c;
            div.addEventListener("click", handleClick);

            boardElement.appendChild(div);
        }
        board.push(row);
    }
}

function handleClick(e) {
    if (gameOver) return;

    const r = parseInt(e.target.dataset.row);
    const c = parseInt(e.target.dataset.col);

    if (firstClick) {
        placeMines(r, c);     // generate mines AFTER first click
        calculateNumbers();
        firstClick = false;
    }

    revealCell(r, c);
}

function placeMines(firstRow, firstCol) {

    let placed = 0;

    while (placed < minesCount) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);

        // ensure first clicked cell is NOT a mine
        if ((r === firstRow && c === firstCol) || board[r][c].mine) {
            continue;
        }

        board[r][c].mine = true;
        placed++;
    }

    minesPlaced = true;
}

function calculateNumbers() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {

            if (board[r][c].mine) continue;

            let count = 0;

            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {

                    if (dr === 0 && dc === 0) continue;

                    let nr = r + dr;
                    let nc = c + dc;

                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                        if (board[nr][nc].mine) count++;
                    }
                }
            }

            board[r][c].count = count;
        }
    }
}

function revealCell(r, c) {

    const cell = board[r][c];
    const div = document.querySelector(`[data-row='${r}'][data-col='${c}']`);

    if (cell.revealed || gameOver) return;

    cell.revealed = true;
    div.classList.add("revealed");

    if (cell.mine) {
        gameOver = true;
        clearInterval(interval);
        chainExplosion();
        return;
    }

    if (cell.count > 0) {
        div.textContent = cell.count;
        return;
    }

    // Flood Fill
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {

            let nr = r + dr;
            let nc = c + dc;

            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                if (!board[nr][nc].revealed) {
                    revealCell(nr, nc);
                }
            }
        }
    }
}

function chainExplosion() {

    let mines = [];

    for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
            if (board[r][c].mine)
                mines.push({ r, c });

    let index = 0;

    function explodeNext() {
        if (index >= mines.length) return;

        const { r, c } = mines[index];
        const div = document.querySelector(`[data-row='${r}'][data-col='${c}']`);

        div.textContent = "💣";
        div.classList.add("mine");

        index++;
        setTimeout(explodeNext, 80);
    }

    explodeNext();
}

init();