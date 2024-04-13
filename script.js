class Player {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }

  setToken(token) {
    this.token = token;
  }
}

const Player1 = new Player("User", 1);
Player1.setToken("x");
console.log(Player1);
