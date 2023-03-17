import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const BookDetails = ({ bookList }) => {
  const [show, setShow] = useState(false);
  const [book, setBook] = useState("");

  return (
    <>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {bookList.map((e) => {
          let thumbnail =
            e.volumeInfo.imageLinks && e.volumeInfo.imageLinks.smallThumbnail;

          if (thumbnail !== undefined) {
            return (
              <>
                <div
                  onClick={() => {
                    setShow(true);
                    setBook(e);
                  }}
                >
                  <Col>
                    <Card className="text-center">
                      <Card.Img variant="top" src={thumbnail} />
                      <Card.Body>
                        <Card.Title>{e.volumeInfo.title}</Card.Title>
                        <Card.Text>{e.volumeInfo.description}</Card.Text>
                        <Card.Text>
                          Publisher: {e.volumeInfo.publisher},{" "}
                          {e.volumeInfo.publishedDate}
                        </Card.Text>
                        <Card.Text>Pages: {e.volumeInfo.pageCount}</Card.Text>
                        <Card.Text>Author(s): {e.volumeInfo.authors}</Card.Text>
                        <Card.Text>Genre: {e.volumeInfo.categories}</Card.Text>
                        <Card.Text>
                          Rating: {e.volumeInfo.averageRating}
                        </Card.Text>
                        <Card.Text>Book URL: {e.selfLink}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </div>
              </>
            );
          }
        })}
      </Row>
    </>
  );
};
export default BookDetails;
