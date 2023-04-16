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

        if (i < 1) cell.classList.add('row0');
        else if (i > 0 && i < 2) cell.classList.add('row1');
        else cell.classList.add('row2');

        if (cell.id == 0 || cell.id == 3 || cell.id == 6) {
          cell.classList.add('column0');
        };
        if (cell.id == 1 || cell.id == 4 || cell.id == 7) {
          cell.classList.add('column1');
        };
        if (cell.id == 2 || cell.id == 5 || cell.id == 8) {
          cell.classList.add('column2');
        };
        if (cell.id == 0 || cell.id == 4 || cell.id == 8) {
          cell.classList.add('diagonal0');
        }
        if (cell.id == 2 || cell.id == 4 || cell.id == 6) {
          cell.classList.add('diagonal1');
        }
      }
    };
  };
  drawBoard();

  function updateBoard() {
    for (let i = 0; i < 9; i++) {
      document.querySelector(`.cell${i}`).textContent = board[i];
    }
  }
  updateBoard();

  function resetGame() {
    const resetButton = document.querySelector('.refresh-container');
    resetButton.addEventListener('click', () => {
      location.reload();
    });
  }
  resetGame();

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

  let draw = 0;
  function checkIfDraw() {
    for (let i = 0; i < 9; i++) {
      if (gameBoard.board[i] === ' ') return false;
    }

    console.log('DRAW');
    draw++;
    return true;
  }

  function getDrawNumber() {
    return draw;
  }

  function checkIfWinner() {
    const fatherArray = [
      Array.from(document.querySelectorAll('.row0')),
      Array.from(document.querySelectorAll('.row1')),
      Array.from(document.querySelectorAll('.row2')),
      Array.from(document.querySelectorAll('.column0')),
      Array.from(document.querySelectorAll('.column1')),
      Array.from(document.querySelectorAll('.column2')),
      Array.from(document.querySelectorAll('.diagonal0')),
      Array.from(document.querySelectorAll('.diagonal1')),
    ];

    for (let i = 0; i < fatherArray.length; i++) {
      const expectedContent = fatherArray[i][0].textContent;
      const allHave = fatherArray[i].every(
          (square) => square.textContent === expectedContent &&
          expectedContent !== ' ');
      if (allHave) return expectedContent;
    }
    return false;
  }

  function defineWinner(somePlayer, winnerSymbol) {
    if (somePlayer.symbol == winnerSymbol) {
      player1.updateScore();
      console.log('PLAYER 1 WINS');
    }
    else {
      player2.updateScore();
      console.log('PLAYER 2 WINS');
    };
  };


  function startGame(player) {
    gameBoard.updateBoard();
    const winner = controlGame.checkIfWinner();
    if (winner) {
      controlGame.defineWinner(player, winner);
      displayScores.playerScore();
      return;
    }
    if (controlGame.checkIfDraw()) {
      displayScores.tieScore();
      return;
    }
    player.markBoard();
  }

  return {decidePlayer, checkIfDraw, checkIfWinner, defineWinner,
    startGame, getDrawNumber};
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

    getPlayerScore() {
      return this.score;
    },

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
          controlGame.startGame(player);
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


const displayScores = (() => {
  function tieScore() {
    const tieScore = document.querySelector('.score-tie');
    tieScore.textContent = controlGame.getDrawNumber();
  }
  tieScore();

  function playerScore() {
    const p1Score = document.querySelector('.score-1');
    const p2Score = document.querySelector('.score-2');
    p1Score.textContent = player1.getPlayerScore();
    p2Score.textContent = player2.getPlayerScore();
  }
  playerScore();

  return {tieScore, playerScore};
})();

const playerOneScore = sessionStorage.setItem('playerOneScore',
    player1.getPlayerScore());

controlGame.startGame(player1);
