import { useState } from "react";
import { withRouter } from "react-router-dom";
import { NxeContext } from "../../../../context/NxeContext";
import "./index.css";

const Timer = (props) => {
  const EXAM_TIME = 600 * 1000;

  const {
    totalQuestions,
    nextQuestion,
    submittedAnswers,
    history,
    currentQuestion,
  } = props;
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME);

  console.log(totalQuestions);
  console.log(Object.keys(submittedAnswers).length);

  const answerd_questions = Object?.keys(submittedAnswers)?.length;
  const remaining_questions = totalQuestions?.length - answerd_questions;

  const result = () => {
    let score = 0;
    for (let i = 0; i < totalQuestions.length; i++) {
      console.log("i", i);
      console.log(submittedAnswers[i]);
      if (submittedAnswers[i]?.isCorrect === "true") {
        score = score + 1;
      }
    }
    return score;
  };

  const getTimeFormat = (milliseconds) => {
    let seconds = parseInt(Math.floor(milliseconds / 1000));
    let minutes = parseInt(Math.floor(seconds / 60));
    let hours = parseInt(Math.floor(minutes / 24));

    let Seconds = parseInt(seconds % 60);
    let Minutes = parseInt(minutes % 60);
    let Hours = parseInt(hours % 60);

    return `${Hours.toString().padStart(2, "0")}:${Minutes.toString().padStart(
      2,
      "0"
    )}:${Seconds.toString().padStart(2, "0")}`;
  };
  return (
    <NxeContext.Consumer>
      {(value) => {
        const { updateScore, updateRemainingTime } = value;

        const timeOutId = setTimeout(() => {
          if (timeLeft === 0) {
            timeIsUp();
          } else {
            setTimeLeft(timeLeft - 1000);
          }
        }, 1000);

        const timeIsUp = () => {
          clearTimeout(timeOutId);
          const TotalScore = result();
          updateScore(TotalScore);
          updateRemainingTime(0);
          console.log("Time is up");
          history.replace("/result");
        };

        const updateScoreInContext = () => {
          clearTimeout(timeOutId);
          // Calculate and update score and remaining time in context
          const TotalScore = result();
          const RemainingTime = EXAM_TIME - timeLeft;
          //   console.log("Remaining Time:", RemainingTime);
          console.log("Exam Time:", EXAM_TIME);
          console.log("TimeLeft:", timeLeft);
          updateScore(TotalScore);
          updateRemainingTime(RemainingTime);
          history.replace("/result");
        };

        return (
          <>
            <div className="time__left-container">
              <h1 className="time__left-text">Time Left</h1>
              <h1 className="time__left-timer">{getTimeFormat(timeLeft)}</h1>
            </div>
            <div className="questions__container-timer">
              <div className="answered__unanswered-questions">
                <div className="answered__container">
                  <div className="answered__questions-container">
                    <span className="answered__questions-number">
                      {answerd_questions}
                    </span>
                  </div>
                  <span className="answered__questions-text">
                    Answered Questions
                  </span>
                </div>
                <div className="unanswered__questions">
                  <div className="unanswered__questions-container">
                    <span>{remaining_questions}</span>
                  </div>
                  <span className="unanswered__questions-text">
                    Unanswered Questions
                  </span>
                </div>
              </div>
              <hr className="horizontal__Line" />
              <div className="questions-container">
                <h className="number_questions">{`Questions (${totalQuestions.length})`}</h>
                <div className="btn__container">
                  {totalQuestions.map((object, index) => {
                    const handleQuestion = () => {
                      nextQuestion(index);
                    };

                    let questionNumberStyle;
                    if (submittedAnswers[index] !== undefined) {
                      questionNumberStyle = "question__number-btn-submitted";
                    } else if (index === currentQuestion) {
                      questionNumberStyle = "question__number-btn-active";
                    } else {
                      questionNumberStyle = "question__number-btn";
                    }

                    return (
                      <button
                        key={object.id}
                        onClick={handleQuestion}
                        className={questionNumberStyle}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="submit__btn-container">
                <button onClick={updateScoreInContext} className="submit__btn">
                  Submit Assignment
                </button>
              </div>
            </div>
          </>
        );
      }}
    </NxeContext.Consumer>
  );
};
export default withRouter(Timer);
