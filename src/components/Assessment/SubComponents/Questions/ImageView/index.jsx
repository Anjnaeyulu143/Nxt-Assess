import "./index.css";

const ImageView = (props) => {
  const { question, submitAnswer, optionSelectedIndex } = props;
  // console.log(question);
  return (
    <>
      <h1 className="question__text">{`${question.questionNum}. ${question.question_text}`}</h1>
      <hr className="divider" />
      <div className="img__options-container">
        {question.options?.map((option, index) => {
          const selectAnswer = () => {
            submitAnswer(index);
          };

          return (
            <button
              key={option.id}
              onClick={selectAnswer}
              className={
                index === optionSelectedIndex
                  ? "image__button-selected"
                  : "image__button"
              }
            >
              <img src={option.image_url} alt={option.text} className="image" />
            </button>
          );
        })}
      </div>
    </>
  );
};
export default ImageView;
