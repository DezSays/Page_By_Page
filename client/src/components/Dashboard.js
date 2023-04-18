import React, { useState, useEffect } from "react";
import UserLists from "./UserLists";
import "../styles/Dashboard.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const navigate = useNavigate();
  const userIDs = useSelector((state) => state.userID);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    userInfoFetch();
  }, [userIDs]);

  const userInfoFetch = async () => {
    const result = await fetch("https://page-by-page.onrender.com/api/user", {
      method: "GET",
      headers: {
        id: userIDs,
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
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
    console.log('clicked')
    e.preventDefault();
    setShowForm(false);

    const result = await fetch(
      "https://page-by-page.onrender.com/api/userUpdate",
      {
        method: "PUT",
        headers: {
          id: userIDs,
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({
          id: userIDs,
          username: username,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      }
    );
    let response = await result
      .json()
      .then((data) => {
        console.log(data);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  const userDeleteFetch = async () => {
    const result = await fetch(
      "https://page-by-page.onrender.com/api/user/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({
          id: userIDs,
        }),
      }
    );
    let response = await result
      .json()
      .then((data) => {
        console.log(data);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  const userUpdateForm = () => {
    setShowForm(true);
    handleShow();
  };

  return (
    <div id="container">
      <div id="top-div">
        <img id="avatar-img" alt="user-avatar" src="../../user-avatar.png" />
        <h3>{username}</h3>
        <div id="account-btn-container">
          <Button id="update-account-btn" onClick={userUpdateForm}>
            Update Account
          </Button>
          <Button
            id="delete-account-btn"
            variant="danger"
            onClick={handleShow1}
          >
            Delete Account
          </Button>
        </div>
        {showForm && (
          <div
            className="modal show"
            style={{ display: "block", position: "initial" }}
          >
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton></Modal.Header>
              <form id="update-user-form" onSubmit={userUpdateFetch}>
                <Modal.Body id="update-user-modal-body">
                  <div>
                    Username:
                    <input
                      type="text"
                      name="username"
                      placeholder="username"
                      value={username}
                      id="username-update-input"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    First Name:
                    <input
                      type="text"
                      name="firstname"
                      placeholder="firstName"
                      value={firstName}
                      id="firstname-update-input"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    Last Name:
                    <input
                      type="text"
                      name="lastname"
                      placeholder="lastName"
                      value={lastName}
                      id="lastname-update-input"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div>
                    Email:
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      value={email}
                      id="email-update-input"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    Password:
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      value={password}
                      id="password-update-input"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handleClose} variant="secondary">
                    Cancel
                  </Button>
                  <Button type="submit" value="Submit">
                    Save Changes
                  </Button>
                </Modal.Footer>
              </form>
            </Modal>
          </div>
        )}
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>WARNING</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {firstName}, are you sure you want to delete your account? This
            cannot be undone!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Cancel
            </Button>
            <Button variant="danger" onClick={userDeleteFetch}>
              Permanently Delete Account
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div id="bottom-div">
        <UserLists />
      </div>
    </div>
  );
};

export default Dashboard;
