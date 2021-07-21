class PlayerDetail {
  constructor(
    bid = 0,
    bidAchieved = true,
    baseScore = 0,
    bonusScore = 0,
    totalScore = 0,
    cannonType = 0 //Rascal Enhanced scoring (0 - Grapeshot, 1 - Cannonball)
  ) {
    this.bid = bid;
    this.bidAchieved = bidAchieved;
    this.baseScore = baseScore;
    this.bonusScore = bonusScore;
    this.totalScore = totalScore;
    this.cannonType = cannonType;
  }
}

export default PlayerDetail;
