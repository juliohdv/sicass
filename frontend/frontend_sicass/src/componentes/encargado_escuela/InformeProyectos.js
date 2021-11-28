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

export default class InformeProyectos extends Component {
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
      .get("https://juliohdv.pythonanywhere.com/login/proyectoActivos/", {
        params: { user: nombre_usuario },
      })
      .then((response) => {
        const arreglo_inicial = response.data;
        const carrera =
          arreglo_inicial[0].solicitud_servicio_detalle.servicio_social_detalle
            .tipo_servicio_social_detalle.carrera_detalle.nombre_carrera;
        const proyecto = [];
        var posiciones = 1;
        for (var i = 0; i < arreglo_inicial.length; i++) {
          if(arreglo_inicial[i].estado_proyecto === "En Proceso"){
            proyecto[i] = {
              posicion: posiciones++,
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
            };
          }
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
                    <th>Descripción</th>
                    <th>Imprimir</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Proyectos</td>
                    <td>
                      Informe en donde se puede visualizar la información de los
                      estudiantes que estan realizando su servicio social.
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
                "Proyectos activos en la carrera de " + this.state.carrera
              }
              fecha={"Fecha: " + this.state.fecha}
              columnas={
                <>
                  <th>#</th>
                  <th>Carnet</th>
                  <th>Carrera</th>
                  <th>Entidad</th>
                  <th>Proyecto</th>
                  <th>Total horas</th>
                  <th>Estado</th>
                </>
              }
              filas={
                <>
                  {this.state.proyectos.map((elemento) =>(
                      <tr>
                        <td>{elemento.posicion}</td>
                        <td>{elemento.carnet}</td>
                        <td>{elemento.carrera}</td>
                        <td>{elemento.entidad}</td>
                        <td>{elemento.descripcion}</td>
                        <td>{elemento.horas}</td>
                        <td>{elemento.estado}</td>
                      </tr>
                  ))}
                </>
              }
            />
          </div>
        }
      />
    );
  }
}
