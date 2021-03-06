import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import Dashboard from "../layout/Dashboard";
import ReactToPrint from "react-to-print";
import TablaInforme from "../TablaInforme";
import axios from "axios";

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

export default class InformeAlumnosObservaciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proyectos: [],
      carrera: "",
      fecha: "",
    };
  }
  componentDidMount() {
    let nombre_usuario = leerCookie("usuario");
    axios
      .get("http://127.0.0.1:8000/login/proyectosPorEscuelaRechazados/", {
        params: { user: nombre_usuario },
      })
      .then((response) => {
        const arreglo_inicial = response.data;
        const carrera =
          arreglo_inicial[0].solicitud_servicio_detalle.servicio_social_detalle
            .tipo_servicio_social_detalle.carrera_detalle.nombre_carrera;
        const proyecto = [];
        for (var i = 0; i < arreglo_inicial.length; i++) {
          proyecto[i] = {
            posicion: i,
            carnet: arreglo_inicial[i].solicitud_servicio_detalle.estudiante,
            carrera:
              arreglo_inicial[i].solicitud_servicio_detalle
                .servicio_social_detalle.tipo_servicio_social_detalle
                .carrera_detalle.nombre_carrera,
            entidad:
              arreglo_inicial[i].solicitud_servicio_detalle
                .servicio_social_detalle.entidad,
            descripcion:
              arreglo_inicial[i].solicitud_servicio_detalle
                .servicio_social_detalle.descripcion,
            horas:
              arreglo_inicial[i].solicitud_servicio_detalle
                .servicio_social_detalle.cantidad_horas,
            estado: arreglo_inicial[i].estado_proyecto,
            nombres: arreglo_inicial[i].solicitud_servicio_detalle.estudiante_detalle.nombres_estudiante,
            apellidos: arreglo_inicial[i].solicitud_servicio_detalle.estudiante_detalle.apellidos_estudiante,
            observaciones_proyecto: arreglo_inicial[i].observaciones
          };
        }
        this.fechaActual();
        this.setState({ proyectos: proyecto, carrera: carrera });
      })
      .catch((error) => {});
  }

  fechaActual() {
    var fecha = new Date();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();
    var anio = fecha.getFullYear();
    if (dia < 10) dia = "0" + dia;
    if (mes < 10) mes = "0" + mes;
    var fechaActual = dia + "-" + mes + "-" + anio;
    this.setState({ fecha: fechaActual });
  }
  render() {
    return (
      <Dashboard
        contenedor={
          <div className="pt-5">
            <div>
              <Table
                responsive="sm"
                className="text-center"
                hover={false}
                striped
                bordered
                responsive
              >
                <thead>
                  <tr className="bg-secondary text-white">
                    <th>Nombre</th>
                    <th>Descripci??n</th>
                    <th>Imprimir</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Alumnos con observaciones</td>
                    <td>
                      Informe en donde se puede visualizar los alumnos que poseen 
                      observaciones en las actividades de su servicio social.
                    </td>
                    <td>
                      <ReactToPrint
                        trigger={() => <Button variant="info">Imprimir</Button>}
                        content={() => this.componentRef}
                        documentTitle={"Proyectos activos " + this.state.fecha}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <TablaInforme
              ref={(el) => (this.componentRef = el)}
              tituloInforme={
                "Alumnos con proyectos en revisi??n de la carrera de " + this.state.carrera
              }
              fecha={"Fecha: " + this.state.fecha}
              columnas={
                <>
                  <th>Carnet</th>
                  <th>Nombre</th>
                  <th>Carrera</th>
                  <th>Entidad</th>
                  <th>Proyecto</th>
                  <th>Estado</th>
                  <th>Observaciones:</th>
                </>
              }
              filas={
                <>
                  {this.state.proyectos.map((elemento) =>
                    elemento.estado === "Rechazado" ? (
                      <tr>
                        <td>{elemento.carnet}</td>
                        <td>{elemento.nombres + " " + elemento.apellidos }</td>
                        <td>{elemento.carrera}</td>
                        <td>{elemento.entidad}</td>
                        <td>{elemento.descripcion}</td>
                        <td>{elemento.estado}</td>
                        <td>{elemento.observaciones_proyecto}</td>
                      </tr>
                    ) : (
                      <tr></tr>
                    )
                  )}
                </>
              }
            />
          </div>
        }
      />
    );
  }
}
