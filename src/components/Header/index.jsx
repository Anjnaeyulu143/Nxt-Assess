import React from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Header = (props) => {
  const removeCookies = () => {
    Cookies.remove("jwt_token");
    const { history } = props;
    history.replace("/login");
  };

  return (
    <nav className="header__container">
      <Link to="/" className="header__home-link">
        <img
          src="https://res.cloudinary.com/djpplkd1b/image/upload/v1723372489/header-logo_ocilcj.png"
          alt="website logo"
          className="header__logo-img"
        />
      </Link>
      <button onClick={removeCookies} className="header__logout-btn">
        Logout
      </button>
    </nav>
  );
};

export default withRouter(Header);
