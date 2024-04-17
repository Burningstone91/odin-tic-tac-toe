const gameBoardUI = document.querySelector(".gameboard");
const startBtn = document.querySelector(".start-button");
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

class Player {
  constructor(name, sign) {
    this.name = name;
    this.sign = sign;
  }
}

class GameBoard {
  constructor() {
    this.board = Array(9).fill(0);
  }

  getBoardStatus() {
    return this.board;
  }

  placeSignOnBoard(playerSign, cell) {
    if (this.board[cell] == 0) {
      this.board[cell] = playerSign;
    }
  }

  availableCells() {
    const cells = [];
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] == 0) cells.push(i);
    }
    return cells;
  }

  isCellFree(cell) {
    return this.board[cell] == 0;
  }

  isWinner() {
    for (let combi of winningCombinations) {
      if (
        this.board[combi[0]] == this.board[combi[1]] &&
        this.board[combi[1]] == this.board[combi[2]] &&
        this.board[combi[0]] != 0
      )
        return true;
    }
    return false;
  }

  isTie() {
    return !this.isWinner() && this.availableCells().length == 0;
  }

  resetBoard() {
    this.board = Array(9).fill(0);
  }
}

class GameController {
  startGame() {
    UIController.resetGameBoard();
    this.player1 = new Player(prompt("Player 1 Name"), "X");
    this.player2 = new Player(prompt("Player 2 Name"), "O");
    this.activePlayer = this.player1;
    this.board = new GameBoard();

    gameBoardUI.addEventListener("click", (e) => {
      const cell = e.target.classList[0].split("-")[1];
      if (
        this.board.isCellFree(cell) &&
        !this.board.isWinner() &&
        !this.board.isTie()
      ) {
        this.playRound(cell);
      }
    });
  }

  switchTurn() {
    this.activePlayer =
      this.activePlayer === this.player1 ? this.player2 : this.player1;
  }

  playRound(cell) {
    this.board.placeSignOnBoard(this.activePlayer.sign, cell);
    UIController.placeSignOnBoard(this.activePlayer.sign, cell);

    if (this.board.isWinner()) {
      UIController.updateMessage(`${this.activePlayer.name} has won the game!`);
    } else if (this.board.isTie()) {
      UIController.updateMessage("It's a tie!");
    } else {
      UIController.updateMessage("Next Round.");
    }

    this.switchTurn();
  }
}

class UIController {
  static resetGameBoard() {
    for (let i = 0; i < 9; i++) {
      document.querySelector(`.cell-${i}`).textContent = "";
    }
  }

  static placeSignOnBoard(sign, cell) {
    const cellBtn = document.querySelector(`.cell-${cell}`);
    cellBtn.textContent = sign;
  }

  static updateMessage(message) {
    document.querySelector(".message").textContent = message;
  }
}

startBtn.addEventListener("click", () => {
  const game = new GameController();
  game.startGame();
});
