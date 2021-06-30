import * as actions from "../actions/game-actions";
import Game from "../../models/game";
import { updateGame } from "../../helpers/db";

//initialize state
const initialState = {
  games: [],
  gamesObject: {},
  currentGame: {},
  currentGameId: 0,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_GAME:
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
      });

      const newGameId = `game${newGame.id}`;
      // const newGames = {...state.games, newGameId: newGame};
      const newGames = state.games.concat(newGame);

      return {
        ...state,
        currentGame: newGame,
        currentGameId: newGameId,
        games: newGames,
        gamesObject: { ...state.games, newGameId: newGame },
      };
    case actions.SET_SCORING_ROUND:
      return {
        ...state,
        currentGame: { ...state.currentGame, scoringRound: action.scoringRound },
      };
    case actions.SET_SELECTED_ROUND:
      return {
        ...state,
        currentGame: { ...state.currentGame, selectedRound: action.selectedRound },
      };
    case actions.SAVE_PLAYER_NAME:
      const newPlayers = [];
      const playerId = action.playerId;
      const playerName = action.playerName;

      state.currentGame.players.forEach((player) => {
        const newPlayer = {
          id: player.id,
          name: player.id === playerId ? playerName : player.name,
        };
        newPlayers.push(newPlayer);
      });

      const savePlayerNameCurrentGame = { ...state.currentGame, players: newPlayers };

      updateGame(savePlayerNameCurrentGame)
        .then((dbResult) => {
          if (dbResult.rowsAffected !== 1) console.log("error saving game");
        })
        .catch((err) => console.log(err));

      return {
        ...state,
        currentGame: savePlayerNameCurrentGame,
      };
    case actions.UPDATE_ROUND_BONUSES:
      const round = action.round;

      const newRoundBonusDetail = { ...state.currentGame.roundBonusesDetail };
      newRoundBonusDetail[`r${round}`].playersBonusDetail[action.playerId] = action.bonusData;
      return {
        ...state,
        currentGame: { ...state.currentGame, roundBonusesDetail: newRoundBonusDetail },
      };
    case actions.UPDATE_PLAYER_DETAIL:
      const roundKey = `r${action.round}`;

      const newRoundData = { ...state.currentGame.roundData };

      //Merge playerDetail
      const newPlayerData = { ...newRoundData[roundKey][action.playerId], ...action.playerDetail };

      //Add new playerDetail to new roundData object
      newRoundData[roundKey][action.playerId] = newPlayerData;

      return { ...state, currentGame: { ...state.currentGame, roundData: newRoundData } };
    case actions.UPDATE_TOTAL_SCORES:
      const totalScoresRoundData = { ...state.currentGame.roundData };

      const firstPlayer = state.currentGame.players[0];

      //Iterate over each round
      for (const [roundKey, roundDetail] of Object.entries(state.currentGame.roundData)) {
        const round = parseInt(roundKey.substring(1));
        let prevTotalScore = 0;
        let totalScore = 0;
        let prevRoundKey = "";

        //Only score rounds that have been played
        if (roundDetail[firstPlayer.id].baseScore !== 0) {
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

      return { ...state, currentGame: { ...state.currentGame, roundData: totalScoresRoundData } };
    case actions.COMPLETE_CURRENT_GAME:
      const winner = action.winner;
      //Create new game
      const gameToComplete = { ...state.currentGame };

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
        currentGame: gameToComplete,
      };
    case actions.LOAD_GAMES:
      console.log("Load Games");
      const loadedGamesObject = {};
      const loadedGames = action.games.map((game) => {
        const jsonGame = JSON.parse(game.game);
        const loadedGameObjectId = `game${game.id}`;

        const newLoadedGame = new Game({
          id: game.id,
          players: jsonGame.players,
          numRounds: jsonGame.numRounds,
          roundData: jsonGame.roundData,
          scoringRound: jsonGame.scoringRound,
          selectedRound: jsonGame.selectedRound,
          date: jsonGame.date,
          gameType: jsonGame.gameType,
          isActive: jsonGame.isActive,
          winner: jsonGame.winner,
        });

        loadedGamesObject[loadedGameObjectId] = newLoadedGame;

        return newLoadedGame;
      });

      return { ...state, games: loadedGames, gamesObject: loadedGamesObject };
    case actions.SET_CURRENT_GAME:
      return { ...state, currentGame: action.game };
    default:
      return state;
  }
};

export default gameReducer;
