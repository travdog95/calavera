class RoundPlayerDetail {
  constructor(
    playerId,
    round,
    score = 0,
    bid = 0,
    totalScore = 0,
    isAligned1 = 0,
    isAligned2 = 0,
    pointsWagered = 0,
    hasTopScore = 0
  ) {
    this.playerId = playerId;
    this.round = round;
    this.score = score;
    this.isAligned1 = isAligned1;
    this.isAligned2 = isAligned2;
    this.pointsWagered = pointsWagered;
    this.bid = bid;
    this.totalScore = totalScore;
    this.hasTopScore = hasTopScore;
  }
}

export default RoundPlayerDetail;
