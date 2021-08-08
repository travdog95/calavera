class Game {
  //if you had properties to this model, be sure to update the following files:
  // ConfirmNewGameScreen.js createGame function
  // game-actions.js createGame function - 3 places in the
  // game-reducer.js CREATE_GAME & LOAD_GAMES actions

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
    this.scoringType = game.scoringType;
    this.isLastRoundScored = game.isLastRoundScored;
    this.numCardsByRound = game.numCardsByRound;
    // this.roundBonusesDetail = game.roundBonusesDetail;
  }
}

export default Game;
