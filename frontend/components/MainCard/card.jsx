import React from 'react';
import Card from 'react-bootstrap/Card';
// Css
import '../../public/css/card.css';

function MainCard({ place }) {
  return (
    <div className="cardBox">
      <Card className="h-100">
        <Card.Img variant="top" src={place.image} />
        <Card.Body>
          <Card.Title>
            <span className="font"><b>{place.title}</b></span>
          </Card.Title>
          <Card.Text>
            <span className="cardPrice font">
              &#8377; {place && place.price ? place.price.toLocaleString() : "Loading"}
              &nbsp;/ night 
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MainCard;
