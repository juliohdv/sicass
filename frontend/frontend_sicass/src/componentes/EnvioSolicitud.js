import React, { Component } from "react";
import Dashboard from "./Dashboard";
import Card from "./Card";
import SolicitudServicio from "./SolicitudServicio";



//Clase principal del componente
class Solicitud extends Component {
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
    </div>
  );
}
export default Solicitud;
