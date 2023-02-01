import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./cards.css";

const Cards = ({ cardsList }) => {

  const navigate = useNavigate();

  const handleRedirect = (service) => {
    navigate(`/calendar/${service}`)
  }
  return (
    <div className="card-container">
      {cardsList.map((data, index) => (
        <Card key={data.name + index} className="custom-card">
          <Card.Img variant="top" src={data?.image} />
          <Card.Body className="text-center">
            <Card.Title>{data?.name}</Card.Title>
            <Card.Text></Card.Text>
            <Button className="btn-card custom-card-button" variant="danger" onClick={() => handleRedirect(data.name)}>
              Calendar
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Cards;
