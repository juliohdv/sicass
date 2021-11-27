import React, { Component } from "react";
import Dashboard from "../layout/Dashboard";
import axios from "axios";
import { Button, Table, Container } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ReactToPrint from "react-to-print";
import { Label } from "reactstrap";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Cantidad de estudiante por estado de proyecto",
    },
  },
};

const labels = ["En proceso", "Finalizado", "Rechazado", "Con observaciones"];

//Clase principal del componente
class InformeEstadistico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proceso: 0,
      rechazados: 0,
      observaciones: 0,
      finalizados: 0,
      carrera: "",
      fecha: "",
    };
  }

  //Metodo que hace la peticion de consulta a la BD mediante api
  componentDidMount() {
    let nombre_usuario = leerCookie("usuario"); //Se obtiene el usuario logeado
    //Proyectos en proceso
    axios
      .get("http://127.0.0.1:8000/login/proyectoActivos/", {
        params: { user: nombre_usuario },
      })
      .then((response) => {
        var c_activos = 0;
        var c_rechazado = 0;
        var c_finalizados = 0;
        var c_observacion = 0;
        const arreglo_inicial = response.data;
        const carrera =
          arreglo_inicial[0].solicitud_servicio_detalle.servicio_social_detalle
            .tipo_servicio_social_detalle.carrera_detalle.nombre_carrera;
        for (var i = 0; i < arreglo_inicial.length; i++) {
          if (arreglo_inicial[i].estado_proyecto === "En Proceso") {
            c_activos++;
          } else if (arreglo_inicial[i].estado_proyecto === "Rechazado") {
            c_rechazado++;
          } else if (arreglo_inicial[i].estado_proyecto === "Aprobado") {
            c_finalizados++;
          } else {
            c_observacion++;
          }
        }
        this.setState({
          proceso: c_activos,
          rechazados: c_rechazado,
          observaciones: c_observacion,
          finalizados: c_finalizados,
          carrera: carrera,
        });
        this.fechaActual();
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
    const data = {
      labels,
      datasets: [
        {
          label: "Cantidad de estudiantes",
          data: [
            this.state.proceso,
            this.state.finalizados,
            this.state.rechazados,
            this.state.observaciones,
          ],
          backgroundColor: [
            "rgba(53, 162, 235, 0.5)",
            "rgba(53, 100, 235, 0.5)",
            "rgba(255, 035, 001, 0.5)",
            "rgba(255, 233, 0, 0.5)",
          ],
        },
      ],
    };
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
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Informe estadistico</td>
                    <td>
                      Informe en donde se puede visualizar la cantidad de
                      estudiantes correspondientes al estado de su proyecto.
                    </td>
                    <td>
                      <ReactToPrint
                        trigger={() => <Button variant="info">Imprimir</Button>}
                        content={() => this.componentRef}
                        documentTitle={"Grafico estadistico"}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <Container
              fluid="md"
              ref={(el) => (this.componentRef = el)}
              className="pt-4 pb-5"
            >
              <div className="text-center">
                <div>
                  <Label>{this.state.carrera}</Label>
                </div>
                <div>
                  <Label>{this.state.fecha}</Label>
                </div>
              </div>
              <div className="izquierda">
                <p>Cantidad</p>
              </div>
              <div>
                <Bar options={options} data={data} />
              </div>
              <div className="text-right">
                <p>Estado</p>
              </div>
            </Container>
          </div>
        }
      />
    );
  }
}

export default InformeEstadistico;
