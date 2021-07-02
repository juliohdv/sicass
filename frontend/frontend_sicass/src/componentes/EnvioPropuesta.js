import React, { Component } from "react";
import Dashboard from "./Dashboard";
import Card from "./Card";
import Entidad from "./Entidad";
import PropuestaServicio from "./PropuestaServicio";

//Clase principal del componente
class EnvioPropuesta extends Component {
  render() {
    //Retorna todo la interfas respectiva para la solicitud de la propuesta
    return <Dashboard contenedor={<Cuerpo />} />;
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
        <div className="pt-4 ">
          <Card titulo="Datos de entidad" cuerpo={<Entidad />} />
        </div>
        <div className="pt-4">
          <Card
            titulo="Propuesta de servicio social"
            cuerpo={
                <PropuestaServicio />
              
            }
          />
        </div>
      </div>
  );
}



export default EnvioPropuesta;
