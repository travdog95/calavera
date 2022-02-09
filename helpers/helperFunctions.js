import Defaults from "../constants/defaults";
import Constants from "../constants/constants";
import { forEach } from "lodash";

export default {
  formatDate: (date = null, format = null) => {
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

    const tempDate = date === null ? new Date() : new Date(date);

    const month =
      format === "shortMonth" ? shortMonths[tempDate.getMonth()] : months[tempDate.getMonth()];
    const day = tempDate.getDate();
    const year = tempDate.getFullYear();

    return `${month} ${day}`;
  },

  formatTime: (date = null, format = null) => {
    const tempDate = date === null ? new Date() : new Date(date);

    const hours = tempDate.getHours() > 12 ? tempDate.getHours() - 12 : tempDate.getHours(); //Current Hours
    const min = String(tempDate.getMinutes()).padStart(2, "0"); //Current Minutes
    const sec = tempDate.getSeconds(); //Current Seconds
    const amPm = tempDate.getHours() >= 12 ? "PM" : "AM";

    return `${hours}:${min} ${amPm}`;
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

  calcBaseScore(bid, numCards) {
    if (bid === 0) return numCards * 10;

    if (bid > 0) return bid * 20;
  },
  calcRascalBaseScore(scoringType, numCards, cannonType, accuracy) {
    const rascalEnhancedMultiplier = 1.5;
    let newBaseScore = 0;

    //Rascal scoring
    if (scoringType === Constants.scoringType.rascal) {
      newBaseScore = 0;
      if (accuracy == Constants.accuracy.directHit) newBaseScore = numCards * 10;

      if (accuracy == Constants.accuracy.glancingBlow) newBaseScore = (numCards * 10) / 2;
    }

    //Rascal Enhanced Scoring
    if (scoringType === Constants.scoringType.rascalEnhanced) {
      newBaseScore = 0;

      //Cannonball
      if (cannonType == Constants.cannonType.cannonball) {
        if (accuracy == Constants.accuracy.directHit)
          newBaseScore = numCards * 10 * rascalEnhancedMultiplier;
      }

      //Grapeshot
      if (cannonType == Constants.cannonType.grapeshot) {
        if (accuracy == Constants.accuracy.directHit) newBaseScore = numCards * 10;
        if (accuracy == Constants.accuracy.glancingBlow) newBaseScore = (numCards * 10) / 2;
      }
    }

    return newBaseScore;
  },
  getPlayerIndexByPlayerId(playerId, players) {
    players.forEach((player, index) => {
      if (player.id == playerId) return index;
    });

    return null;
  },
  isUsingRascalScoring(scoringType) {
    return parseInt(scoringType) === Constants.scoringType.rascal ||
      parseInt(scoringType) === Constants.scoringType.rascalEnhanced
      ? true
      : false;
  },
  calcRoundPlayerDetailWidth(numPlayers) {
    let width = 0;

    width = Math.floor((Defaults.windowWidth - Defaults.game.roundNumWidth) / numPlayers);

    return width < Defaults.game.playerMinWidth ? Defaults.game.playerMinWidth : width;
  },
  getScoringTypeItems() {
    const scoringTypeItems = [];

    let i = 0;
    Constants.scoringTypes.forEach((scoringType) => {
      scoringTypeItems.push({ label: scoringType, value: i++ });
    });

    return scoringTypeItems;
  },
};
