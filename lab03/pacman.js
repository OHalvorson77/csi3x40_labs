let gameBoard;
let max=0;
let score = 0;


document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        gameBoard = moveLeft(gameBoard);
        renderGame(gameBoard);
        checkLevelCompletion(gameBoard);
    } else if (event.key === 'ArrowRight') {
        gameBoard = moveRight(gameBoard);
        renderGame(gameBoard);
        checkLevelCompletion(gameBoard);
    }
});

setInterval(() => {
    gameBoard = moveGhost(gameBoard);
    renderGame(gameBoard);
}, 2000);

function startGame() {
    const input = document.getElementById('boardSize').value;
    const boardSize = parseInt(input, 10);
    if (isNaN(boardSize) || boardSize <= 0) {
        alert('Please enter a valid positive number.');
        return;
    }
    const input2 = document.getElementById('maxScore').value;
    const maxScore = parseInt(input2, 10);
    if (isNaN(maxScore) || maxScore <= 0) {
        alert('Please enter a valid positive number.');
        return;
    }
    max=maxScore;
    score = 0;
    updateScore();
    gameBoard = createGame(boardSize);
    renderGame(gameBoard);
    clearInterval(ghostInterval);
    ghostInterval = setInterval(() => {
        gameBoard = moveGhost(gameBoard);
    }, 2000);
}




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
        if (board[pacmanIndex-1]=='^'){
            alert('Game Over! The ghost caught Pacman.');
            gameBoard = createGame(10);
            score = 0;
            updateScore();
            renderGame(gameBoard);
            return;

        }
        if (board[pacmanIndex-1]=='.'){
            score++;
            updateScore();
        }
        board[pacmanIndex] = '_';
        board[pacmanIndex - 1] = 'C';
    }
    else{
        if (board[board.length-1]=='^'){
            alert('Game Over! The ghost caught Pacman.');
            gameBoard = createGame(10);
            score = 0;
            updateScore();
            renderGame(gameBoard);
            return;

        }
        if (board[board.length-1]=='.'){
            score++;
            updateScore();
        }
        board[board.length-1]='C';
        board[0]='_';
    }
    return board;
}

function moveRight(board) {
    const pacmanIndex = board.indexOf('C');
    if (pacmanIndex < board.length - 1) {
        if (board[pacmanIndex+1]=='^'){
            alert('Game Over! The ghost caught Pacman.');
            gameBoard = createGame(10);
            score = 0;
            updateScore();
            renderGame(gameBoard);
            return;

        }
        if (board[pacmanIndex+1]=='.'){
            score++;
            updateScore();
        }
        board[pacmanIndex] = '_';
        board[pacmanIndex + 1] = 'C';
    }
    else{
        if (board[0]=='^'){
            alert('Game Over! The ghost caught Pacman.');
            gameBoard = createGame(10);
            score = 0;
            updateScore();
            renderGame(gameBoard);
            return;

        }
        if (board[board.length-1]=='.'){
            score++;
            updateScore();
        }
        board[0]='C';
        board[board.length-1]='_';
    }
    return board;
}




function updateScore() {
    document.getElementById('score').innerText = `Score: ${score}`;
}


function isLevelComplete(board) {
    return score>=max;
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

    return board;
}


