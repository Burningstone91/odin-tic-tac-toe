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
}

const player1 = new Player("User", 1);
player1.setSign("x");
console.log(player1);

const game = new Gameboard();
game.placeSignOnBoard(1, 5);
game.placeSignOnBoard(2, 8);
game.placeSignOnBoard(2, 7);
game.placeSignOnBoard(2, 4);
console.log(game.getBoardStatus());
console.log(game.isWinner());
