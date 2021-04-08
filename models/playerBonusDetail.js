class PlayerBonusDetail {
  constructor(
    alliance1 = "",
    alliance2 = "",
    wager = 0,
    pirates = 0,
    normal14s = 0,
    black14 = false,
    skullKing = false
  ) {
    this.alliance1 = alliance1;
    this.alliance2 = alliance2;
    this.wager = wager;
    this.pirates = pirates;
    this.normal14s = normal14s;
    this.black14 = black14;
    this.skullKing = skullKing;
  }
}

export default PlayerBonusDetail;
