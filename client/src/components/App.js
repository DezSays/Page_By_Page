import React from "react";
// import BookDetails from "./BookDetails";
import { useNavigate } from "react-router-dom";
// import Home from "./Home";
import Register from './Register'
import Login from './Login'

const App = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <>
      {/* <Home /> */}
      {/* <Register /> */}
      <Login />
      {/* <button onClick={handleClick}>Book Details</button> */}
    </>
  );
};

export default App;
