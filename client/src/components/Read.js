import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import "../styles/UserLists.css";


const Read = () => {
  const [readList, setReadList] = useState([]);
  const userIDs = useSelector((state) => state.userID);
  const [readFormat, setReadFormat] = useState([]);
  
  useEffect(() => {
    readFetch();
  }, [userIDs, setReadFormat]);

  const readFetch = async () => {
    const result = await fetch("https://page-by-page.onrender.com/api/readList", {
      method: "GET",
      headers: {
        id: userIDs,
        "Content-Type": "application/json",
      },
    });
    let response = await result.json()
    .then((data) => {
        setReadList(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
      let slicedArr = [];
      for (let i = 0; i < readList.length; i += 3) {
        slicedArr.push(readList.slice(i, i + 3));
      }
      setReadFormat(slicedArr);
    };
    
    const readDelete = async (e) => {
      console.log(e.target.value)
      const result = await fetch("https://page-by-page.onrender.com/api/read/remove", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userIDs,
          read: e.target.value,
        }),
      });
      result
      .json()
      .then((data) => {
        console.log(data);
        let indexPosition = readFormat.indexOf(e.target.value);
        let slicedArr = [];
        for (let i = indexPosition; i < indexPosition + 2; i += 3) {
          slicedArr.push(readFormat.splice(i, i + 3));
        }
        setReadFormat([...readFormat, ...slicedArr]);
        readFetch();
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };


  return (
    <div>
      <div className="content" onMouseEnter={readFetch}>
        <h2>
        ~ Mouse over to see books ~
        </h2>
        <h2>
        ~ Mouse over to see books ~
        </h2>
        </div>
      <Row xs={2} sm={3} md={5} lg={6} xl={8} xxl={10} id="tbr-row">
      {readFormat.map((e) => {
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
                  <Card.Text onMouseOver={readFetch}>
                    <Button className="card-btn">
                      <a id="preview-book-href" href={e[1]} target="_blank" rel="noreferrer">
                        Buy
                      </a>
                    </Button>
                    <Button variant="danger" className="card-btn" value={e[0]} onClick={readDelete}>
                      Remove
                    </Button>
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
export default Read