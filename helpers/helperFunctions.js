import Defaults from "../constants/defaults";

export default {
  getCurrentDate: () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const shortMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date();
    const month = shortMonths[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  },

  formatDate: () => {
    let formattedDate = "";

    return formattedDate;
  },

  calcPlayerRoundBonus(roundBonusDetail, playerBonusDetail) {
    if (roundBonusDetail === undefined) return 0;
    if (playerBonusDetail === undefined) return 0;
    let bonusScore = 0;
    for (const bonusItemKey in playerBonusDetail) {
      if (playerBonusDetail[bonusItemKey]) {
        bonusScore += this.calcPlayerBonusItemScore(
          roundBonusDetail,
          playerBonusDetail,
          bonusItemKey
        );
      }
    }

    return bonusScore;
  },

  calcPlayerBonusItemScore(roundBonusDetail, playerBonusDetail, bonusItemKey) {
    if (!roundBonusDetail[bonusItemKey] || !playerBonusDetail[bonusItemKey]) return 0;

    const controlValue = playerBonusDetail[bonusItemKey];
    const multiplier = roundBonusDetail[bonusItemKey].numAvailable === undefined ? 1 : controlValue;
    const defaultScore = Defaults.game.bonusScoreDefaults[bonusItemKey] ?? controlValue;

    return playerBonusDetail[bonusItemKey] ? defaultScore * multiplier : 0;
  },

  calcBaseScore(bid, round) {
    if (bid === 0) return round * 10;

    if (bid > 0) return bid * 20;
  },
};
