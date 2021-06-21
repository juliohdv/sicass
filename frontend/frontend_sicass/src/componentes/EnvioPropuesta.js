import React, { Component } from "react";
import Dashboard from "./Dashboard";
import Card from "./Card";
import Entidad from "./Entidad";
import SolicitudServicio from "./SolicitudServicio";
import { Row, Col, Form, Button } from "react-bootstrap";

//Clase principal del componente
class Propuesta extends Component {
  render() {
    //Retorna todo la interfas respectiva para la solicitud de la propuesta
    return <Form><Dashboard contenedor={<Cuerpo />} /></Form>;
  }
}

//Funcion que contiene los apartados del cuerpo de la interfaz
function Cuerpo() {
  return (
    /* Se utilizan propiedades: 
    cuerpo referente a los campos de informacion de la entidad
    columnas referente a las columnas necesarias para maquetación de la interfaz
    descripcion hace referencia a los campos de informacion del servicio social a solicitar*/
    <div className="pl-5 pr-5">
        <div>
          <Card titulo="Datos de entidad" cuerpo={<Entidad />} />
        </div>
        <div className="pt-4">
          <Card
            titulo="Propuesta de servicio social"
            cuerpo={
              <SolicitudServicio
                columnas={6}
                descripcion={<DatosPropuesta />}
              />
            }
          />
        </div>
        <div className="pt-4">
          <div className="row">
            <div className="col text-right pr-5">
              <Button variant="success" type="submit" onClick="">
                Registrar
              </Button>
            </div>
            <div className="col pl-5">
              <Button variant="secondary" type="button" onClick="">
                Cancelar
              </Button>
            </div>
          </div>
        </div>
    </div>
  );
}

//Funcion que contiene el campo faltante para la propuesta "descripcion"
function DatosPropuesta() {
  return (
    <>
      <Col sm={1}></Col>
      <Col sm={5} className="pr-5">
        <Form.Group as={Row}>
          <Form.Label>Descripción de la propuesta</Form.Label>
          <Form.Control as="textarea" rows={11} />
        </Form.Group>
      </Col>
    </>
  );
}

export default Propuesta;
