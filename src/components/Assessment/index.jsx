import Header from "../Header";
import { useState, useEffect } from "react";
import { Default } from "./SubComponents/Questions/DefaultView";
import Dropdown from "./SubComponents/Questions/Dropdown";
import ImageView from "./SubComponents/Questions/ImageView";
import Timer from "./SubComponents/TimeProgress";
import Loader from "react-loader-spinner";
import Error from "./SubComponents/Error";

import "./index.css";

const apiStatusConsts = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

export const Assessment = () => {
  const [QuestionsList, setQuestionsList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [apiStatus, setApiStatus] = useState(apiStatusConsts.initial);

  useEffect(() => {
    fetechQuestions();
  }, []);

  const fetechQuestions = async () => {
    setApiStatus(apiStatusConsts.loading);
    const response = await fetch("https://apis.ccbp.in/assess/questions");
    const data = await response.json();

    if (response.ok) {
      setApiStatus(apiStatusConsts.success);
      setQuestionsList(data.questions);
    } else {
      setApiStatus(apiStatusConsts.failure);
      console.log("Failed to fetch questions");
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < QuestionsList?.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const randomQuestion = (questionNum) => {
    setCurrentQuestionIndex(questionNum);
  };

  const sendQuestion = (index) => {
    const question = QuestionsList?.[index];
    return { ...question, questionNum: index + 1 };
  };

  const handleSubmittedAnswers = (answer) => {
    setSubmittedAnswers((prevState) => ({
      ...prevState,
      [currentQuestionIndex]: {
        answer: answer,
        isCorrect:
          QuestionsList[currentQuestionIndex]?.options[answer]?.is_correct,
        display: true,
      },
    }));
  };

  console.log(submittedAnswers);

  const questionType = QuestionsList?.[currentQuestionIndex]?.options_type;
  let initialVal;
  if (questionType === "SINGLE_SELECT") {
    const initialOption = () => {
      const optionsIndex = submittedAnswers?.[currentQuestionIndex]?.answer;
      const initialValue =
        QuestionsList?.[currentQuestionIndex]?.options?.[optionsIndex]?.text;

      if (initialValue === undefined) {
        initialVal = QuestionsList?.[currentQuestionIndex]?.options[0]?.text;
      } else {
        initialVal = initialValue;
      }
    };
    initialOption();
  }

  const selectedIndex = () => {
    const optionsIndex = submittedAnswers?.[currentQuestionIndex]?.answer;
    if (optionsIndex === undefined) {
      return -1;
    } else {
      return optionsIndex;
    }
  };

  let renderQuestion = null;
  let nextBtnStyle;
  switch (questionType) {
    case "IMAGE":
      nextBtnStyle = "next__question-btn-image";
      renderQuestion = (
        <ImageView
          question={sendQuestion(currentQuestionIndex)}
          submitAnswer={handleSubmittedAnswers}
          optionSelectedIndex={selectedIndex()}
        />
      );
      break;
    case "SINGLE_SELECT":
      nextBtnStyle = "next__question-btn-dropdown";

      renderQuestion = (
        <Dropdown
          question={sendQuestion(currentQuestionIndex)}
          submitAnswer={handleSubmittedAnswers}
          submittedAnswers={submittedAnswers}
          initialValue={initialVal}
        />
      );
      break;
    case "DEFAULT":
      nextBtnStyle = "next__question-btn";
      renderQuestion = (
        <Default
          question={sendQuestion(currentQuestionIndex)}
          submitAnswer={handleSubmittedAnswers}
          optionSelectedIndex={selectedIndex()}
        />
      );
      break;
    default:
      renderQuestion = null;
      break;
  }

  const apiStatusSuccess = () => (
    <div className="questions__timer-container">
      <div className="questions__container-assignment">
        <div className="render__question-container">{renderQuestion}</div>
        <div className="button__container">
          {currentQuestionIndex < QuestionsList.length - 1 && (
            <div className={`${nextBtnStyle} button__default-option`}>
              {questionType === "SINGLE_SELECT" &&
                submittedAnswers[currentQuestionIndex]?.answer === 0 && (
                  <div className="option__default-selected">
                    <p>First Option is Selected by default</p>
                  </div>
                )}
              <button onClick={nextQuestion} className="next-btn">
                Next Question
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="timer__container">
        <Timer
          currentQuestion={currentQuestionIndex}
          totalQuestions={QuestionsList}
          nextQuestion={randomQuestion}
          submittedAnswers={submittedAnswers}
        />
      </div>
    </div>
  );

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#263868" height={50} width={50} />
    </div>
  );

  let renderAssemessmentUI = null;
  switch (apiStatus) {
    case apiStatusConsts.loading:
      renderAssemessmentUI = renderLoader();
      break;
    case apiStatusConsts.success:
      renderAssemessmentUI = apiStatusSuccess();
      break;
    case apiStatusConsts.failure:
      renderAssemessmentUI = <Error />;
      break;
    default:
      renderAssemessmentUI = null;
      break;
  }

  return (
    <div>
      <Header />
      <div
        className={
          apiStatus === apiStatusConsts.loading ? "loader__bg-container" : ""
        }
      >
        {renderAssemessmentUI}
      </div>
    </div>
  );
};
