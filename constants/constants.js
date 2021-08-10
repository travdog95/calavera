export default {
  scoringTypes: ["Classic", "Rascal", "Rascal Enhanced"],
  accuracy: { directHit: 0, glancingBlow: 1, completeMiss: 2 },
  cannonType: { grapeshot: 0, cannonball: 1 },
  scoringType: { classic: 0, rascal: 1, rascalEnhanced: 2 },
  help: {
    scoringSystem: {
      title: "Scoring Systems",
      helpText: `There are three different ways to score Skull King. You are probably familiar with the Classic scoring. However, there is a new scoring system is called 'Rascal Scoring', and there are two variations. This app can handle all three scoring options!

For detailed information on the new scoring systems, tap on the link below.`,
      url: "https://www.grandpabecksgames.com/rules-skull-king",
      urlText: "Rules - Skull King",
    },
  },
};
