import React, { Component } from "react";
import Dashboard from "./Dashboard";
import Card from "./Card";
import Registro from "./Registro";

//Clase principal del componente
class EnvioRegistro extends Component {
  render() {
    return(<Dashboard contenedor={<Cuerpo />} />); 
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
          <Card titulo="Registro de Estudiante" cuerpo={<Registro />} />
      </div>
    </Form>
  );
}

export default EnvioRegistro;
