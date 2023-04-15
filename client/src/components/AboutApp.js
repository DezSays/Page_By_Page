import React from "react";
import "../styles/AboutApp.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const AboutApp = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <div id="about-app-body">
      <br />
      <div id="about-app-container">
        <h2 id="about-app-h2">~ Welcome to Page by Page ~</h2>
        <h5 id="about-app-h5">Search for your favorite books and track what you have read!</h5>
        <p id="about-app-description">This application is designed to allow you to search for books and create a personalized bookshelf. Customize your profile by adding books to the TBR (To Be Read), Read, or Favorites bookshelf. From your bookshelves, you can click to preview the selected book on Google Books. Login or register for an account to get started!</p>
        <div id="about-app-btn-container">
          <Button onClick={handleLogin} variant="warning" id="login-redirect-btn">
            Login
          </Button>
          <Button onClick={handleRegister} variant="warning" id="register-redirect-btn">
            Register
          </Button>
        </div>
      </div>
      <br />
    </div>
  );
};

export default AboutApp;
