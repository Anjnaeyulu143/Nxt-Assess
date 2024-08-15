import { withRouter } from "react-router-dom";
import "./index.css";

const Error = (props) => {
  const { history } = props;
  const retry = () => {
    history.replace("/assessment");
  };

  return (
    <div className="error-bg-container">
      <img
        src="https://res.cloudinary.com/djpplkd1b/image/upload/v1723636666/error-image_etznny.png"
        alt="failure view"
        className="error-image"
      />
      <h1 className="error-heading">Oops! Something went wrong</h1>
      <p className="error-paragraph">We are having some trouble</p>
      <button type="button" onClick={retry} className="error-button">
        Retry
      </button>
    </div>
  );
};

export default withRouter(Error);
