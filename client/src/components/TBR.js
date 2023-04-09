import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import "../styles/UserLists.css";

const TBR = () => {
  const [tbrList, setTbrList] = useState([]);
  const [userID, setUserID] = useState(Number);
  const userIDs = useSelector((state) => state.userID);
  const [tbrFormat, setTbrFormat] = useState([]);

  useEffect(() => {
    setUserID(userIDs);
    tbrFetch();
  }, [userIDs, setTbrFormat]);

  const tbrFetch = async () => {
    const result = await fetch("/api/tbrList", {
      method: "GET",
      headers: {
        id: userIDs,
        "Content-Type": "application/json",
      },
    });
    result
      .json()
      .then((data) => {
        setTbrList(data);
        console.log(tbrList);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
    let slicedArr = [];
    for (let i = 0; i < tbrList.length; i += 3) {
      slicedArr.push(tbrList.slice(i, i + 3));
    }
    setTbrFormat(slicedArr);
  };

  const tbrDelete = async (e) => {
    const result = await fetch("/api/tbr/remove", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userIDs,
        tbr: e.target.value,
      }),
    });
    result
      .json()
      .then((data) => {
        console.log(data);
        let indexPosition = tbrFormat.indexOf(e.target.value);
        let slicedArr = [];
        for (let i = indexPosition; i < indexPosition + 2; i += 3) {
          slicedArr.push(tbrFormat.splice(i, i + 3));
        }
        setTbrFormat([...tbrFormat, slicedArr]);
        tbrFetch();
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  return (
    <div>
      <div onMouseEnter={tbrFetch}>Mouse over to load TBR list</div>
      <Row xs={2} sm={4} md={5} lg={6} xl={8} xxl={10} id="tbr-row">
        {tbrFormat.map((e) => {
          return (
            <Col id="tbr-col">
              <Card id="tbr-card">
                <Card.Img
                  className="mx-auto"
                  id="tbr-card-img"
                  variant="top"
                  src={e[2]}
                />
                <Card.Body>
                  <Card.Title id="tbr-card-title">{e[0]}</Card.Title>
                  <Card.Text onMouseOver={tbrFetch}>
                    <button id="tbr-card-btn">
                      <a href={e[1]} target="_blank" rel="noreferrer">
                        Preview Book
                      </a>
                    </button>
                    <button value={e[0]} onClick={tbrDelete}>
                      X
                    </button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default TBR;
