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

const createPlayer = (board) => {
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
    markBoard(index) {
      if (board[index] !== ' ') return;
      board[index] = this.symbol;
      gameBoard.updateBoard();
    },
  };
  return player;
};

const player1 = createPlayer(gameBoard.board);
player1.symbol = 'X';
const player2 = createPlayer(gameBoard.board);
player2.symbol = 'O';

player1.markBoard(2);
player2.markBoard(5);
