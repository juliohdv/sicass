import React, { Component } from "react";
import Dashboard from "./Dashboard";
import TablaGestion from "./TablaGestion";

//Clase principal del componente
class SolicitudConsulta extends Component {
  render() {
    //Retorna todo la interfas respectiva para la gestion de roles y privilegios
    return <Dashboard contenedor={<Cuerpo />} />;
  }
}

//Funccion que contiene los campos para la gestion
function Cuerpo() {
  //Constante que contiene los datos de la columna de la tabla
  const COLUMNAS = [
    {
      title: "Nombre de Entidad",
      field: "nombre",
    },
    {
      title: "Privilegio",
      field: "privilegio",
    },
  ];

  //Constante que contiene los datos de la fila de la tabla
  const DATA = [
    { nombre: "Nombre", privilegio: "Student" },
    { nombre: "Administrador", privilegio: "Admin" },
  ];

  return (
    <TablaGestion
      columnas={COLUMNAS}
      datos={DATA}
      titulo={"Solicitudes de Servicio Social"}
    />
  );
}
export default SolicitudConsulta;
