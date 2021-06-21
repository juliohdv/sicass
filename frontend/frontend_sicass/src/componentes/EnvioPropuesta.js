import React, { Component } from "react";
import Dashboard from "./Dashboard";
import Card from "./Card";
import { Row, Col, Form, Button } from "react-bootstrap";

class Propuesta extends Component {
  render() {
    return <Dashboard contenedor={<Cuerpo />} />;
  }
}

function Cuerpo() {
  return (
    <div className="align-center">
      <div>
        <Card titulo="Datos de entidad" cuerpo={<DatosEntidad />} />
      </div>
      <div className="pt-4">
        <Card
          titulo="Propuesta de servicio social"
          cuerpo={<DatosPropuesta />}
        />
      </div>
      <div className="container pt-4">
        <div className="row">
          <div className="col text-right pr-5">
            <Button variant="success" type="button" onClick="">
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

function DatosEntidad() {
  return (
    /*<div className="container">
      <div className="row">
        <div className="col">
          <label>Nombre de la entidad</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col">
          <label>Dirección</label>
          <input type="text" className="form-control" />
        </div>
      </div>
      <div className="row pt-3">
        <div className="col">
          <label>Correo</label>
          <input type="email" className="form-control" />
        </div>
        <div className="col">
          <label>Teléfono</label>
          <input type="text" className="form-control"/>
        </div>
      </div>
      <div className="row pt-3">
        <div className="col text-right pt-2">
          <label>Clasificación de la entidad</label>
        </div>
        <div className="col">
          <select className="form-control">
            <option>Pública</option>
            <option>Privada</option>
          </select>
        </div>
      </div>
    </div>*/

    <Form className="pl-3 pr-3">
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
      <Form.Row className="text-right">
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
    </Form>
  );
}

function DatosPropuesta() {
  return (
    /*<div className="container">
      <div className="row">
        <div className="col mr-4">
          <div className="row">
            <label>Facultad</label>
            <select className="form-control">
              <option>Ingenieria</option>
              <option>Biologia</option>
            </select>
          </div>
          <div className="row pt-3">
            <label>Carrera</label>
            <select className="form-control">
              <option>Ingenieria informatica</option>
              <option>Biologia</option>
            </select>
          </div>
          <div className="row pt-3">
            <label>Tipo de servicio social</label>
            <select className="form-control">
              <option>Soporte técnico</option>
              <option>Pasantia</option>
            </select>
          </div>
          <div className="row pt-3">
            <label>Fecha limite para repuesta</label>
            <input type="date" className="form-control" />
          </div>
        </div>
        <div className="col ml-4">
          <div className="row">
            <label className="text-right">Descripción</label>
          </div>
          <div className="row pt-3">
            <textarea maxLength="500" className="form-control" />
          </div>
        </div>
      </div>
    </div>*/
    
    <Form>
      <Row>
        <Col sm={6} className="pl-5">
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
        <Col sm={1}></Col>
        <Col sm={5} className="pr-5">
          <Form.Group as={Row}>
            <Form.Label>Descripción de la propuesta</Form.Label>
            <Form.Control as="textarea" rows={11}/>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}

export default Propuesta;
