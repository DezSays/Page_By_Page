import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const BookDetails = ({ bookList }) => {
  const [show, setShow] = useState(false);
  const [book, setBook] = useState("");
  const [bookURL, setBookURL] = useState("");
  const [display, setDisplay] = useState("");
  const [title, setTitle] = useState('')
  const [authors, setAuthors] = useState([])
  const [thumbnail, setThumbnail] = useState('')
  const [description, setDescription] = useState("")


  const handleClick = (e) => {
    setBookURL(e.target.value);
    fetchBook()


    console.log(bookURL);
  };
  const fetchBook = async () => {
    const bookFetch = await fetch(`${bookURL}`)
    const book = await bookFetch.json()
    setTitle(book.volumeInfo.title)
    setAuthors(book.volumeInfo.authors)
    setDisplay("Selected Card");
    let img =
    book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail;
    setThumbnail(img)
    let desc = book.volumeInfo.description
    let descFormat = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
    let descript = desc.replace(descFormat,'')
    setDescription(descript)
    
  }
  if (display === "Selected Card") {
    return (
      <>
        <Card className="text-center">
          <Card.Img variant="top" style={{maxHeight: '50vh', width: '100%', objectFit: 'contain'}} src={thumbnail} />
          <Card.Body id="card-body">
            <Card.Title id="card-title">{title}</Card.Title>
            <Card.Text style={{overflowY: 'scroll', maxHeight:'50%', lineHeight: '20pt'}}> 
            {description}
            </Card.Text>
            <Card.Text>Author(s): {authors}</Card.Text>
           
            <Button
              
            >
              test
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
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
                          <Card.Text>
                            Genre: {e.volumeInfo.categories}
                          </Card.Text>

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
      </>
    );
  }
};
export default BookDetails;
