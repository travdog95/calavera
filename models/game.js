class Game {
  constructor(game) {
    this.id = game.id;
    this.gameType = game.gameType;
    this.players = game.players;
    this.numRounds = game.numRounds;
    this.roundData = game.roundData;
    this.scoringRound = game.scoringRound;
    this.selectedRound = game.selectedRound;
    this.date = game.date;
    this.isActive = game.isActive;
    this.winner = game.winner;
    this.roundBonusesDetail = game.roundBonusesDetail;
  }
}

export default Game;
