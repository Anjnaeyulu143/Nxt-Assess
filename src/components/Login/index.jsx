import { useState } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import "./index.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ErrMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const ToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
    console.log(username);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const onSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, {
      expires: 3,
    });

    const { history } = props;
    history.replace("/");

    console.log(`jwt_token is ${jwtToken}`);
  };

  const onFailure = (err) => {
    setErrorMessage(err);
    console.log(err);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    console.log("Submitted Successfully");

    const userDetails = { username, password };
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const url = "https://apis.ccbp.in/login";

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      console.log("Logged Successfully");
      onSuccess(data.jwt_token);
    } else {
      console.log("Incorrect Credentials");
      onFailure(data.error_msg);
    }
  };

  const renderPasswordInput = () => (
    <>
      <label htmlFor="password" className="login__input-label">
        PASSWORD
      </label>
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        id="password"
        className="login__input-fields"
        onChange={updatePassword}
        value={password}
      />
      <label className="login-showpassword-label" htmlFor="showpassword">
        <input
          type="checkbox"
          id="showpassword"
          checked={showPassword}
          onChange={ToggleShowPassword}
          style={{ width: "15px", height: "15px" }}
        />
        Show Password
      </label>
    </>
  );

  const renderUserInput = () => (
    <>
      <label htmlFor="username" className="login__input-label">
        USERNAME
      </label>
      <input
        type="text"
        placeholder="Username"
        id="username"
        className="login__input-fields"
        onChange={updateUsername}
        value={username}
      />
    </>
  );

  const jwt_token = Cookies.get("jwt_token");
  if (jwt_token !== undefined) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login__bg-container">
      <form className="login__form-container" onSubmit={submitForm}>
        <img
          src="https://res.cloudinary.com/djpplkd1b/image/upload/v1723360298/login-page-logo_apeccq.png"
          alt="logo"
          className="login-logo"
        />
        <div className="login__input-container">{renderUserInput()}</div>
        <div className="login__input-container">{renderPasswordInput()}</div>
        <div className="login-button-error-container">
          <button className="login-button" type="submit">
            Login
          </button>
          {ErrMessage.length !== 0 && (
            <p className="login-error-message">*{ErrMessage}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
