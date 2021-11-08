import React, { Component } from "react";
import { Container, Table } from "react-bootstrap";
import { Label } from "reactstrap";

export default class TablaInforme extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container className="pt-4">
        <div className="text-center">
          <div>
            <Label>{this.props.tituloInforme}</Label>
          </div>
          <div>
            <Label>{this.props.fecha}</Label>
          </div>
        </div>
        <div>
          <Table responsive="sm" className="text-center" hover={false}>
            <thead>
              <tr className="bg-info">{this.props.columnas}</tr>
            </thead>
            <tbody>{this.props.filas}</tbody>
          </Table>
        </div>
      </Container>
    );
  }
}
