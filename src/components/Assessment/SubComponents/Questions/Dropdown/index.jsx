import { useEffect } from "react";
import "./index.css";

const Dropdown = (props) => {
  const { question, submitAnswer, submittedAnswers, initialValue } = props;
  console.log("initialValue: ", initialValue);

  useEffect(() => {
    if (submittedAnswers?.[question.questionNum - 1] === undefined) {
      submitAnswer(0);
    }
  }, [submittedAnswers]);

  const selectAnswer = (e) => {
    const indexValue = question?.options?.findIndex(
      (eachObj) => eachObj.text === e.target.value
    );
    submitAnswer(indexValue);
  };

  return (
    <>
      <h1 className="question__text">{`${question.questionNum}.   ${question.question_text}`}</h1>
      <hr className="divider" />
      <select
        onChange={selectAnswer}
        value={initialValue}
        className="dropdown__container"
      >
        {question.options?.map((option, index) => {
          return (
            <option
              key={index}
              value={option.text}
              className="question-dropdown-option-item"
            >
              {option.text}
            </option>
          );
        })}
      </select>
    </>
  );
};
export default Dropdown;
