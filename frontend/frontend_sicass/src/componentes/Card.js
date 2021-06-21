import React, { Component } from "react";
import { Card } from "react-bootstrap";

//Componente que contiene la base de maquetación de las card
export default function card(props) {
  return (
    /*<div className="card">
      <div className="card-header bg-info">
        <h3 className="card-tittle">{props.titulo}</h3>
      </div>
      <div className="card-body">
          { props.cuerpo }
      </div>
    </div>*/

    /*Base general de las card a utilizar
      Recibe dos propiedades, el titulo del encabezado de la card y el contenido del cuerpo
      de la card*/
    <Card border="info">
      <Card.Header className="bg-info">{props.titulo}</Card.Header> 
      <Card.Body>{props.cuerpo}</Card.Body>
    </Card>
  );
}
