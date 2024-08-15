import React from "react";

export const NxeContext = React.createContext({
  score: 0,
  updateScore: () => {},
  remainingTime: 0,
  updateRemainingTime: () => {},
});
