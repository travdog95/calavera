class Game {
  constructor(game) {
    this.id = game.id;
    this.players = game.players;
    this.numRounds = game.numRounds;
    this.gameData = game.gameData;
    this.currentRound = game.currentRound;
    this.date = game.date;
    this.isActive = game.isActive;
    this.winner = game.winner;
    this.roundBonusesDetail = game.roundBonusesDetail;
  }
}

export default Game;
