import React, { useState, useEffect } from "react";
import UserLists from "./UserLists";
import "../styles/Dashboard.css";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const userIDs = useSelector((state) => state.userID);
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // Will use the username, firstname, lastname, email, and password in the form that will be used with the userUpdateFetch function.
  
  useEffect(() => {
    userInfoFetch();
  }, [userIDs]);

  const userInfoFetch = async () => {
    const result = await fetch("/api/user", {
      method: "GET",
      headers: {
        id: userIDs,
        "Content-Type": "application/json",
      },
    });
    result
      .json()
      .then((data) => {
        console.log(data)
        setUsername(data[0])
        setFirstName(data[1])
        setLastName(data[2])
        setEmail(data[3])
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };
  
  const userUpdateFetch = async () => {
    // Need to wait until form is displayed on button click. This will be added to that forms submit button.
    const result = await fetch("/api/userUpdate", {
      method: "PUT",
      headers: {
        id: userIDs,
        "Content-Type": "application/json",
      },
    });
    let response = await result
      .json()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  return (
    <div id="container">
      <div id="top-div">
        <img
          id="avatar-img"
          alt="user-avatar"
          src="../../user-avatar.png"
        />
        <h3>{username}</h3>
        <Button>Update Account</Button>
      </div>
      <div id="bottom-div">
        <UserLists />
      </div>
    </div>
  );
};

export default Dashboard;
