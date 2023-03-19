import React from "react";
import UserLists from "./UserLists";
import "../styles/Dashboard.css";
import { Button } from "react-bootstrap";

const Dashboard = () => {
  return (
    <div id="container">
      <div id="top-div">
        <img
          id="avatar-img"
          alt="user-avatar"
          src="../../user-avatar.png"
        />
        <h3>user name</h3>
        <Button>Update Account</Button>
      </div>
      <div id="bottom-div">
        <UserLists />
      </div>
    </div>
  );
};

export default Dashboard;
