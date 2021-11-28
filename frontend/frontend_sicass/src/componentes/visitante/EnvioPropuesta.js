import React, { Component } from "react";
import Dashboard from "../layout/Dashboard";
import Card from "../Card";
import PropuestaServicio from "./PropuestaServicio";

//Clase principal del componente
class EnvioPropuesta extends Component {
  render() {
    //Retorna todo la interfas respectiva para la solicitud de la propuesta
    return (
      <Dashboard
        contenedor={
          <div className="pt-4">
            <Card
              titulo="Propuesta de servicio social"
              cuerpo={<PropuestaServicio />}
            />
          </div>
        }
      />
    );
  }
}

export default EnvioPropuesta;
