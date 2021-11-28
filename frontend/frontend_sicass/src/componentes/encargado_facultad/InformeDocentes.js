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

export default class InformeDocentes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docentes: [],
      facultad: "",
      fecha: "",
    };
  }
  componentDidMount() {
    let nombre_usuario = leerCookie("usuario");
    axios
      .get("https://juliohdv.pythonanywhere.com/login/encargadosEscuelaPorFacultad/", {
        params: { user: nombre_usuario },
      })
      .then((response) => {
        const arreglo_inicial = response.data;
        const facultad =
          arreglo_inicial[0].docente_detalle.escuela_detalle.carrera_detalle.facultad_detalle.nombre_facultad;
        const docentes = [];
        for (var i = 0; i < arreglo_inicial.length; i++) {
          docentes[i] = {
            posicion: i,
            nombres_docente: arreglo_inicial[i].docente_detalle.nombres_docente,
            apellidos_docente:arreglo_inicial[i].docente_detalle.apellidos_docente,
            correo: arreglo_inicial[i].docente_detalle.correo,
            escuela: arreglo_inicial[i].docente_detalle.escuela_detalle.nombre_escuela
          };
        }
        this.fechaActual();
        this.setState({ docentes:  docentes, facultad: facultad });
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
                    <td>Docentes Encargados en Cada Escuela</td>
                    <td>
                      Informe en donde se puede visualizar los docentes encargados de Servicios
                      sociales en cada escuela.
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
                "Docentes encargados en la " + this.state.facultad
              }
              fecha={"Fecha: " + this.state.fecha}
              columnas={
                <>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Correo</th>
                  <th>Escuela</th>
                  
                </>
              }
              filas={
                <>
                  {this.state.docentes.map((elemento) =>
                    
                      <tr>
                        <td>{elemento.nombres_docente}</td>
                        <td>{elemento.apellidos_docente }</td>
                        <td>{elemento.correo}</td>
                        <td>{elemento.escuela}</td>
                      </tr>
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
