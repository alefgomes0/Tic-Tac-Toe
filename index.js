/* eslint-disable require-jsdoc */
const gameBoard = (() => {
  const board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

  // eslint-disable-next-line require-jsdoc
  function drawBoard() {
    const container = document.querySelector('.board');
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        cell = document.createElement('div');
        container.appendChild(cell);
        cell.classList.add(`cell`, `cell${i * 3 + j}`);
        cell.setAttribute('id', `${i * 3 + j}`);
      }
    }
  }
  drawBoard();
  function updateBoard() {
    for (let i = 0; i < 9; i++) {
      document.querySelector(`.cell${i}`).textContent = board[i];
    }
  }
  updateBoard();

  return {board, updateBoard};
})();

const controlGame = (() => {
  let lastPlayed = 'O';
  function decidePlayer() {
    if (lastPlayed === 'O') {
      lastPlayed = 'X';
      return 'X';
    } else {
      lastPlayed = 'O';
      return 'O';
    }
  }
  function checkIfDraw() {
    for (let i = 0; i < 9; i++) {
      if (gameBoard.board === ' ') return false;
    }
    console.log('DRAW');
    return true;
  }
  function startGame() {
    const checker = checkIfDraw();
    if (checker === true) return;
    createPlayer.markBoard();
  }
  return {decidePlayer, startGame};
})();

const createPlayer = (board, controlGame) => {
  const player = {
    set symbol(symbol) {
      this._symbol = symbol;
    },
    get symbol() {
      return this._symbol;
    },
    score: 0,
    updateScore() {
      this.score++;
    },
    markBoard() {
      const cells = document.querySelectorAll('.cell');
      cells.forEach((cell) => {
        cell.addEventListener('click', (event) => {
          if (event.target.textContent !== ' ') return;
          const clickedCell = Number(event.target.id);
          board[clickedCell] = controlGame.decidePlayer();
          gameBoard.updateBoard();
          return;
        });
      });
    },
  };
  return player;
};


const player1 = createPlayer(gameBoard.board, controlGame);
player1.symbol = 'X';
const player2 = createPlayer(gameBoard.board, controlGame);
player2.symbol = 'O';

player1.markBoard();
