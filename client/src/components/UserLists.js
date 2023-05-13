import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Favorites from "./Favorites";
import Read from "./Read";
import TBR from "./TBR";
import "../styles/UserLists.css";

const UserLists = () => {
  return (
    <Tabs
      defaultActiveKey="favorites"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="favorites" title="Favorites">
        <Favorites />
      </Tab>
      <Tab eventKey="read" title="Read">
        <Read />
      </Tab>
      <Tab eventKey="tbr" title="TBR">
        <TBR />
      </Tab>
    </Tabs>
  );
};

export default UserLists;
