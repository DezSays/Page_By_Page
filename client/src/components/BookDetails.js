import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


const BookDetails = ({ bookList }) => {
  const [show, setShow] = useState(false);
  const [book, setBook] = useState("");
  const [bookURL, setBookURL] = useState("");
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [display, setDisplay] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchBook();
  }, [display]);

  const handleClick = (e) => {
    setBookURL(e.target.value);
    setDisplay(1);
    handleShow();
  };
  const fetchBook = async () => {
    const bookFetch = await fetch(`${bookURL}`);
    const book = await bookFetch.json();
    setTitle(book.volumeInfo.title);
    setAuthors(book.volumeInfo.authors);
    let img =
      book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail;
    setThumbnail(img);
    let desc = book.volumeInfo.description;
    let descFormat = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
    let descript = desc.replace(descFormat, "");
    setDescription(descript);
    setDisplay(2);
  };
  const test = (e) => {
    console.log(e.target.value)
  }

  return (
    <>
      <Row xs={1} md={2} lg={4} xl={6} className="g-4 ">
        {bookList.map((e) => {
          let thumbnail =
            e.volumeInfo.imageLinks && e.volumeInfo.imageLinks.smallThumbnail;

          let authors = e.volumeInfo.authors;
          let authorsStr = authors.toString();
          let authorsFormat = authorsStr.split("").join("");

          if (thumbnail !== undefined) {
            return (
              <>
                <Col>
                  <div
                    onClick={() => {
                      setShow(true);
                      setBook(e);
                    }}
                  >
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
                          onClick={handleClick}
                          value={e.selfLink}
                          id="selected-book-btn"
                        >
                          Book URL: {e.selfLink}
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              </>
            );
          }
        })}
      </Row>
      <Modal
        style={{ textAlign: "center" }}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <img src={thumbnail} style={{ padding: "5%" }} />
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Author(s): {authors}</p>
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" value={title} onClick={test}>TBR</Button>
          <Button variant="primary" value={title}>Already Read</Button>
          <Button variant="primary" value={title}>Favs</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default BookDetails;
