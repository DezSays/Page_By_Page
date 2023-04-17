import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import "../styles/UserLists.css";


const Favorites = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const userIDs = useSelector((state) => state.userID);
  const [favoriteFormat, setFavoriteFormat] = useState([]);
  
  useEffect(() => {
    favoriteFetch();
  }, [userIDs, setFavoriteFormat]);

  const favoriteFetch = async () => {
    const result = await fetch("https://page-by-page.onrender.com/api/favoriteList", {
      method: "GET",
      headers: {
        id: userIDs,
        "access-control-allow-origin": "*",
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': '*',
      },
    });
    let response = await result.json()
    .then((data) => {
        setFavoriteList(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
      let slicedArr = [];
      for (let i = 0; i < favoriteList.length; i += 3) {
        slicedArr.push(favoriteList.slice(i, i + 3));
      }
      setFavoriteFormat(slicedArr);
    };
    
    const favoriteDelete = async (e) => {
      console.log(e.target.value)
      const result = await fetch("https://page-by-page.onrender.com/api/favorite/remove", {
        method: "PUT",
        headers: {
          "access-control-allow-origin": "*",
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Methods': '*',
        },
        body: JSON.stringify({
          id: userIDs,
          favorite: e.target.value,
        }),
      });
      result
      .json()
      .then((data) => {
        console.log(data);
        let indexPosition = favoriteFormat.indexOf(e.target.value);
        let slicedArr = [];
        for (let i = indexPosition; i < indexPosition + 2; i += 3) {
          slicedArr.push(favoriteFormat.splice(i, i + 3));
        }
        setFavoriteFormat([...favoriteFormat, ...slicedArr]);
        favoriteFetch();
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };


  return (
    <div>
      <div className="content" onMouseEnter={favoriteFetch}>
        <h2>
        ~ Mouse over to see books ~
        </h2>
        <h2>
        ~ Mouse over to see books ~
        </h2>
        </div>
      <Row xs={2} sm={3} md={5} lg={6} xl={8} xxl={10} id="tbr-row">
      {favoriteFormat.map((e) => {
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
                  <Card.Text onMouseOver={favoriteFetch}>
                    <Button className="card-btn">
                      <a id="preview-book-href" href={e[1]} target="_blank" rel="noreferrer">
                        Buy
                      </a>
                    </Button>
                    <Button variant="danger" className="card-btn" value={e[0]} onClick={favoriteDelete}>
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
export default Favorites