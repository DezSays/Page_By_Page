import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import "../styles/UserLists.css";

const BookDetails = ({ bookList }) => {
  const [show, setShow] = useState(false);
  const [book, setBook] = useState("");
  const [bookURL, setBookURL] = useState("");
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [display, setDisplay] = useState(0);
  const [tbr, setTbr] = useState("");
  const [read, setRead] = useState("");
  const [favorite, setFavorite] = useState("");
  const [userID, setUserID] = useState(Number);
  const [preview, setPreview] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userIDs = useSelector((state) => state.userID);

  useEffect(() => {
    fetchBook();
  }, [display]);

  const handleClick = (e) => {
    setBookURL(e.target.value);
    setDisplay(1);
    handleShow();
  };

  const fetchBook = async () => {
    setUserID(userIDs);
    const bookFetch = await fetch(`${bookURL}`);
    const book = await bookFetch.json();
    setPreview(book.volumeInfo.previewLink);
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

  const addTBR = async (e) => {
    setTbr(e.target.value);
    e.preventDefault();
    const result = await fetch("https://page-by-page.onrender.com/api/tbr", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userID,
        tbr: title,
        preview: preview,
        thumbnail: thumbnail,
      }),
    });

    await result
      .json()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  const addFavorite = async (e) => {
    setFavorite(e.target.value);
    e.preventDefault();
    const result = await fetch("https://page-by-page.onrender.com/api/favorite", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userID,
        favorite: title,
        preview: preview,
        thumbnail: thumbnail,
      }),
    });
    await result
      .json()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  const addRead = async (e) => {
    setRead(e.target.value);
    e.preventDefault();
    const result = await fetch("https://page-by-page.onrender.com/api/read", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userID,
        read: title,
        preview: preview,
        thumbnail: thumbnail,
      }),
    });
    await result
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
    <>
        <Row xs={2} sm={3} md={4} lg={5} xl={6} xxl={7} id="tbr-row">
        {bookList.map((e) => {
          let thumbnail =
            e.volumeInfo.imageLinks && e.volumeInfo.imageLinks.smallThumbnail;

          if (thumbnail !== undefined) {
            return (
              <>
                  <Col id="tbr-col">
                    <div id="home-display-book-details-div"
                      onClick={() => {
                        setShow(true);
                        setBook(e);
                      }}
                    >
                      <Card id="home-card">
                        <Card.Img
                          className="mx-auto"
                          id="tbr-card-img"
                          variant="top"
                          src={thumbnail}
                        />
                        <Card.Body id="card-body-home">
                          <Card.Title id="tbr-card-title">
                            {e.volumeInfo.title}
                          </Card.Title>
                          <Card.Text id="card-description-home">
                            {e.volumeInfo.description}
                            </Card.Text>
                            <Card.Text id="card-btn-txt">
                            <Button 
                            id="home-card-btn-details"
                            onClick={handleClick}
                            value={e.selfLink}
                            className="card-btn" 
                            >

                              Details

                          </Button>
                            </Card.Text>
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
          <Button variant="primary" value={title} id={tbr} onClick={addTBR}>
            TBR
          </Button>
          <Button variant="primary" value={title} id={read} onClick={addRead}>
            Already Read
          </Button>
          <Button
            variant="primary"
            value={title}
            id={favorite}
            onClick={addFavorite}
          >
            Favs
          </Button>
        </Modal.Footer>
      </Modal>
      <p id={userID}></p>
      <p id={preview}></p>
    </>
  );
};
export default BookDetails;
