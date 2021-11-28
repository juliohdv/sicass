import React, { Component } from "react";
import Dashboard from "../layout/Dashboard";
import axios from "axios";
import { Button, Form, Table, Row, Col, Alert } from "react-bootstrap";
import TablaReporte from "./TablaReporte";
import ReactToPrint from "react-to-print";

//Funcion para obtener el nombre del usuario
function leerCookie(nombre) {
  let key = nombre + "=";
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(key) === 0) {
      return cookie.substring(key.length, cookie.length);
    }
  }
  return null;
}

//Clase principal del componente
class InformeActividades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actividades: [],
      facultad: "",
      escuela: "",
      correo: "",
      carnet: "",
      nombre: "",
      estado_proyecto: "",
      total_horas: "",
      proyecto: "",
    };
  }

  //Metodo para calcular el total de horas del servicio
  calculoHoras = () => {
    var totalHoras = 0;
    for (var i = 0; i < this.state.actividades.length; i++) {
      totalHoras += this.state.actividades[i].total_horas;
    }
    return totalHoras;
  };

  //Metodo que hace la peticion de consulta a la BD mediante api
  componentDidMount() {
    let nombre_usuario = leerCookie("usuario"); //Se obtiene el usuario logeado
    axios
      .get("https://juliohdv.pythonanywhere.com/login/proyectoPorEstudiante/", {
        params: {
          estudiante: nombre_usuario,
        },
      })
      .then((response) => {
        console.log(response.data);
        const arreglo_inicial = response.data;
        var posicion = response.data.length - 1;
        this.setState({
          proyecto: arreglo_inicial[posicion].codigo_proyecto,
          carnet:
            arreglo_inicial[posicion].solicitud_servicio_detalle.estudiante,
          nombre:
            arreglo_inicial[posicion].solicitud_servicio_detalle
              .estudiante_detalle.nombres_estudiante +
            " " +
            arreglo_inicial[posicion].solicitud_servicio_detalle
              .estudiante_detalle.apellidos_estudiante,
          escuela:
            arreglo_inicial[posicion].solicitud_servicio_detalle
              .estudiante_detalle.carrera_detalle.nombre_carrera,
          facultad:
            arreglo_inicial[posicion].solicitud_servicio_detalle
              .estudiante_detalle.carrera_detalle.facultad_detalle
              .nombre_facultad,
          correo:
            arreglo_inicial[posicion].solicitud_servicio_detalle
              .estudiante_detalle.correo_estudiante,
          estado_proyecto: response.data[posicion].estado_proyecto,
        });
        axios
          .get("https://juliohdv.pythonanywhere.com/login/actividadesEstudiante/", {
            params: {
              proyecto: this.state.proyecto,
            },
          })
          .then((response) => {
            this.setState({ actividades: response.data });
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  }
  render() {
    return (
      <Dashboard
        contenedor={
          <>
            <div className="pt-4 text-right">
              <ReactToPrint
                trigger={() => <Button variant="danger">Imprimir</Button>}
                content={() => this.componentRef}
                documentTitle={"Actividades" + this.state.carnet}
              />
            </div>
            <TablaReporte
              ref={(el) => (this.componentRef = el)}
              facultad={this.state.facultad}
              escuela={this.state.escuela}
              correo={this.state.correo}
              carnet={this.state.carnet}
              nombre={this.state.nombre}
              columnas={
                <>
                  <th>Fecha</th>
                  <th>Actividad Realizada</th>
                  <th>Persona que certifica</th>
                  <th>Firma de persona que certifica</th>
                  <th>Total de horas invertidas</th>
                </>
              }
              filas={
                <>
                  {this.state.estado_proyecto === "En Proceso" ||
                  this.state.estado_proyecto === "Rechazado" ? (
                    this.state.actividades.map((elemento) => (
                      <tr>
                        <td>{elemento.fecha}</td>
                        <td>{elemento.descripcion}</td>
                        <td>{elemento.encargado}</td>
                        <td></td>
                        <td>{elemento.total_horas}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No posee proyectos activos</td>
                    </tr>
                  )}
                </>
              }
              total_horas={
                <tr>
                  <td colSpan="4"  className="text-right">TOTAL DE HORAS</td>
                  <td className="text-center pr-3">{this.calculoHoras()}</td>
                </tr>
              }
            />
          </>
        }
      />
    );
  }
}

export default InformeActividades;
