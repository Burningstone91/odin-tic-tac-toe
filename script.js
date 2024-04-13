class Player {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }

  setSign(sign) {
    this.sign = sign;
  }
}

/* Gameboard is an array of arrays, each array represents a row */
class Gameboard {
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
}

const player1 = new Player("User", 1);
player1.setSign("x");
console.log(player1);

const game = new Gameboard();
game.placeSignOnBoard(1, 6);
game.placeSignOnBoard(2, 8);
console.log(game.getBoardStatus());
