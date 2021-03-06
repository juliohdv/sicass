import React from "react";
import { Form, Col } from "react-bootstrap";

/* Componente donde se tiene la base del formulario de la
solicitud de servicio social por parte de la entidad externa */
export default function Entidad(props) {
  return (
    <>
      <Form.Row>
        <Form.Group as={Col} className="pr-5">
          <Form.Label>Nombre entidad</Form.Label>
          <Form.Control type="text" placeholder="Ingrese nombre" />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Dirección</Form.Label>
          <Form.Control type="text" placeholder="Ingrese dirección" />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} className="pr-5">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" placeholder="Ingrese correo electronico" />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Teléfono</Form.Label>
          <Form.Control type="text" placeholder="Ingrese teléfono" />
        </Form.Group>
      </Form.Row>
      <Form.Row className="text-right pt-2">
        <Form.Group as={Col} className="pr-5">
          <Form.Label className="pt-2">Clasificación de la entidad</Form.Label>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control as="select">
            <option>Privada</option>
            <option>Pública</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
    </>
  );
}
