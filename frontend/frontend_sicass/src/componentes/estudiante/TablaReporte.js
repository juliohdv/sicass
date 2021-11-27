import React, { Component } from "react";
import { Container, Table } from "react-bootstrap";

export default class TablaReporte extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container className="pt-4">
        <div className="text-center pb-4">
          <h4>Universidad de El Salvador</h4>
          <h4>{this.props.facultad}</h4>
          <h4>{this.props.escuela}</h4>
          <h5>{this.props.correo}</h5>
        </div>
        <div>
            <p><strong>Carnet: </strong> {this.props.carnet}</p>
            <p><strong>Nombre Completo: </strong> {this.props.nombre}</p>
        </div>
        <div>
          <Table
            responsive="sm"
            className="text-center"
            hover={false}
            id="actividades"
          >
            <thead>
              <tr>{this.props.columnas}</tr>
            </thead>
            <tbody>{this.props.filas}</tbody>
          </Table>
          <Table
            responsive="sm"
            className="text-center"
            hover={false}
            id="actividades"
          >
            {/* <thead>
              <tr>{this.props.columnas}</tr>
            </thead> */}
            <tbody>{this.props.total_horas}</tbody>
          </Table>
        </div>
      </Container>
    );
  }
}
