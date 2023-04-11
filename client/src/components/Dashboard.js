import React, { useState, useEffect } from "react";
import UserLists from "./UserLists";
import "../styles/Dashboard.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from "react-redux";

const Dashboard = () => {
  const userIDs = useSelector((state) => state.userID);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        console.log(data);
        setUsername(data[0]);
        setFirstName(data[1]);
        setLastName(data[2]);
        setEmail(data[3]);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  const userUpdateFetch = async (e) => {
    e.preventDefault()
    setShowForm(false)
 
    const result = await fetch("/api/userUpdate", {
      method: "PUT",
      headers: {
        id: userIDs,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userIDs,
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      }),
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

  const userUpdateForm = () => {
    setShowForm(true)
    handleShow()
  }

  return (
    <div id="container">
      <div id="top-div">
        <img id="avatar-img" alt="user-avatar" src="../../user-avatar.png" />
        <h3>{username}</h3>
        <Button onClick={userUpdateForm}>Update Account</Button>
        {showForm && (
           <div
           className="modal show"
           style={{ display: 'block', position: 'initial' }}
         >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          </Modal.Header>
             <Modal.Body id="update-user-modal-body">

             <form onSubmit={userUpdateFetch}>
            <div>
              Username:
              <input type="text" name="username" placeholder="username" value={username} id='username-update-input' onChange={e => setUsername(e.target.value)}  />
            </div>
            <div>
              First Name:
              <input type="text" name="firstname"  placeholder="firstName" value={firstName} id='firstname-update-input' onChange={e => setFirstName(e.target.value)}  />
            </div>
            <div>
              Last Name:
              <input type="text" name="lastname"  placeholder="lastName" value={lastName} id='lastname-update-input' onChange={e => setLastName(e.target.value)}  />
            </div>
            <div>
              Email:
              <input type="email" name="email"  placeholder="email" value={email} id='email-update-input' onChange={e => setEmail(e.target.value)}  />
            </div>
            <div>
              Password:
              <input type="password" name="password"  placeholder="password" value={password} id='password-update-input' onChange={e => setPassword(e.target.value)}  />
            </div>

          </form>
             </Modal.Body>
             <Modal.Footer>
               <Button  onClick={handleClose} variant="secondary">Cancel</Button>
               <Button type="submit" value="Submit">Save Changes</Button>
             </Modal.Footer>
             </Modal>
         </div>
          
        )}
      </div>
      <div id="bottom-div">
        <UserLists />
      </div>
    </div>
  );
};

export default Dashboard;
