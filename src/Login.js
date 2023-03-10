import React from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput
}
from 'mdb-react-ui-kit';

import './Login.css'



const Login = () => {
  
  return (
    
<MDBContainer fluid className="p-3 my-5">

<MDBRow>

  <MDBCol col='10' md='6'>
    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Page by Page Entry" />
  </MDBCol>

  <MDBCol col='4' md='6'>
    <h1 id='h1-pbp'>Page by Page</h1>
    <br/>

    <MDBInput wrapperClass='mb-4' contrast  label='Email' id='formControlLg' type='email' size="lg"/>
    <MDBInput wrapperClass='mb-4' contrast  label='Password' id='formControlLg' type='password' size="lg"/>


    <MDBBtn className="mb-4 w-100" size="lg">Sign in</MDBBtn>


    <MDBBtn className="mb-4 w-100" size="lg">Create Account</MDBBtn>

  </MDBCol>

</MDBRow>

</MDBContainer>
  )
}

export default Login