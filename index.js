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
    score: 0,
    updateScore() {
      this.score++;
    },
    markBoard: board,
  };
  return player;
};

const player1 = createPlayer(gameBoard.board);
const player2 = createPlayer(gameBoard.board);

player1.markBoard[1] = 'X';
player2.markBoard[gameBoard.board.length - 1] = 'O';
gameBoard.updateBoard();
