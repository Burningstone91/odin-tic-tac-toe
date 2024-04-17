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
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }

  setSign(sign) {
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

  placeSignOnBoard(playerId, position) {
    if (this.board[position] == 0) {
      this.board[position] = playerId;
    }
  }

  availableCells() {
    const cells = [];
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] == 0) cells.push(i);
    }
    return cells;
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
  constructor() {
    this.player1 = new Player(prompt("Player 1 Name"), 1);
    this.player2 = new Player(prompt("Player 2 Name"), 2);

    this.player1.setSign("x");
    this.player2.setSign("o");

    this.activePlayer = this.player1;

    this.board = new GameBoard();

    this.isOver = false;

    this.message = "";
  }

  switchTurn() {
    this.activePlayer =
      this.activePlayer === this.player1 ? this.player2 : this.player1;
  }

  playRound(position) {
    this.board.placeSignOnBoard(this.activePlayer.id, position);

    if (this.board.isWinner()) {
      this.message = `${this.activePlayer.name} has won the game!`;
      this.isOver = true;
    } else if (this.board.isTie()) {
      this.message = "It's a tie!";
      this.isOver = true;
    } else {
      this.message = "Next Round.";
    }

    this.switchTurn();
  }
}

const game = new GameController();

while (!game.isOver) {
  game.playRound(
    prompt(`${game.activePlayer.name}'s turn. Where to put sign? (0-8)`),
  );
  console.log(game.message);
}

//game.placeSignOnBoard(1, 0);
//game.placeSignOnBoard(2, 1);
//game.placeSignOnBoard(1, 2);
//game.placeSignOnBoard(2, 4);
//game.placeSignOnBoard(1, 3);
//game.placeSignOnBoard(2, 5);
//game.placeSignOnBoard(1, 7);
//game.placeSignOnBoard(2, 6);
//game.placeSignOnBoard(1, 8);
//console.log(game.getBoardStatus());
//console.log(game.isWinner());
//console.log(game.availableCells());
//console.log(game.isTie());
