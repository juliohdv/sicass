import React, { Component } from "react";
import Dashboard from "../layout/Dashboard";
import ReactToPrint from "react-to-print";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FormLabel,
  Table,
} from "react-bootstrap";
import "./Certificado.css";

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

const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Ocubre",
  "Noviembre",
  "Diciembre",
];

export default class Certificado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proyecto: [],
      escuela: "",
      facultad: "",
      fecha: "",
      escuela: "",
      nombre_alumno: "",
      inicio:"",
      fin:"",
      carrera: "",
      encargado_facultad: "",
      encargado_escuela: "",
      dia: "",
      mes: "",
      anio: "",
      form: {
        carnet: "",
      },
    };
  }
  componentDidMount() {
    let nombre_usuario = leerCookie("usuario");
    axios
      .get("https://juliohdv.pythonanywhere.com/login/encargadoEscuela/")
      .then((response) => {
        const arreglo_inicial = response.data;
        var facultad;
        var carrera;
        var escuela;
        var encargado_escuela;
        for (var i = 0; i < arreglo_inicial.length; i++) {
          if (arreglo_inicial[i].usuario_detalle.username === nombre_usuario) {
            encargado_escuela =
              arreglo_inicial[i].docente_detalle.nombres_docente + " " + arreglo_inicial[i].docente_detalle.apellidos_docente;
            facultad =
              arreglo_inicial[i].docente_detalle.escuela_detalle.carrera_detalle
                .facultad_detalle.nombre_facultad;
            carrera =
              arreglo_inicial[i].docente_detalle.escuela_detalle.carrera_detalle
                .nombre_carrera;
            escuela =
              arreglo_inicial[i].docente_detalle.escuela_detalle.nombre_escuela;
          }
        }
        this.fechaActual();
        this.setState({
          facultad: facultad,
          carrera: carrera,
          escuela: escuela,
          encargado_escuela: encargado_escuela,
        });
      })
      .catch((error) => {});
  }

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleBusqueda = async () => {
    axios
      .get("https://juliohdv.pythonanywhere.com/login/proyectoPorEstudiante/", {
        params: {
          estudiante: this.state.form.carnet,
        },
      })
      .then((response) => {
        const arreglo_inicial = response.data;
        const proyectos = [];
        var total = 0;
        for (var i = 0; i < arreglo_inicial.length; i++) {

          if (arreglo_inicial[i].estado_proyecto === "Aprobado") {

            proyectos[i] = {
              tipo_servicio:
                arreglo_inicial[i].solicitud_servicio_detalle
                  .servicio_social_detalle.tipo_servicio_social_detalle
                  .nombre_tipo_servicio_social,
              total_horas:
                arreglo_inicial[i].solicitud_servicio_detalle
                  .servicio_social_detalle.cantidad_horas,

              fecha_inicio: arreglo_inicial[i].inicio,
              fecha_fin: arreglo_inicial[i].fin,
              entidad:
                arreglo_inicial[i].solicitud_servicio_detalle
                  .servicio_social_detalle.entidad,
            };
            total += arreglo_inicial[i].solicitud_servicio_detalle
            .servicio_social_detalle.cantidad_horas;
          }
        }
        this.setState({ proyecto: proyectos, total: total });
        if (this.state.form.carnet === "") {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Debe ingresar un carnet (formato: AA12345)",
            showConfirmButton: true,
          });
        } else if (response.data.length <= 0) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "El carnet buscado, no posee registros",
            showConfirmButton: true,
          });
        }
      })
      .catch((error) => {});
  };

  fechaActual() {
    var fecha = new Date();
    var mes = fecha.getMonth();
    var dia = fecha.getDate();
    var anio = fecha.getFullYear();
    var nombreMes = meses[mes];
    if (dia < 10) dia = "0" + dia;
    if (mes < 10) mes = "0" + mes;
    this.setState({ mes: nombreMes, dia: dia, anio: anio });
  }
  render() {
    const { form } = this.state;
    return (
      <Dashboard
        contenedor={
          <div className="pt-5">
            <Container className="menu-busqueda bg-secondary">
              <Row className="pt-2">
                <Col sm={4}>
                  <Form.Group>
                    <FormLabel>Carnet alumno</FormLabel>
                    <Form.Control
                      type="text"
                      id="carnet"
                      name="carnet"
                      value={form.carnet}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <div>
                    <Button
                      variant="success"
                      onClick={() => this.handleBusqueda()}
                    >
                      {/* <SearchIcon /> */}
                      <span className="texto-boton">Buscar</span>
                    </Button>
                  </div>
                </Col>

                <Col>
                  <Table
                    responsive="sm"
                    className="text-center"
                    hover={false}
                    borderless={true}
                    striped
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
                      <tr className="descripcion">
                        <td>Tiempo de finalización de Proyectos</td>
                        <td>
                          Informe en donde se puede visualizar el tiempo de
                          finalización de los proyectos de servicio social.
                        </td>
                        <td>
                          <ReactToPrint
                            trigger={() => (
                              <Button variant="info">Imprimir</Button>
                            )}
                            content={() => this.componentRef}
                            documentTitle={
                              "Proyectos activos " + this.state.fecha
                            }
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>
            <Container className="pt-4" ref={(el) => (this.componentRef = el)}>
              <div className="text-center pb-4">
                <h4>Universidad de El Salvador</h4>
                <h4>{this.state.facultad}</h4>
                <h4>{this.state.escuela}</h4>
                {/* <h5>{this.state.correo}</h5> */}
              </div>
              <div className="text-center pt-3">
                <h4>CONSTANCIA DE CUMPLIMIENTO DE SERVICIO SOCIAL</h4>
              </div>
              <div className="text-justify pt-3">
                <p>
                  Los suscritos: Jefe de la Unidad de Proyección Social de la{" "}
                  {this.state.facultad} y el Coordinador de la SubUnidad de la{" "}
                  {this.state.escuela}, Hacen constar que:
                </p>
                <p className="text-justify pt-3 pb-3">
                  Que el bachiller {this.state.nombre_alumno} con Carnet No.{" "}
                  {this.state.form.carnet} matriculado en la carrera de{" "}
                  {this.state.carrera}, ha cumplido sastifactoriamente con todos
                  los requerimientos que establece el Reglamento de Proyección
                  Social y Servicio Social de la {this.state.facultad}, conforme
                  a la descripción detallada en el siguiente cuadro:
                </p>
                <Table responsive="sm" hover={false} striped responsive>
                  <thead>
                    <tr className="text-center">
                      <th>Servicio Social</th>
                      <th>Lugar de Ejecución</th>
                      <th>Fecha Inicio</th>
                      <th>Fecha Fin</th>
                      <th>Numero de horas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.proyecto.map((elemento) => (
                      <tr>
                        <td>{elemento.tipo_servicio}</td>
                        <td>{elemento.entidad}</td>
                        <td>{elemento.fecha_inicio}</td>
                        <td>{elemento.fecha_fin}</td>
                        <td>{elemento.total_horas}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colspan={4} className="text-right">
                        TOTAL
                      </td>
                      <td>{this.state.total}</td>
                    </tr>
                  </tbody>
                </Table>
                <p className="pt-3">
                  Y para los consiguientes trámites legales de graduación, se
                  extiende la presente en la Ciudad Universitaria a los{" "}
                  {this.state.dia} dias del mes de {this.state.mes} de{" "}
                  {this.state.anio}
                </p>
                <Row className="espaciado">
                  <Col align="center">
                    <span>
                      ________________________________________________________
                    </span>
                    <br />
                    <span>{this.state.encargado_facultad}</span>
                    <br />
                    <span>
                      Coordinador de la subunidad de proyección social de la
                    </span>
                    <br />
                    <span>{this.state.facultad}</span>
                  </Col>
                  <Col align="center">
                    <span>
                      ________________________________________________________
                    </span>
                    <br />
                    <span>{this.state.encargado_escuela}</span>
                    <br />
                    <span>Jefe de la Unidad de Proyección Social</span>
                    <br />
                    <span>{this.state.facultad}</span>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
        }
      />
    );
  }
}
