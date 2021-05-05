class PlayerDetail {
  constructor(bid = 0, bidAchieved = true, baseScore = 0, bonusScore = 0, totalScore = 0) {
    this.bid = bid;
    this.bidAchieved = bidAchieved;
    this.baseScore = baseScore;
    this.bonusScore = bonusScore;
    this.totalScore = totalScore;
  }
}

export default PlayerDetail;
