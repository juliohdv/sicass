import React, { Component } from "react";
import Dashboard from "./Dashboard";
import Card from "./Card";
import Entidad from "./Entidad";
import SolicitudServicio from "./SolicitudServicio";
import { Row, Col, Form, Button } from "react-bootstrap";

//Clase principal del componente
class EnvioSolicitud extends Component {
  render() {
    //Retorna todo la interfas respectiva para la solicitud de la propuesta
    return <Dashboard contenedor={<Cuerpo />} />;
  }
}

//Funcion que contiene los apartados del cuerpo de la interfaz
function Cuerpo(props) {
  return (
    /* Se utilizan propiedades: 
    cuerpo referente a los campos de informacion de la entidad
    columnas referente a las columnas necesarias para maquetación de la interfaz
    descripcion hace referencia a los campos de informacion del servicio social a solicitar*/
    <Form className="pl-5 pr-5">
     <div className="pt-4">
      <Card titulo="Datos de entidad" cuerpo={<Entidad />} />
     </div>
     <Row>
         <Col sm={8}>
     <div className="pt-4">
      <Card
        titulo="Solicitud de servicio social"
        cuerpo={
         
         <SolicitudServicio columnas={6} />
         
        }
        />
     </div>

         </Col>
         <Col sm={4}>
     <div className="pt-5">
        <div className="text-center pt-5">
          <Button variant="success" type="submit" onClick="">
            Registrar
          </Button>
        </div>
        <div className="text-center mt-5">
          <Button variant="secondary" type="button" onClick="">
            Cancelar
          </Button>
        </div>
    </div>
         
         </Col>
     </Row>
    </Form>
  );
}

export default EnvioSolicitud;
