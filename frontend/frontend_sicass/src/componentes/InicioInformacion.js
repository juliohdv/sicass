import React, { Component } from "react";
//Aqui importamos nuestra imagen
import LogoUes from "./LogoUes";
import LogoProyeccion from "./LogoProyeccion";
import { Row, Col, Card } from "react-bootstrap";

class InicioInformacion extends Component {
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
                  <h4>"Hacia la libertad por la cultura"</h4>
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
                  <h1>Secretar&iacute;a de Proyección Social</h1>
                  <h4>"De la mano con la comunidad"</h4>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="pt-5">
          <Card>
            <Card.Header align="center">
              Sistema inform&aacute;tico para el control y aplicación del Servicio 
              Social de los estudiantes de la Universidad de El Salvador (SICASS).
            </Card.Header>
            <Card.Body>
              <Card.Title>Descripción</Card.Title>
              <Card.Text className="align-justify">
                Sistema inform&aacute;tico en la plataforma web, para la digitalización, automatización
                y eficiencia en la realizacion del proceso de registro,
                solicitud y control del servicio social que es realizado por los estudiantes 
                de la Universidad de El Salvador, como pre-requisito para su titulación.
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </>
    );
  }
}

export default InicioInformacion;
