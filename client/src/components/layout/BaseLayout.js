import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const BaseLayout = (props) => {
  return (
    <>
      <Navbar id="navbar-layout" bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Page by Page</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                <Link to="/">Login</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/register">Register</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/home">Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/dashboard">My Profile</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Button>Sign Out</Button>
        </Container>
      </Navbar>

      {props.children}
    </>
  );
};

export default BaseLayout;
