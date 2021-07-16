import React, { Component } from "react";
import { Form, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import Botones from "./BotonesRegistro";

//Clase principal del componente, para el registro de los estudiantes
class RegistroUps extends Component {
  render() {
    return (
      <Form>
        <Form.Row>
          <Form.Group as={Col} className="pl-5 pr-5">
            <Form.Label>Enlace de la carpeta creada en Drive</Form.Label>
            <OverlayTrigger
              overlay={
                <Tooltip>
                  Pegue el enlace obtenido en los pasos anteriores
                </Tooltip>
              }
            >
              <Form.Control
                type="text"
                id="enlace"
                autoComplete="off"
                pattern="(https:[/][/]drive[.]google[.]com[/]drive[/]folders[/])(.+)"
                placeholder="https://drive.google.com/drive/folders/..."
                required={true}
              ></Form.Control>
            </OverlayTrigger>
          </Form.Group>
        </Form.Row>
        <Botones />
      </Form>
    );
  }
}

export default RegistroUps;
