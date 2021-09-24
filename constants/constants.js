import React from "react";
import ScorecardHelpText from "../components/help-texts/Scorecard";
import ScoringSystemHelpText from "../components/help-texts/ScoringSystem";
import BidsHelpText from "../components/help-texts/Bids";
import ScoresHelpText from "../components/help-texts/Scores";

export default {
  scoringTypes: ["Classic", "Rascal", "Rascal Enhanced"],
  accuracy: { directHit: 0, glancingBlow: 1, completeMiss: 2 },
  cannonType: { grapeshot: 0, cannonball: 1 },
  scoringType: { classic: 0, rascal: 1, rascalEnhanced: 2 },
  rulesUrl: "https://www.grandpabecksgames.com/rules-skull-king",
  help: {
    scoringSystem: {
      title: "Scoring Systems",
      helpText: <ScoringSystemHelpText />,
    },
    scorecard: {
      title: "Scorecard Screen",
      helpText: <ScorecardHelpText />,
    },
    bids: {
      title: "Bids Screen",
      helpText: <BidsHelpText />,
    },
    scores: {
      title: "Scores Screen",
      helpText: <ScoresHelpText />,
    },
  },
};
