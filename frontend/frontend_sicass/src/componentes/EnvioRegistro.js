import React, { Component } from "react";
import Dashboard from "./Dashboard";
import Card from "./Card";
import Registro from "./Registro";
import Botones from "./BotonesRegistro";
import { Form } from "react-bootstrap";

//Clase principal del componente
class EnvioRegistro extends Component {
  render() {
    return <Form><Dashboard contenedor={<Cuerpo />} /></Form>;
  }
}

//Funcion que contiene los apartados del cuerpo de la interfaz
function Cuerpo() {
  return (
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

export default EnvioRegistro;
