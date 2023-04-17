import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BookDetails from "./BookDetails";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import "../styles/UserLists.css";

const apiKey = process.env.REACT_APP_API_KEY;

const Home = () => {
  const [search, setSearch] = useState("");
  const [bookList, setBookList] = useState([]);
  const [homeBookList, setHomeBookList] = useState([]);
  const [show, setShow] = useState(false);
  const [book, setBook] = useState("");
  const [bookURL, setBookURL] = useState("");
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [tbr, setTbr] = useState("");
  const [read, setRead] = useState("");
  const [favorite, setFavorite] = useState("");
  const [userID, setUserID] = useState(Number);
  const [preview, setPreview] = useState("");
  const [display, setDisplay] = useState(0);

  const userIDs = useSelector((state) => state.userID);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    onLoadFetch();
    fetchBook();
  }, [userIDs, display]);

  const fetchBooks = () => {
    setUserID(userIDs);
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

  const handleClick = (e) => {
    setBookURL(e.target.value);
    setDisplay(1);
    handleShow();
    fetchBook();
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
        setPreview(data.volumeInfo.previewLink);
        setTitle(data.volumeInfo.title);
        setAuthors(data.volumeInfo.authors);
        let img =
          data.volumeInfo.imageLinks &&
          data.volumeInfo.imageLinks.smallThumbnail;
        setThumbnail(img);
        let desc = data.volumeInfo.description;
        let descFormat = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
        let descript = desc.replace(descFormat, "");
        setDescription(descript);
      })
      .catch((err) => console.log(err));
  };

  const searchBook = (e) => {
    e = e || window.event;
    if (e.keyCode === 13) {
      setHomeBookList(null);
      fetchBooks();
    }
  };

  const addRead = async (e) => {
    setRead(e.target.value);
    e.preventDefault();
    const result = await fetch("https://page-by-page.onrender.com/api/read", {
      method: "PUT",
      headers: {
        "access-control-allow-origin": "*",
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': '*',
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

  const addFavorite = async (e) => {
    setFavorite(e.target.value);
    e.preventDefault();
    const result = await fetch(
      "https://page-by-page.onrender.com/api/favorite",
      {
        method: "PUT",
        headers: {
          "access-control-allow-origin": "*",
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Methods': '*',
        },
        body: JSON.stringify({
          id: userID,
          favorite: title,
          preview: preview,
          thumbnail: thumbnail,
        }),
      }
    );
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

  const addTBR = async (e) => {
    setTbr(e.target.value);
    e.preventDefault();
    const result = await fetch("https://page-by-page.onrender.com/api/tbr", {
      method: "PUT",
      headers: {
        "access-control-allow-origin": "*",
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': '*',
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

  if (homeBookList !== null) {
    return (
      <div>
        <div className="search">
          <input
            type="text"
            placeholder="Flowers"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={searchBook}
          />
          <Button variant="warning" onClick={fetchBooks}>
            Search
          </Button>
        </div>
        <Row xs={2} sm={3} md={5} lg={6} xl={8} xxl={10} id="tbr-row">
          {homeBookList.map((e) => {
            let thumbnail =
              e.volumeInfo.imageLinks && e.volumeInfo.imageLinks.smallThumbnail;

            let authors = e.volumeInfo.authors;
            let authorsStr = "";
            if (typeof authors === Array) {
              authorsStr = authors.toString();
            }
            let authorsFormat = authorsStr.split("").join("");

            if (thumbnail !== undefined) {
              return (
                <>
                  <Col id="tbr-col">
                    <div
                      id="home-display-book-details-div"
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
                          <Card.Text>
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
      </div>
    );
  } else {
    return (
      <div>
        <div className="search">
          <input
            type="text"
            placeholder="Flowers"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={searchBook}
          />
          <Button variant="warning" onClick={fetchBooks}>
            Search
          </Button>
        </div>

        <div className="container">{<BookDetails bookList={bookList} />}</div>
      </div>
    );
  }
};
export default Home;
