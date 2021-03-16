class GameRound {
  constructor(
    round,
    alliances = [],
    wagerPirate = false,
    green14 = false,
    black14 = false,
    yellow14 = false,
    purple14 = false,
    skullKing = false,
    numPirates = 0
  ) {
    this.round = round;
    this.alliances = alliances;
    this.wagerPirate = wagerPirate;
    this.green14 = green14;
    this.black14 = black14;
    this.yellow14 = yellow14;
    this.purple14 = purple14;
    this.skullKing = skullKing;
    this.numPirates = numPirates;
  }
}

export default GameRound;
