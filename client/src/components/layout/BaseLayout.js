import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import alterID from "../../actions/alterID";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const BaseLayout = (props) => {
  const dispatch = useDispatch();
    const userID = useSelector((state) => state.userID);

  const handleSignOut = () => {
    dispatch(alterID(0))
  }
  if(userID !== 0 && userID !== null){
    console.log(userID)

    return (
      <>
      <Navbar id="navbar-layout" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Page by Page</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" id="nav-collapse" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                <Link to="/home">Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/dashboard">My Profile</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Button onClick={handleSignOut}>
            <Link id="sign-out-btn" to="/login">Sign Out</Link>
            </Button>
        </Container>
      </Navbar>

      {props.children}
    </>
  );
}
else{
  return(
    <>
          {props.children}
    </>
  )
}
};

export default BaseLayout;
