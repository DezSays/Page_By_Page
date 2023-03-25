import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";

import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const handleSubmit = async (e) => {
    console.log('first')
    e.preventDefault();
    const result = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
    });
    if (result.status === 403) {
        setIsError(true)
        return 
    };
    return await result.json()
            .then((data) => {
                setEmail("");
                setPassword("");
                navigate('/')
            })
            .catch((error) => {
                setIsError(true)
                return
            });
    }
  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            class="img-fluid"
            alt="Page by Page Entry"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <h1 id="h1-pbp">Page by Page</h1>
          <br />
          <form onSubmit={handleSubmit}>


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

          <MDBBtn type='submit' className="mb-4 w-100" size="lg">
            Sign in
          </MDBBtn>

          </form>
          {isError ? <h4>Unable to login.</h4> : null} 
          <p id='already-have-account'>Don't have an account?</p>

          <MDBBtn className="mb-4 w-100" size="lg">
            Create Account
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
