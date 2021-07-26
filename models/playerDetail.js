class PlayerDetail {
  constructor(
    bid = 0,
    bidAchieved = true,
    baseScore = 0,
    bonusScore = 0,
    totalScore = 0,
    cannonType = 0, //0 - grapeshot, 1 - cannonball
    accuracy = 0 //0 - direct hit, 1 - glancing blow, 2 - complete miss
  ) {
    this.bid = bid;
    this.bidAchieved = bidAchieved;
    this.baseScore = baseScore;
    this.bonusScore = bonusScore;
    this.totalScore = totalScore;
    this.cannonType = cannonType;
    this.accuracy = accuracy;
  }
}

export default PlayerDetail;
