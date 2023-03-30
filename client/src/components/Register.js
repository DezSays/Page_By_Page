import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";

import "../styles/Login.css";

const Register = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
      }),
    });
    if (result.status === 403) {
      setIsError(true);
      return;
    }
    return await result
      .json()
      .then((data) => {
        setUserName("");
        setPassword("");
        navigate("/login");
      })
      .catch((error) => {
        setIsError(true);
        return;
      });
  };
  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col="4" md="6">
          <h1 id="h1-pbp">Page by Page</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <MDBInput
              onChange={(event) => setFirstName(event.target.value)}
              wrapperClass="mb-4"
              contrast
              label="First Name"
              id="formControlLg"
              type="text"
              size="lg"
            />
            <MDBInput
              onChange={(event) => setLastName(event.target.value)}
              wrapperClass="mb-4"
              contrast
              label="Last Name"
              id="formControlLg"
              type="text"
              size="lg"
            />
            <MDBInput
              onChange={(event) => setUserName(event.target.value)}
              wrapperClass="mb-4"
              contrast
              label="Username"
              id="formControlLg"
              type="text"
              size="lg"
            />
            <MDBInput
              onChange={(event) => setEmail(event.target.value)}
              wrapperClass="mb-4"
              contrast
              label="Email"
              id="formControlLg"
              type="email"
              size="lg"
            />
            <MDBInput
              onChange={(event) => setPassword(event.target.value)}
              wrapperClass="mb-4"
              contrast
              label="Password"
              id="formControlLg"
              type="password"
              size="lg"
            />
            {isError ? <h4>Unable to create account. Try again.</h4> : null}

            <MDBBtn type="submit" className="mb-4 w-100" size="lg">
              Create Account
            </MDBBtn>
          </form>

          <p id="already-have-account">Already have an account?</p>

          <MDBBtn onClick={handleClick} className="mb-4 w-100" size="lg">
            Sign in
          </MDBBtn>
        </MDBCol>

        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            class="img-fluid"
            alt="Page by Page Entry"
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Register;
