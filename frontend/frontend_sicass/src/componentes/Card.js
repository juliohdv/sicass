import React, { Component } from "react";
import { Card } from "react-bootstrap";

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

    <Card border="info">
      <Card.Header className="bg-info">{props.titulo}</Card.Header>
      <Card.Body>
        {props.cuerpo}
      </Card.Body>
    </Card>
  );
}
