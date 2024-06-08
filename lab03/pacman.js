let gameBoard = createGame(10);
renderGame(gameBoard);
let score = 0;


document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        gameBoard = moveLeft(gameBoard);
        renderGame(gameBoard);
    } else if (event.key === 'ArrowRight') {
        gameBoard = moveRight(gameBoard);
        renderGame(gameBoard);
    }
});

setInterval(() => {
    gameBoard = moveGhost(gameBoard);
}, 2000);



//My functions
function createGame(n) {
    const board = new Array(n).fill('.');
    const pacmanPos = Math.floor(Math.random() * n);
    let ghostPos;
    let fruitPos;

    do {
        ghostPos = Math.floor(Math.random() * n);
    } while (ghostPos === pacmanPos);

    do {
        fruitPos = Math.floor(Math.random() * n);
    } while (fruitPos === pacmanPos || fruitPos === ghostPos);

    board[pacmanPos] = 'C';
    board[ghostPos] = '^';
    board[fruitPos] = '@';
    return board;
}


function renderGame(board) {
    document.getElementById('gameBoard').innerText = board.join(' ');
}




function moveLeft(board) {
    const pacmanIndex = board.indexOf('C');
    if (pacmanIndex > 0) {
        board[pacmanIndex] = '';
        board[pacmanIndex - 1] = 'C';
    }
    return board;
}

function moveRight(board) {
    const pacmanIndex = board.indexOf('C');
    if (pacmanIndex < board.length - 1) {
        board[pacmanIndex] = ' ';
        board[pacmanIndex + 1] = 'C';
    }
    return board;
}


document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        gameBoard = moveLeft(gameBoard);
        renderGame(gameBoard);
    } else if (event.key === 'ArrowRight') {
        gameBoard = moveRight(gameBoard);
        renderGame(gameBoard);
    }
});



function updateScore() {
    document.getElementById('score').innerText = `Score: ${score}`;
}


function isLevelComplete(board) {
    return !board.includes('.');
}

function checkLevelCompletion(board) {
    if (isLevelComplete(board)) {
        alert('Level Complete!');
        gameBoard = createGame(10);
        score = 0;
        updateScore();
        renderGame(gameBoard);
    }
}



function moveGhost(board) {
    const ghostIndex = board.indexOf('^');
    const moveDirection = Math.random() < 0.5 ? -1 : 1;
    const newGhostIndex = ghostIndex + moveDirection;

    if (newGhostIndex >= 0 && newGhostIndex < board.length) {
        if (board[newGhostIndex] === 'C') {
            alert('Game Over! The ghost caught Pacman.');
            gameBoard = createGame(10);
            score = 0;
            updateScore();
            renderGame(gameBoard);
            return;
        }

        board[ghostIndex] = '.';
        board[newGhostIndex] = '^';
    }

    renderGame(board);
}


