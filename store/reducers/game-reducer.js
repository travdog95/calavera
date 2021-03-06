import * as actions from "../actions/game-actions";
import Game from "../../models/game";
import { updateGame } from "../../helpers/db";

//initialize state
const initialState = {
  games: {},
  currentGame: {},
  currentGameId: "",
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_GAME:
      const newGames = {};
      //Create new game
      const newGame = new Game({
        id: action.gameData.id,
        players: action.gameData.players,
        numRounds: action.gameData.numRounds,
        selectedRound: action.gameData.selectedRound,
        scoringRound: action.gameData.scoringRound,
        roundData: action.gameData.roundData,
        date: action.gameData.date,
        isActive: action.gameData.isActive,
        gameType: action.gameData.gameType,
        scoringType: action.gameData.scoringType,
        isLastRoundScored: action.gameData.isLastRoundScored,
        numCardsByRound: action.gameData.numCardsByRound,
      });

      const newGameId = `game${newGame.id}`;
      newGames[newGameId] = newGame;

      return {
        ...state,
        currentGameId: newGameId,
        games: { ...newGames, ...state.games },
      };
    case actions.SET_SCORING_ROUND:
      //Update game json object
      const setScoringRoundGame = {
        ...state.games[state.currentGameId],
        scoringRound: action.scoringRound,
      };

      //Save to database
      updateGame(setScoringRoundGame)
        .then((dbResult) => {
          if (dbResult.rowsAffected !== 1) console.log("error saving game");
        })
        .catch((err) => console.log(err));

      return {
        ...state,
        games: { ...state.games, [state.currentGameId]: setScoringRoundGame },
      };
    case actions.SET_SELECTED_ROUND:
      const setSelectedRoundGame = {
        ...state.games[state.currentGameId],
        selectedRound: action.selectedRound,
      };

      //Save to database
      updateGame(setSelectedRoundGame)
        .then((dbResult) => {
          if (dbResult.rowsAffected !== 1) console.log("error saving game");
        })
        .catch((err) => console.log(err));

      return {
        ...state,
        games: { ...state.games, [state.currentGameId]: setSelectedRoundGame },
      };
    case actions.SET_IS_LAST_ROUND_SCORED:
      //Update game json object
      const setIsLastRoundScoredGame = {
        ...state.games[state.currentGameId],
        isLastRoundScored: action.isLastRoundScored,
      };

      //Save to database
      updateGame(setIsLastRoundScoredGame)
        .then((dbResult) => {
          if (dbResult.rowsAffected !== 1) console.log("error saving game");
        })
        .catch((err) => console.log(err));

      return {
        ...state,
        games: { ...state.games, [state.currentGameId]: setIsLastRoundScoredGame },
      };
    case actions.SAVE_PLAYER_NAME:
      const newPlayers = [];
      const playerId = action.playerId;
      const playerName = action.playerName;

      state.games[state.currentGameId].players.forEach((player) => {
        const newPlayer = {
          id: player.id,
          name: player.id === playerId ? playerName : player.name,
        };
        newPlayers.push(newPlayer);
      });

      const savePlayerNameCurrentGame = {
        ...state.games[state.currentGameId],
        players: newPlayers,
      };

      //Save to database
      updateGame(savePlayerNameCurrentGame)
        .then((dbResult) => {
          if (dbResult.rowsAffected !== 1) console.log("error saving game");
        })
        .catch((err) => console.log(err));

      //Update state store
      state.games[state.currentGameId] = savePlayerNameCurrentGame;

      return {
        ...state,
        games: { ...state.games },
      };
    case actions.UPDATE_ROUND_BONUSES:
      const round = action.round;

      const newRoundBonusDetail = { ...state.games[state.currentGameId].roundBonusesDetail };
      newRoundBonusDetail[`r${round}`].playersBonusDetail[action.playerId] = action.bonusData;
      return {
        ...state,
        games: { ...state.games[state.currentGameId], roundBonusesDetail: newRoundBonusDetail },
      };
    case actions.UPDATE_PLAYER_DETAIL:
      const roundKey = `r${action.round}`;

      const newRoundData = { ...state.games[state.currentGameId].roundData };

      //Merge playerDetail
      const newPlayerData = { ...newRoundData[roundKey][action.playerId], ...action.playerDetail };

      //Add new playerDetail to new roundData object
      newRoundData[roundKey][action.playerId] = newPlayerData;

      const updatedPlayerDetailGame = {
        ...state.games[state.currentGameId],
        roundData: newRoundData,
      };

      return {
        ...state,
        games: { ...state.games, [state.currentGameId]: updatedPlayerDetailGame },
      };
    case actions.UPDATE_TOTAL_SCORES:
      const totalScoresRoundData = { ...state.games[state.currentGameId].roundData };

      const firstPlayer = state.games[state.currentGameId].players[0];

      //Iterate over each round
      for (const [roundKey, roundDetail] of Object.entries(
        state.games[state.currentGameId].roundData
      )) {
        const round = parseInt(roundKey.substring(1));
        let prevTotalScore = 0;
        let totalScore = 0;
        let prevRoundKey = "";
        //Only score rounds that have been played
        if (
          round < state.games[state.currentGameId].scoringRound ||
          (round == state.games[state.currentGameId].numRounds &&
            state.games[state.currentGameId].isLastRoundScored)
        ) {
          // if (roundDetail[firstPlayer.id].baseScore !== 0) {
          //Iterate over each player
          for (const [playerId, playerDetail] of Object.entries(roundDetail)) {
            const newPlayerDetail = {};
            const totalScoresPlayerDetail = {};

            //Calculate total scores
            totalScore = playerDetail.baseScore + playerDetail.bonusScore;
            if (round === 1) {
              totalScoresPlayerDetail = { totalScore };
            } else {
              prevRoundKey = `r${round - 1}`;
              prevTotalScore = totalScoresRoundData[prevRoundKey][playerId].totalScore;
              totalScoresPlayerDetail = {
                totalScore: prevTotalScore + totalScore,
              };
            }

            //Merge total score with the rest of the playerDetail object
            newPlayerDetail = {
              ...totalScoresRoundData[roundKey][playerId],
              ...totalScoresPlayerDetail,
            };

            //Update roundData object with new playerDetail
            totalScoresRoundData[roundKey][playerId] = newPlayerDetail;
          }
        }
      }

      const updatedScoresGame = {
        ...state.games[state.currentGameId],
        roundData: totalScoresRoundData,
      };
      return { ...state, games: { ...state.games, [state.currentGameId]: updatedScoresGame } };
    case actions.COMPLETE_CURRENT_GAME:
      const winner = action.winner;
      //Create new game
      const gameToComplete = { ...state.games[state.currentGameId] };

      //Update winner and isActive
      gameToComplete.winner = winner;
      gameToComplete.isActive = false;

      updateGame(gameToComplete)
        .then((dbResult) => {
          if (dbResult.rowsAffected !== 1) console.log("error saving game");
        })
        .catch((err) => console.log(err));

      return {
        ...state,
        games: { ...state.games, [state.currentGameId]: gameToComplete },
      };
    case actions.LOAD_GAMES:
      const loadedGamesObject = {};
      const parsedGames = action.games.map((game) => {
        return { ...JSON.parse(game.game), id: game.id };
      });

      //Sort games by most recent date
      const sortedGames = parsedGames.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      sortedGames.forEach((game) => {
        const loadedGameObjectId = `game${game.id}`;

        const newLoadedGame = new Game({
          id: game.id,
          players: game.players,
          numRounds: game.numRounds,
          roundData: game.roundData,
          scoringRound: game.scoringRound,
          selectedRound: game.selectedRound,
          date: game.date,
          gameType: game.gameType,
          isActive: game.isActive,
          winner: game.winner,
          scoringType: game.scoringType,
          isLastRoundScored: game.isLastRoundScored,
          numCardsByRound: game.numCardsByRound,
        });

        loadedGamesObject[loadedGameObjectId] = newLoadedGame;
      });

      return { ...state, games: loadedGamesObject };
    case actions.SET_CURRENT_GAME:
      return { ...state, currentGameId: `game${action.game.id}` };
    case actions.UPDATE_NUM_CARDS_BY_ROUND:
      const numCardsByRound = [];
      state.games[state.currentGameId].numCardsByRound.forEach((numCards, index) => {
        if (index + 1 === parseInt(action.round)) {
          numCardsByRound.push(parseInt(action.numCards));
        } else {
          numCardsByRound.push(numCards);
        }
      });

      //Update game json object
      const updateNumCardsByRoundGame = {
        ...state.games[state.currentGameId],
        numCardsByRound,
      };

      //Save to database
      updateGame(updateNumCardsByRoundGame)
        .then((dbResult) => {
          if (dbResult.rowsAffected !== 1) console.log("error saving game");
        })
        .catch((err) => console.log(err));

      return {
        ...state,
        games: { ...state.games, [state.currentGameId]: updateNumCardsByRoundGame },
      };

    default:
      return state;
  }
};

export default gameReducer;
