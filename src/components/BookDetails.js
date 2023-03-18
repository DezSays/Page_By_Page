import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const BookDetails = ({ bookList }) => {
  const [show, setShow] = useState(false);
  const [book, setBook] = useState("");

  return (
    <>
      <Row xs={1} md={2} lg={4} xl={6} className="g-4 ">
        {bookList.map((e) => {
          let thumbnail =
            e.volumeInfo.imageLinks && e.volumeInfo.imageLinks.smallThumbnail;
            // str.split('').join(' ');
            let authors = e.volumeInfo.authors
            let authorsStr = authors.toString()
            let authorsFormat = authorsStr.split('').join('')

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
                      <Card.Img variant="top" id="card-img" src={thumbnail}  />
                      <Card.Body id="card-body">
                        <Card.Title id="card-title">{e.volumeInfo.title}</Card.Title>
                        <Card.Text id="card-description">{e.volumeInfo.description}</Card.Text>
                        <Card.Text >Author(s): {authorsFormat}</Card.Text>
                        <Card.Text >Genre: {e.volumeInfo.categories}</Card.Text>
                      
                        <Button id="selected-book-btn">Book URL: {e.selfLink}</Button>
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
};
export default BookDetails;
