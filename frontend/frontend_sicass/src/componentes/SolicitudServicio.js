import React, { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";

/* Componente que contiene el formulario base de los datos del servicio
social a solicitar */
export default function SolicitudServicio(props) {
  return (
    /* Recibe dos propiedades las cuales solo se utilizaran en la interfas
    de la propuesta, columnas que se refiere a la cantidad columnas de el
    contenedor y descripción que es el campo agregado en la propuesta*/
    //<Form>
      <Row className="pl-5 pr-5">
        <Col sm={props.columnas} className="pl-5">
          <Form.Group as={Row}>
            <Form.Label>Facultad</Form.Label>
            <Form.Control as="select">
              <option>Ingenieria y arquitectura</option>
              <option>Biologia</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label>Carrera</Form.Label>
            <Form.Control as="select">
              <option>Ingenieria informatica</option>
              <option>Licenciatura en biologia</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label>Tipo de servicio social</Form.Label>
            <Form.Control as="select">
              <option>Soporte técnico</option>
              <option>Pasantias</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label>Fecha limite para respuesta</Form.Label>
            <Form.Control type="Date"></Form.Control>
          </Form.Group>
        </Col>
        {props.descripcion}
      </Row>
    //</Form>
  );
}
