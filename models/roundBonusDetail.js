class RoundBonusDetail {
  constructor(
    round,
    playersBonusDetail,
    alliance1 = { isAvailable: true },
    alliance2 = { isAvailable: true },
    wager = { isAvailable: true },
    pirates = { isAvailable: true, numAvailable: 6 },
    normal14s = { isAvailable: true, numAvailable: 3 },
    black14 = { isAvailable: true },
    skullKing = { isAvailable: true }
  ) {
    this.round = round;
    this.alliance1 = alliance1;
    this.alliance2 = alliance2;
    this.wager = wager;
    this.pirates = pirates;
    this.normal14s = normal14s;
    this.black14 = black14;
    this.skullKing = skullKing;
    this.playersBonusDetail = playersBonusDetail;
  }
}

export default RoundBonusDetail;
