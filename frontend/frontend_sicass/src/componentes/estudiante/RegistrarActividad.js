import React, { Component } from "react";
import Dashboard from "../layout/Dashboard";
import axios from "axios";
import { Button, Form, Table, Row, Col, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import MUIDataTable from "mui-datatables";
import { Tooltip } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";


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

//Constante con las opciones de la tabla
const options = {
  download: "false",
  print: "false",
  responsive: "simple",
  selectableRows: false,
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 20],
  tableBodyHeight: "290px",
  textLabels: {
    body: {
      noMatch: "No hay registros de actividades",
      toolTip: "Sort",
      columnHeaderTooltip: (column) => `Odernar por ${column.label}`,
    },
    pagination: {
      next: "Página siguiente",
      previous: "Página previa",
      rowsPerPage: "Filas por página:",
      displayRows: "de",
    },
    toolbar: {
      search: "Búsqueda",
      downloadCsv: "Download CSV",
      print: "Print",
      viewColumns: "Ver columnas",
      filterTable: "Filtros de tabla",
    },
    filter: {
      all: "TODOS",
      title: "FILTROS",
      reset: "REINICIAR",
    },
    viewColumns: {
      title: "Mostrar columnas",
      titleAria: "Mostrar/Ocultar columnas de tabla",
    },
    selectedRows: {
      text: "fila(s) seleccionada",
      delete: "Eliminar",
      deleteAria: "Eliminar filas seleccionadas",
    },
  },
};

//Constannte que contiene la url de conexion con la api de rest
const url = "http://127.0.0.1:8000/login/actividades/";

//Clase principal del componente
class RegistrarActividad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actividades: [],
      tipo_servicio_social: "",
      entidad: "",
      cantidad_horas: "",
      estado_proyecto: "",
      modalInsertar: false,
      modalEliminar: false,
      proyecto: "",
      form: {
        tipoModal: "",
        codigo_actividad: "",
        fecha: "",
        descripcion: "",
        encargado: "",
        total_horas: "",
      },
    };
  }

  //Metodo en que realiza la peticion para ingreso de datos a la BD mediante la api
  peticionPost = async () => {
    try {
      if (
        this.state.form.fecha.length > 0 &&
        this.state.form.descripcion.length > 0 &&
        this.state.form.encargado.length > 0 &&
        this.state.form.total_horas.length > 0
      ) {
        await axios
          .post(url, {
            fecha: this.state.form.fecha,
            descripcion: this.state.form.descripcion,
            encargado: this.state.form.encargado,
            total_horas: this.state.form.total_horas,
            proyecto: this.state.proyecto,
          })
          .then((response) => {
            this.modalInsertar();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Se a guardado con exito",
              showConfirmButton: false,
              timer: 2500,
            });
            this.componentDidMount();
          })
          .catch((error) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Ocurrio un error en el registro de la actividad",
              showConfirmButton: false,
              timer: 2500,
            });
          });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Debe ingresar todos los campos",
      });
    }
  };

  //Metodo en que realiza la peticion para actualizar los datos a la BD mediante la api
  peticionPut = () => {
    axios
      .put(url + this.state.form.codigo_actividad + "/", {
        fecha: this.state.form.fecha,
        descripcion: this.state.form.descripcion,
        encargado: this.state.form.encargado,
        total_horas: this.state.form.total_horas,
        proyecto: this.state.proyecto,
      })
      .then((response) => {
        this.modalInsertar();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se a guardado con exito",
          showConfirmButton: false,
          timer: 2500,
        });
        this.componentDidMount();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrio un error en actualizar el usuario",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  //Metodo que funciona para saber que elemento a selecciconado de la tabla y mandarlo al modal
  seleccionActividad = (actividad) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        codigo_actividad: actividad[0],
        fecha: actividad[1],
        descripcion: actividad[2],
        encargado: actividad[3],
        total_horas: actividad[5],
      },
    });
  };

  //Metodo que sirve para manejar el estado del modal
  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  //Metodo para calcular el total de horas del servicio
  calculoHoras = () => {
    var totalHoras = 0;
    for (var i = 0; i < this.state.actividades.length; i++) {
      totalHoras += this.state.actividades[i].total_horas;
    }
    return totalHoras;
  };

  //Metodo que va guardado el estado de lo que digita el usuario en el formulario
  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  //Metodo que hace la peticion de consulta a la BD mediante api
  componentDidMount() {
    let nombre_usuario = leerCookie("usuario"); //Se obtiene el usuario logeado
    axios
      .get("http://127.0.0.1:8000/login/proyectoPorEstudiante/", {
        params: {
          estudiante: nombre_usuario,
        },
      })
      .then((response) => {
        const arreglo_inicial = response.data;
        var posicion = response.data.length - 1;
        this.setState({
          proyecto: arreglo_inicial[posicion].codigo_proyecto,
          entidad:
            arreglo_inicial[posicion].solicitud_servicio_detalle
              .servicio_social_detalle.entidad,
          cantidad_horas:
            arreglo_inicial[posicion].solicitud_servicio_detalle
              .servicio_social_detalle.cantidad_horas,
          tipo_servicio_social:
            arreglo_inicial[posicion].solicitud_servicio_detalle
              .servicio_social_detalle.tipo_servicio_social_detalle
              .nombre_tipo_servicio_social,
          estado_proyecto: response.data[posicion].estado_proyecto,
        });
        axios
          .get("http://127.0.0.1:8000/login/actividadesEstudiante/", {
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
    const { form } = this.state; //Constante que contiene el estado del formulario
    //Constante que contiene los datos estaticos de la tabla
    const columns = [
      {
        name: "codigo_actividad",
        label: "Codigo",
        options: {
          display: false,
        },
      },
      {
        name: "fecha",
        label: "Fecha",
      },
      {
        name: "descripcion",
        label: "Actividad realizada",
      },
      {
        name: "encargado",
        label: "Persona que certifica",
      },
      {
        name: "firma",
        label: "Firma de la persona que certifica",
      },
      {
        name: "total_horas",
        label: "Total de horas invertidas",
      },
      {
        name: "acciones",
        label: "Acciónes",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
                <Tooltip title="Editar">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => {
                      this.seleccionActividad(tableMeta.rowData);
                      this.modalInsertar();
                    }}
                  >
                    <Edit></Edit>
                  </Button>
                </Tooltip>
              </>
            );
          },
        },
      },
    ];
    return (
      <Dashboard
        contenedor={
          <div className="pt-4">
            <div>
              {this.state.estado_proyecto === "En Proceso" || this.state.estado_proyecto === "Rechazado" ? (
                <>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Tipo servicio</th>
                        <th>Entidad</th>
                        <th>Cantidad de horas</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{this.state.tipo_servicio_social}</td>
                        <td>{this.state.entidad}</td>
                        <td>{this.state.cantidad_horas}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <div>
                    <Row>
                      <Col sm={2}>
                        {this.state.cantidad_horas > this.calculoHoras() ? (
                          <Button
                            variant="success"
                            onClick={() => {
                              this.setState({
                                form: null,
                                tipoModal: "insertar",
                              });
                              this.modalInsertar();
                            }}
                          >
                            Registrar
                          </Button>
                        ) : (
                          <></>
                        )}
                      </Col>
                      <Col sm={8}>
                        <Form.Group as={Row}>
                          <Form.Label column className="text-right" sm={6}>
                            Total de horas invertidas
                          </Form.Label>
                          <Col>
                            <Form.Control
                              type="text"
                              readOnly={true}
                              value={this.calculoHoras()}
                            ></Form.Control>
                          </Col>
                          <Col></Col>
                        </Form.Group>
                      </Col>
                      <Col className="text-right" sm={2}>
                      </Col>
                    </Row>
                  </div>
                  <div>
                    <div>
                      <MUIDataTable
                        title={"Actividades"}
                        data={this.state.actividades}
                        columns={columns}
                        options={options}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <Alert variant="info">
                  <Alert.Heading className="text-center">
                    Aviso!!!
                  </Alert.Heading>
                  <hr />
                  <p className="mb-0">
                    Por el momento no esta asignado en ningun proyecto, solicite
                    un servicio social y si ya lo solicito, espere su respectiva
                    aprobacion
                  </p>
                </Alert>
              )}
            </div>

            {/* Modales para creacion o actualizacion*/}
            <Modal isOpen={this.state.modalInsertar} centered className="pt-5">
              <ModalHeader style={{ display: "block" }}>
                {this.state.tipoModal === "insertar" ? (
                  <span>Registar actividad</span>
                ) : (
                  <span>Actualizar actividad</span>
                )}
              </ModalHeader>
              <ModalBody>
                <Form.Group>
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={form ? form.fecha : ""}
                    required={true}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Actividad</Form.Label>
                  <Form.Control
                    type="actividad"
                    id="descripcion"
                    name="descripcion"
                    autocomplete="off"
                    value={form ? form.descripcion : ""}
                    required={true}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Persona que certifica</Form.Label>
                  <Form.Control
                    type="text"
                    id="encargado"
                    name="encargado"
                    value={form ? form.encargado : ""}
                    required={true}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Total de horas invertidas</Form.Label>
                  <Form.Control
                    type="text"
                    id="total_horas"
                    name="total_horas"
                    autocomplete="off"
                    value={form ? form.total_horas : ""}
                    required={true}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <ModalFooter>
                  {this.state.tipoModal === "insertar" ? (
                    <Button
                      variant="primary"
                      onClick={() => this.peticionPost()}
                    >
                      Guardar
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => this.peticionPut()}
                    >
                      Actualizar
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    onClick={() => this.modalInsertar()}
                  >
                    Cancelar
                  </Button>
                </ModalFooter>
              </ModalBody>
            </Modal>
          </div>
        }
      />
    );
  }
}

export default RegistrarActividad;
