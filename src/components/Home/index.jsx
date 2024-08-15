// import react from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import "./index.css";

const Home = () => {
  const renderInstructionsCard = () => {
    return (
      <div className="home__instructions-card">
        <h1 className="home__instructions-heading">Instructions</h1>
        <ol className="home__instructions-list-container">
          <li className="home__instructions-list-item">
            <span className="home__instructions-list-item-main-text">
              Total Questions
            </span>
            : 10
          </li>
          <li className="home__instructions-list-item">
            <span className="home__instructions-list-item-main-text">
              Types of Questions
            </span>
            : MCQs
          </li>
          <li className="home__instructions-list-item">
            <span>Duration</span>: 10 Mins
          </li>
          <li className="home__instructions-list-item">
            <span className="home__instructions-list-item-main-text">
              Marking Scheme
            </span>
            : Every Correct response, get 1 mark
          </li>
          <li className="home__instructions-list-item">
            {/* <span className="home__instructions-list-item-main-text">
              All the progress will lost, if you reload during assessment
            </span> */}
            All the progress will lost, if you reload during assessment
          </li>
        </ol>
        <Link to="/assessment" className="assessment__button-link">
          <button type="submit" className="start__assessment">
            Start Assessment
          </button>
        </Link>
      </div>
    );
  };

  return (
    <div className="global__bg-container">
      <Header />
      <div className="home__bg-container">
        <img
          src="https://res.cloudinary.com/djpplkd1b/image/upload/v1723374380/home-image_b5tqlu.png"
          alt="assessment"
          className="home__image"
        />
        {renderInstructionsCard()}
      </div>
    </div>
  );
};

export default Home;
