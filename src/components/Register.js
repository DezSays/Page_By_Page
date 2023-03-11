import React from 'react'
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput
}
from 'mdb-react-ui-kit';

import '../styles/Login.css'

const Register = () => {
  return (
    <MDBContainer fluid className="p-3 my-5">
    <MDBRow>
    <MDBCol col="4" md="6">
        <h1 id="h1-pbp">Page by Page</h1>
        <br />

        <MDBInput
          wrapperClass="mb-4"
          contrast
          label="First Name"
          id="formControlLg"
          type="text"
          size="lg"
        />
        <MDBInput
          wrapperClass="mb-4"
          contrast
          label="Last Name"
          id="formControlLg"
          type="text"
          size="lg"
        />
        <MDBInput
          wrapperClass="mb-4"
          contrast
          label="Username"
          id="formControlLg"
          type="text"
          size="lg"
        />
        <MDBInput
          wrapperClass="mb-4"
          contrast
          label="Email"
          id="formControlLg"
          type="email"
          size="lg"
        />
        <MDBInput
          wrapperClass="mb-4"
          contrast
          label="Password"
          id="formControlLg"
          type="password"
          size="lg"
        />

        <MDBBtn className="mb-4 w-100" size="lg">
          Create Account
        </MDBBtn>

        <p id='already-have-account'>Already have an account?</p>

        <MDBBtn className="mb-4 w-100" size="lg">
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
  )
}

export default Register