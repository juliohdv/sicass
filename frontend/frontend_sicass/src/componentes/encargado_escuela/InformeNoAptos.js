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

export default class InformeNoAptos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estudiantes: [],
      carrera: "",
      fecha: "",
    };
  }
  componentDidMount() {
    let nombre_usuario = leerCookie("usuario");
    axios
      .get("https://juliohdv.pythonanywhere.com/login/SolicitudUpsRechazadas/", {
        params: { user: nombre_usuario },
      })
      .then((response) => {
        const arreglo_inicial = response.data;
        const carrera =
          arreglo_inicial[0].estudiante_detalle.carrera_detalle.nombre_carrera;
        const estudiantes = [];
        for (var i = 0; i < arreglo_inicial.length; i++) {
          estudiantes[i] = {
            posicion: i,
            carnet: arreglo_inicial[i].estudiante,
            carrera:
              arreglo_inicial[i].estudiante_detalle.carrera_detalle.nombre_carrera,
            estado: arreglo_inicial[i].estado_solicitud,
            nombres: arreglo_inicial[i].estudiante_detalle.nombres_estudiante,
            apellidos: arreglo_inicial[i].estudiante_detalle.apellidos_estudiante,
            observaciones_solicitud: arreglo_inicial[i].observaciones
          };
        }
        this.fechaActual();
        this.setState({ estudiantes: estudiantes, carrera: carrera });
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
                    <th>Descripción</th>
                    <th>Imprimir</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Alumnos no aptos para realizar su servicio social</td>
                    <td>
                      Informe en donde se puede visualizar los alumnos que no cumplen
                      los requisitos para realizar su servicio social.
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
                "Alumnos con solicitudes rechazadas de la carrera de " + this.state.carrera
              }
              fecha={"Fecha: " + this.state.fecha}
              columnas={
                <>
                  <th>Carnet</th>
                  <th>Nombre</th>
                  <th>Carrera</th>
                  <th>Estado</th>
                  <th>Observaciones:</th>
                </>
              }
              filas={
                <>
                  {this.state.estudiantes.map((elemento) =>
                    elemento.estado === "Rechazado" ? (
                      <tr>
                        <td>{elemento.carnet}</td>
                        <td>{elemento.nombres + " " + elemento.apellidos }</td>
                        <td>{elemento.carrera}</td>
                        <td>{elemento.estado}</td>
                        <td>{elemento.observaciones_solicitud}</td>
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
