import React, { Component, useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import TablaGestion from "./TablaGestion";
import axios from "axios"
import {Button} from 'react-bootstrap'

const COLUMNAS = [
  {
    title: "Codigo",
    field: "id",
  },
  {
    title: "Nombre",
    field: "name",
  },
  {
    title: "Grupo",
    field: "content_type_id",
  },
  {
    title: "Privilegio",
    field: "codename",
  },
];

//Clase principal del componente
class Roles extends Component {
  constructor(props){
   super(props); 
   this.state = {
     permisos: [],
   }
  };
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/login/permisos/")
      .then((response) => {
        this.setState({ permisos: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    //Retorna todo la interfas respectiva para la gestion de roles y privilegios
    return <Dashboard contenedor={<Cuerpo datos={this.state.permisos} columnas={COLUMNAS}/>} />;
  }
}

//Funccion que contiene los campos para la gestion
function Cuerpo(props) {
  return (
    <div className="pt-4">
      <div>
          <Button variant="success" onClick="">
            Crear
          </Button>
        </div>
      <TablaGestion
        columna={props.columnas}
        dato={props.datos}
        titulo={"Privilegios"}
      />
    </div>
  );
}
export default Roles;
