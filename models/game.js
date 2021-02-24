class Game {
  constructor(id, players, numRounds, currentRound, gameData, date) {
    this.id = id;
    this.players = players;
    this.numRounds = numRounds;
    this.gameData = gameData;
    this.currentRound = currentRound;
    this.date = date;
  }
}

export default Game;
