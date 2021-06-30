import React, { Component } from "react";
import Dashboard from "./Dashboard";
import Card from "./Card";
import Registro from "./Registro";

//Clase principal del componente
class EnvioRegistro extends Component {
  render() {
    return (
      <Dashboard
        contenedor={
          <div className="pt-4">
            <Card titulo="Registro de Estudiante" cuerpo={<Registro />} />
          </div>
        }
      />
    );
  }
}

export default EnvioRegistro;
