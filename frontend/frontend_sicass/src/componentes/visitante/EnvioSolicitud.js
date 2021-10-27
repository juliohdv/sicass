import React, { Component } from "react";
import Dashboard from "../layout/Dashboard";
import Card from "../Card";
import SolicitudServicio from "./SolicitudServicio";

//Clase principal del componente
class Solicitud extends Component {
  render() {
    //Retorna todo la interfas respectiva para la solicitud de la propuesta
    return (
      <Dashboard
        contenedor={
          <div className="pt-4">
            <Card
              titulo="Solicitud de servicio social"
              cuerpo={<SolicitudServicio />}
            />
          </div>
        }
      />
    );
  }
}

export default Solicitud;
