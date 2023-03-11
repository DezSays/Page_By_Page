import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const BookDetails = () => {
  return (
    <div style={{textAlign: 'center', margin: '5%'}}>

    <Card style={{ width: '30%', textAlign: 'center', display: 'inline-block' }}>
      <Card.Img variant="top" src="../../placeholder.jpg" />
      <Card.Body>
        <Card.Title>Book Title</Card.Title>
        <Card.Text>
          Book description
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Author: </ListGroup.Item>
        <ListGroup.Item>Edition: </ListGroup.Item>
        <ListGroup.Item>ISBN: </ListGroup.Item>
        <ListGroup.Item>Number of Pages: </ListGroup.Item>
        <ListGroup.Item>Rating: </ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Add to Favorites</Card.Link>
        <Card.Link href="#">Already Read</Card.Link>
        <Card.Link href="#">To Be Read</Card.Link>
      </Card.Body>
    </Card>
    </div>
  );
}

export default BookDetails