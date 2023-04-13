import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BookDetails from "./BookDetails";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const apiKey = process.env.REACT_APP_API_KEY;

const Home = () => {
  const [search, setSearch] = useState("");
  const [bookList, setBookList] = useState([]);
  const [homeBookList, setHomeBookList] = useState([]);
  const [show, setShow] = useState(false);

  const userIDs = useSelector((state) => state.userID);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    onLoadFetch();
  }, [userIDs]);

  const fetchBooks = () => {
    console.log("first")
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const items = data.items;
        setBookList(items);
      })
      .catch((err) => console.log(err));
  };

  const onLoadFetch = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=flowers&orderBy=newest&key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const items = data.items;
        console.log(items);
        setHomeBookList(items);
      })
      .catch((err) => console.log(err));
  };

  const searchBook = (e) => {
    e = e || window.event;
    if (e.keyCode === 13) {
      setHomeBookList(null)
      fetchBooks();
    }
  };


if(homeBookList !== null){
  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="The Alchemist"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={searchBook}
        />
        <Button variant="success" onClick={fetchBooks}>
          Search
        </Button>
      </div>
      <Row>

      {homeBookList.map((e) => {
       let thumbnail = e.volumeInfo.imageLinks && e.volumeInfo.imageLinks.smallThumbnail;

       let authors = e.volumeInfo.authors;
       let authorsStr = ''
       if(typeof(authors) === Array){
         authorsStr = authors.toString();
       }
       let authorsFormat = authorsStr.split("").join("");

       if (thumbnail !== undefined) {
         return (
           <>
             <Col>

                 <Card className="text-center">
                   <Card.Img variant="top" id="card-img" src={thumbnail} />
                   <Card.Body id="card-body">
                     <Card.Title id="card-title">
                       {e.volumeInfo.title}
                     </Card.Title>
                     <Card.Text id="card-description">
                       {e.volumeInfo.description}
                     </Card.Text>
                     <Card.Text>Author(s): {authorsFormat}</Card.Text>
                     <Card.Text>Genre: {e.volumeInfo.categories}</Card.Text>

                     <Button
                       onClick={handleShow}
                       value={e.selfLink}
                       id="selected-book-btn"
                     >
                       Book URL: {e.selfLink}
                     </Button>
                   </Card.Body>
                 </Card>
             </Col>
             </>
          );
        }
             
      })}
      </Row>
    </div>
  );
}
else{
  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="The Alchemist"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={searchBook}
        />
        <Button variant="success" onClick={fetchBooks}>
          Search
        </Button>
      </div>

      <div className="container">{<BookDetails bookList={bookList} />}</div>
    </div>
  );
}

};
export default Home;
