import React  from "react";
import { Card } from "react-bootstrap";

//Componente que contiene la base de maquetación de las card
export default function card(props) {
  return (
    <Card border="info">
      <Card.Header className="bg-info">{props.titulo}</Card.Header> 
      <Card.Body>{props.cuerpo}</Card.Body>
    </Card>
  );
}
