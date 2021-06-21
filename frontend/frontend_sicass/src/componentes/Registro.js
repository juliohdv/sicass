import React, { Component } from "react";
import Dashboard from "./Dashboard";
import Card from "./Card";
import Botones from "./BotonesRegistro";
import { Col, Form  } from "react-bootstrap";

//Clase principal del componente
class Registro extends Component {
  render() {
    //Retorna todo la interfas respectiva para la solicitud de la propuesta
    return <Dashboard contenedor={<Cuerpo />}></Dashboard>;
  }
}

//Funcion que contiene todos los datos del estudiante
function Cuerpo() {
  return (
    <div className="pl-5 pr-5">
      <div>
        <Card titulo="Datos de estudiante" cuerpo={<DatosEstudiante />}></Card>
      </div>
      <div>
        <Botones />
      </div>
    </div>
  );
}

//Funcion que contiene los campos del formulario
function DatosEstudiante() {
  return (
    <>
      <Form.Row>
        <Form.Group as={Col} className="pr-5">
          <Form.Label>Carnet</Form.Label>
          <Form.Control type="text" placeholder="Ingrese carnet" />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Dirección</Form.Label>
          <Form.Control type="text" placeholder="Ingrese dirección" />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} className="pr-5">
          <Form.Label>Nombres</Form.Label>
          <Form.Control type="text" placeholder="Ingrese nombres" />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Apellidos</Form.Label>
          <Form.Control type="text" placeholder="Ingrese apellidos" />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} className="pr-5">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Ingrese correo electronico" />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Teléfono</Form.Label>
          <Form.Control type="text" placeholder="Ingrese teléfono" />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} className="pr-5">
          <Form.Label>Sexo</Form.Label>
          <Form.Control as="select">
            <option>Masculino</option>
            <option>Femenino</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
        <Form.Label>Carrera</Form.Label>
          <Form.Control as="select">
            <option>Ingenieria informatica</option>
            <option>Licenciatura en economia</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
    </>
  );
}

export default Registro;
