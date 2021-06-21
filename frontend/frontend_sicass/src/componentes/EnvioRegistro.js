import React, { Component } from "react";
import Dashboard from "./Dashboard";
import Card from "./Card";
import Entidad from "./Entidad";
import Registro from "./Registro";
import Botones from "./BotonesRegistro";
import { Row, Col, Form } from "react-bootstrap";

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
        </div>
        <div className="pt-4">
          <Card
            titulo="Registro de Estudiante"
            cuerpo={
              <Registro/>
            }
          />
        </div>
        <Botones />
    </div>
  );
}

//Funcion que contiene el campo faltante para la propuesta "descripcion"

export default Propuesta;
