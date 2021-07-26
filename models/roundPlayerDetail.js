// Deprecated
class RoundPlayerDetail {
  constructor(
    playerId,
    round,
    score = 0,
    bid = 0,
    totalScore = 0,
    isAligned1 = "",
    isAligned2 = "",
    pointsWagered = 0,
    bonusScore = 0,
    baseScore = 0
  ) {
    this.playerId = playerId;
    this.round = round;
    this.score = score;
    this.isAligned1 = isAligned1;
    this.isAligned2 = isAligned2;
    this.pointsWagered = pointsWagered;
    this.bid = bid;
    this.totalScore = totalScore;
    this.bonusScore = bonusScore;
    this.baseScore = baseScore;
  }
}

export default RoundPlayerDetail;
