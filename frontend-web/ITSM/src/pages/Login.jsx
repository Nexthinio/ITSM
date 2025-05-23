import "../assets/GeneralLP.css";
import "../assets/FormLP.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import person from "../assets/icons/user-icon.png";
import lock from "../assets/icons/password-icon.png";
import NavigationLP from "../components/NavigationLP";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userCredentials = {
      login: login,
      password: password,
    };

    try {
      let response = await fetch("https://localhost:63728/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });

      if (response.ok) {
        const data = await response.text();
        console.log("Zalogowano pomyślnie:", data);
      } else {
        console.log("Błąd logowania:", response.status);
      }
    } catch (error) {
      console.error("Wystąpił błąd:", error);
    }
  };

  const handleUsernameChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <NavigationLP />
      <div className="login-container">
        <form onSubmit={handleSubmit} className="form">
          <p className="login">Login</p>
          <div className="inputs">
            <div className="username">
              <input
                onChange={handleUsernameChange}
                placeholder="Username"
                type="text"
              />
              <img src={person} alt="" />
            </div>
            <div className="password">
              <input
                onChange={handlePasswordChange}
                placeholder="Password"
                type="password"
              />
              <img src={lock} alt="" />
            </div>
          </div>
          <div className="remember-me">
            <input type="checkbox" />
            <span className="remember-me-text">Remember me</span>
            <Link className="forgot-password" to="/">
              Forgot Password?
            </Link>
          </div>
          <div className="login-button">
            <button type="submit">Login</button>
          </div>
          <div className="login-register">
            Don't have an account yet? <Link to="/">Register</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
