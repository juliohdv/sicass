import React, { Component } from "react";
import Dashboard from "./Dashboard";
import Card from "./Card";
import Entidad from "./Entidad";
import SolicitudServicio from "./SolicitudServicio";
import Botones from "./BotonesRegistro";
import { Form } from "react-bootstrap";

//Clase principal del componente
class Solicitud extends Component {
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
            titulo="Solicitud de servicio social"
            cuerpo={
              <SolicitudServicio
                columnas={6}
              />
            }
          />
        </div>
        <Botones />
    </div>
  );
}
export default Solicitud;
