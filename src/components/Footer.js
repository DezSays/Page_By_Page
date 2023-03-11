import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FaGithub, FaLinkedin, FaFingerprint } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <Navbar className="footer-container">
      <Container id="score-text-container">
        <div className="footerMain">
          <a
            href="http://www.github.com/DezSays"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub className="icons" size={30} />
          </a>

          <a
            href="https://www.linkedin.com/in/dezarea-bryan/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin className="icons" size={30} />
          </a>

          <a
            href="https://dezthedev.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            <FaFingerprint className="icons" size={30} />
          </a>
        </div>
      </Container>
    </Navbar>
  );
};

export default Footer;
