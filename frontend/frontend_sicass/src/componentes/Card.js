import React, { Component } from "react";

export default function Card(props) {
  return (
    <div className="card">
      <div className="card-header bg-info">
        <h3 className="card-tittle">{props.titulo}</h3>
      </div>
      <div className="card-body">
          { props.cuerpo }
      </div>
    </div>
  );
}
