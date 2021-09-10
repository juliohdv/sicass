import React, { Component } from "react";
import Dashboard from "../Dashboard";
import axios from "axios";
import { Button, Form, Table, Row, Col, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import MUIDataTable from "mui-datatables";
import { Tooltip } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
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
      estado_solicitud: "",
      modalInsertar: false,
      modalEliminar: false,
      solicitud_servicio: "",
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
            solicitud_servicio: this.state.solicitud_servicio,
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
        solicitud_servicio: this.state.solicitud_servicio,
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

  //Metodo en que realiza la peticion para eliminar los datos a la BD mediante la api
  /* peticionDelete = () => {
    axios
      .delete(url + this.state.form.id)
      .then((response) => {
        this.setState({ modalEliminar: false });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se a eliminado con exito",
          showConfirmButton: false,
          timer: 2500,
        });
        this.componentDidMount();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrio un error en el eliminar el usuario",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  }; */

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
    const arreglo_inicial = this.state.actividades;
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
      .get("http://127.0.0.1:8000/login/ultimaSolicitudServicio/", {
        params: {
          estudiante: nombre_usuario,
        },
      })
      .then((response) => {
        const arreglo_inicial = response.data;
        this.setState({
          tipo_servicio_social:
            arreglo_inicial[0].servicio_social_detalle
              .tipo_servicio_social_detalle.nombre_tipo_servicio_social,
        });
        this.setState({
          cantidad_horas:
            arreglo_inicial[0].servicio_social_detalle.cantidad_horas,
        });
        this.setState({
          entidad: arreglo_inicial[0].servicio_social_detalle.entidad,
        });
        this.setState({
          estado_solicitud: arreglo_inicial[0].estado_solicitud,
        });
        this.setState({
          solicitud_servicio: arreglo_inicial[0].codigo_solicitud_servicio,
        });

        axios
          .get("http://127.0.0.1:8000/login/actividadesEstudiante/", {
            params: {
              servicio: this.state.solicitud_servicio,
            },
          })
          .then((response) => {
            this.setState({ actividades: response.data });
          })
          .catch((error) => {});
        /* 
        this.form.solicitud_servicio = arreglo_inicial[0].codigo_solicitud_servicio; */

        /* const solicitud = [];
        for (var i = 0; i < arreglo_inicial.length; i++) {
          solicitud[i] = {
            cantidad_horas: arreglo_inicial[i].servicio_social_detalle.cantidad_horas,
            entidad: arreglo_inicial[i].servicio_social_detalle.entidad,
            tipo_servicio_social:
              arreglo_inicial[i].servicio_social_detalle
                .tipo_servicio_social_detalle.nombre_tipo_servicio_social,
          };
        } */
      })
      .catch((error) => {
        /* if(error.data == null){
          Swal.fire({
            position: "center",
            icon: "error",
            title:
              "No ha realizado ninguna solicitud de servicio social o su solicitud aun ",
          });
          return
        }
        Swal.fire({
          position: "center",
          icon: "error",
          title:
            "Por el momento no hay conexión con la base de datos, intente en otro momento",
        }); */
      });
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
                {/* Botones para las opciones de editar y eliminar */}
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
                {/*  <span>
                  <Tooltip title="Eliminar">
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => {
                        this.seleccionActividad(tableMeta.rowData);
                        this.setState({ modalEliminar: true });
                      }}
                    >
                      <Delete></Delete>
                    </Button>
                  </Tooltip>
                </span> */}
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
              {this.state.estado_solicitud === "Aprobado" ? (
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
                      <Col>
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
                      </Col>
                      <Col>
                        <Row>
                          <Form.Label>Total de horas invertidas</Form.Label>
                          <Form.Control
                            type="text"
                            readOnly={true}
                            value={this.calculoHoras()}
                          ></Form.Control>
                        </Row>
                      </Col>
                      <Col className="text-right">
                        {/* <Button
                          variant="secondary"
                           onClick={() => {
                      this.setState({ form: null, tipoModal: "insertar" });
                      this.modalInsertar();
                    }} 
                        >
                          Imprimir
                        </Button> */}
                      </Col>
                    </Row>
                  </div>
                  <div>
                    <div className="pt-3">
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
                  <Alert.Heading className="text-center">Aviso!!!</Alert.Heading>
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

            {/* Modal para eliminar 
            <Modal isOpen={this.state.modalEliminar} centered>
              <ModalHeader style={{ display: "block" }}>
                <span>Eliminar actividad</span>
              </ModalHeader>
              <ModalBody>
                ¿Esta seguro de eliminar el usuario seleccionado?
              </ModalBody>
              <ModalFooter>
                <Button variant="danger" onClick={() => this.peticionDelete()}>
                  Si
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => this.setState({ modalEliminar: false })}
                >
                  No
                </Button>
              </ModalFooter>
            </Modal> */}
          </div>
        }
      />
    );
  }
}

export default RegistrarActividad;
