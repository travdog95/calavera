class Game {
  constructor(game) {
    this.id = game.id;
    this.players = game.players;
    this.numRounds = game.numRounds;
    this.gameData = game.gameData;
    this.currentRound = game.currentRound;
    this.date = game.date;
    this.status = game.status;
    this.winner = game.winner;
    this.rounds = game.rounds;
  }
}

export default Game;
