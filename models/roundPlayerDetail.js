class RoundPlayerDetail {
  constructor(
    // gameId,
    playerId,
    round,
    score = 0,
    bid = 0,
    totalScore = 0,
    isAligned1 = false,
    isAligned2 = false,
    pointsWagered = 0
  ) {
    // this.gameId = gameId;
    this.playerId = playerId;
    this.round = round;
    this.score = score;
    this.isAligned1 = isAligned1;
    this.isAligned2 = isAligned2;
    this.pointsWagered = pointsWagered;
    this.bid = bid;
    this.totalScore = totalScore;
  }
}

export default RoundPlayerDetail;
