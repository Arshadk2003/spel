const rows = 6;
const columns = 7;
let board = Array.from({ length: rows }, () => Array(columns).fill(null));
let currentPlayer = 'blue';
const gameBoard = document.getElementById('gameBoard');
const winnerDisplay = document.getElementById('winner');

function createBoard() {
    gameBoard.innerHTML = '';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.column = c;
            gameBoard.appendChild(cell);
        }
    }
}

function dropDisc(column) {
    for (let r = rows - 1; r >= 0; r--) {
        if (!board[r][column]) {
            board[r][column] = currentPlayer;
            renderBoard();
            if (checkWin(r, column)) {
                winnerDisplay.innerText = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} wins!`;
                gameBoard.removeEventListener('click', handleClick);
                return;
            }
            currentPlayer = currentPlayer === 'blue' ? 'red' : 'blue';
            return;
        }
    }
}

function handleClick(e) {
    const column = e.target.dataset.column;
    if (column !== undefined) {
        dropDisc(column);
    }
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const r = Math.floor(index / columns);
        const c = index % columns;
        cell.className = 'cell';
        if (board[r][c]) {
            cell.classList.add(board[r][c]);
        }
    });
}

function checkWin(row, col) {
    return (
        checkDirection(row, col, 0, 1) ||  // Horizontal
        checkDirection(row, col, 1, 0) ||  // Vertical
        checkDirection(row, col, 1, 1) ||  // Diagonal \
        checkDirection(row, col, 1, -1)     // Diagonal /
    );
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 1;
    count += countDiscs(row, col, rowDir, colDir);
    count += countDiscs(row, col, -rowDir, -colDir);
    return count >= 4;
}

function countDiscs(row, col, rowDir, colDir) {
    let count = 0;
    let r = row + rowDir;
    let c = col + colDir;

    while (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === currentPlayer) {
        count++;
        r += rowDir;
        c += colDir;
    }
    return count;
}

function resetGame() {
    board = Array.from({ length: rows }, () => Array(columns).fill(null));
    currentPlayer = 'blue';
    createBoard();
    winnerDisplay.innerText = '';
    gameBoard.addEventListener('click', handleClick);
}

document.getElementById('resetButton').addEventListener('click', resetGame);
gameBoard.addEventListener('click', handleClick);

createBoard();
