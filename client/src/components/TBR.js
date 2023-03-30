import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";

const TBR = () => {
  const [tbrList, setTbrList] = useState([]);
  const [userID, setUserID] = useState(Number);
  const userIDs = useSelector((state) => state.userID);
  const [tbrFormat, setTbrFormat] = useState([]);

  useEffect(() => {
    tbrFetch()
  
  }, [userIDs])
  

  const tbrFetch = async () => {
    setUserID(userIDs);
    const result = await fetch("/api/tbrList", {
      method: "GET",
      headers: {
        id: userID,
        "Content-Type": "application/json",
      },
    });
    await result
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

  return (
    <div>
      <button onClick={tbrFetch}>click</button>

      <Row>
        {tbrFormat.map((e) => {
          return (
            <Col>
              <Card>
                <Card.Img variant="top" src={e[2]} />
                <Card.Body>
                  <Card.Title>{e[0]}</Card.Title>
                  <Card.Text>
                    <button>
                      <a href={e[1]} target="_blank" rel="noreferrer">
                        Preview Book
                      </a>
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
