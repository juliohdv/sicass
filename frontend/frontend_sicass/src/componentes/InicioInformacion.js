import React, { Component } from "react";
//Aqui importamos nuestra imagen
import LogoUes from "./LogoUes";
import LogoProyeccion from "./LogoProyeccion";
import { Row, Col, Card } from "react-bootstrap";

class inicioInformacion extends Component {
  render() {
    return (
      <>
        <Row className="pt-5">
          <Col align="center">
            <div className="container">
              <div className="wrap-center">
                <div className="navbar-brand">
                  <a href="https://www.ues.edu.sv/">
                    <LogoUes></LogoUes>
                  </a>
                </div>
                <div id="header_front">
                  <h1>Universidad de El Salvador</h1>
                  <h4>"HACIA LA LIBERTAD POR LA CULTURA"</h4>
                </div>
              </div>
            </div>
          </Col>
          <Col align="center">
            <div className="container">
              <div className="wrap-center">
                <div className="navbar-brand">
                  <a href="http://proyeccionsocial.ues.edu.sv/">
                    <LogoProyeccion></LogoProyeccion>
                  </a>
                </div>
                <div id="header_front">
                  <h1>Secretaria de proyección social</h1>
                  <h4>"De la mano con la comunidad"</h4>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="pt-5">
          <Card>
            <Card.Header>Sistema informatico...</Card.Header>
            <Card.Body>
              <Card.Title>Descripción</Card.Title>
              <Card.Text>
                Sistema informatico web, para la digitalizacion, automatizacion
                y eficiencia en la realizacion del proceso de registrarse,
                solicitar el servicio social que es requisito en la universidad
                para obtener el titulo al que aspira el estudiante.
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </>
    );
  }
}

export default inicioInformacion;
