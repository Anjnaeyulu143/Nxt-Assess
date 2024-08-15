import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { Assessment } from "./components/Assessment";
import ProtectedRoute from "./components/ProtectedRoute";
import { Switch, Route } from "react-router-dom";
import { NxeContext } from "./context/NxeContext";
import { useState } from "react";
import Result from "./components/Result";
import NotFound from "./components/NotFound";

const App = () => {
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  const updateScoreInContext = (score) => {
    setScore(score);
  };

  const updateRemainingTimeInContext = (time) => {
    setRemainingTime(time);
    console.log("Updating remaining time in context: ", time);
  };

  return (
    <NxeContext.Provider
      value={{
        score: score,
        remainingTime: remainingTime,
        updateScore: updateScoreInContext,
        updateRemainingTime: updateRemainingTimeInContext,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/assessment" component={Assessment} />
        <ProtectedRoute exact path="/result" component={Result} />
        <Route component={NotFound} />
      </Switch>
    </NxeContext.Provider>
  );
};

export default App;
