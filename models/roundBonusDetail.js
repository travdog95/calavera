class RoundBonusDetail {
  constructor(
    round,
    alliances = [],
    wager = {},
    piratesCaptured = {},
    normal14s = [],
    black14 = "",
    skullKing = ""
  ) {
    this.round = round;
    this.alliances = alliances;
    this.wager = wager;
    this.piratesCaptured = piratesCaptured;
    this.normal14s = normal14s;
    this.black14 = black14;
    this.skullKing = skullKing;
  }
}

// r1: {
//     round: 1,
//     alliances: [{ playerIds: ["p1", "p2"] }, { playerIds: ["p1", "p3"] }],
//     wager: {
//       playerId: "p4",
//       value: 20,
//     },
//     piratesCaptured: {
//       playerId: "p2",
//       numPirates: 2,
//     },
//     normal14s: [{ playerId: "p2" }, { playerId: "p1" }],
//     black14: "p3",
//     skullKing: "p4"
//   },

export default RoundBonusDetail;
