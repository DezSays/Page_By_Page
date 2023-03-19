import React from "react";
// import BookDetails from "./BookDetails";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const App = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <>
      <Home />
      {/* <button onClick={handleClick}>Book Details</button> */}
    </>
  );
};

export default App;
