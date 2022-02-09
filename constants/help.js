import React from "react";
import ScorecardHelpText from "../components/help-texts/Scorecard";
import ScoringSystemHelpText from "../components/help-texts/ScoringSystem";
import BidsHelpText from "../components/help-texts/Bids";
import ScoresHelpText from "../components/help-texts/Scores";

export default {
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
};
