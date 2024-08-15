import "./index.css";

export const Default = (props) => {
  const { question, submitAnswer, optionSelectedIndex } = props;
  return (
    <>
      <h1 className="question__text">{`${question.questionNum}.   ${question?.question_text}`}</h1>
      <hr className="divider" />
      <div className="options__container">
        {question?.options?.map((option, index) => {
          const selectAnswer = () => {
            submitAnswer(index);
          };

          return (
            <button
              key={option.id}
              onClick={selectAnswer}
              className={
                index === optionSelectedIndex
                  ? "option__button-selected"
                  : "option__button"
              }
            >
              {option?.text}
            </button>
          );
        })}
      </div>
    </>
  );
};
