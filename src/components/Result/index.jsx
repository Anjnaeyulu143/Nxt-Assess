import Header from "../Header";
import { NxeContext } from "../../context/NxeContext";
import "./index.css";

const Result = (props) => {
  const { history } = props;

  return (
    <NxeContext.Consumer>
      {(value) => {
        const { score, remainingTime } = value;

        const Image =
          remainingTime !== 0
            ? "https://res.cloudinary.com/djpplkd1b/image/upload/v1723608448/results-in-time-image_ucebvo.png"
            : "https://res.cloudinary.com/djpplkd1b/image/upload/v1723608452/results-not-in-time-image_oo7skl.png";

        const altText = remainingTime !== 0 ? "Time Remaining" : "Time Up";

        const getTimeFormat = (milliseconds) => {
          let seconds = parseInt(Math.floor(milliseconds / 1000));
          let minutes = parseInt(Math.floor(seconds / 60));
          let hours = parseInt(Math.floor(minutes / 24));

          let Seconds = parseInt(seconds % 60);
          let Minutes = parseInt(minutes % 60);
          let Hours = parseInt(hours % 24);

          return `${Hours.toString().padStart(
            2,
            "0"
          )}:${Minutes.toString().padStart(
            2,
            "0"
          )}:${Seconds.toString().padStart(2, "0")}`;
        };

        const onClickOpenAssessment = () => {
          history.replace("/assessment");
        };

        return (
          <div>
            <Header />
            <div className="results__bg-container">
              <img src={Image} alt={altText} className="results__image" />
              <div className="results__card-container">
                {remainingTime !== 0 ? (
                  <h1 className="results__score-heading">
                    Congrats! You completed the assessment
                  </h1>
                ) : (
                  <h1 className="results__time-heading">Time is up!</h1>
                )}
                {remainingTime !== 0 ? (
                  <div className="results__time-text-container">
                    <p className="results__score-para">Time Taken:</p>
                    <p className="results__final-time-display">
                      {getTimeFormat(remainingTime)}
                    </p>
                  </div>
                ) : (
                  <p className="results__time-para">
                    You did not complete the assessment within the time.
                  </p>
                )}
                <div className="results__score-text-container">
                  <p className="results__final-score-text">Your Score:</p>
                  <p className="results__final-score-number">{score}</p>
                </div>
                <button
                  onClick={onClickOpenAssessment}
                  className="results__restart-button"
                >
                  {" "}
                  Reattempt
                </button>
              </div>
            </div>
          </div>
        );
      }}
    </NxeContext.Consumer>
  );
};
export default Result;
