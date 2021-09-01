import React, { Component } from "react";
import LogoUes from "./LogoUes";
import LogoProyeccion from "./LogoProyeccion";
import { Row, Col, Card, Tooltip, OverlayTrigger } from "react-bootstrap";

class InicioInformacion extends Component {
  render() {
    return (
      <>
        <Row className="pt-4">
          <Col align="center">
            <div className="container">
              <div className="wrap-center">
                <div className="navbar-brand">
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip>
                        Clic para ir a la página oficial de la Universidad
                      </Tooltip>
                    }
                  >
                    <a href="https://www.ues.edu.sv/" target="_blank" rel="noreferrer">
                      <LogoUes></LogoUes>
                    </a>
                  </OverlayTrigger>
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
                  <a href="https://proyeccionsocial.ues.edu.sv/">
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
              Sistema informático para el control y aplicación del servicio
              social de los estudiantes de la Universidad de El Salvador
              (SICASS).
            </Card.Header>
            <Card.Body>
              <Card.Title>Descripción</Card.Title>
              <Card.Text className="align-justify">
                Sistema informático en la plataforma web, para la
                digitalización, automatización y eficiencia en la realización
                del proceso de registro, solicitud y control del servicio social
                que es realizado por los estudiantes de la Universidad de El
                Salvador, como prerrequisito para su titulación.
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </>
    );
  }
}

export default InicioInformacion;
