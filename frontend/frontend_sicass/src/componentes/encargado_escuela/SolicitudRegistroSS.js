import React, { Component } from "react";
import Dashboard from "../layout/Dashboard";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Swal from "sweetalert2";
import { Tooltip } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import { Button, Form } from "react-bootstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

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
  tableBodyHeight: "320px",
  textLabels: {
    body: {
      noMatch: "No hay registros de solicitudes",
      toolTip: "Sort",
      columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
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

//Constante con la url de la api (Backend)
const url =
  "http://127.0.0.1:8000/login/solicitudEstudiateASSPorEncargadoEscuela/";

//Clase principal del componente
class SolicitudRegistroSS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitudes: [],
      solicitudSS: [],
      form: {
        estudiante: "",
        estado_solicitud: "",
        observaciones: "",
        cantidad_horas: "",
        entidad: "",
        nombre_tipo_servicio_social: "",
        codigo_solicitud_servicio: "",
        tipo_servicio_social: "",
        servicio_social: "",
      },
      modalConfirmar: false,
    };
  }

  //Metodo en que realiza la peticion para actualizar los datos a la BD mediante la api
  peticionPut = () => {
    console.log(this.state.form);
    axios
      .put(
        "http://127.0.0.1:8000/login/solicitudServicio/" +
          this.state.form.codigo_solicitud_servicio +
          "/",
        this.state.form
      )
      .then((response) => {
        this.setState({ modalConfirmar: false });
        if (this.state.form.estado_solicitud == "Aprobado") {
          axios
            .post("http://127.0.0.1:8000/login/proyecto/", {
              observaciones: "Ninguna",
              estado_proyecto: "En proceso",
              solicitud_servicio: this.state.form.codigo_solicitud_servicio,
            })
            .then((response) => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Se ha guardado con éxito",
                showConfirmButton: false,
                timer: 2500,
              });
              this.componentDidMount();
            })
            .catch((error) => {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Ocurrió un error en actualizar",
                showConfirmButton: false,
                timer: 2500,
              });
            });
          return;
        }
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se ha guardado con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
        this.componentDidMount();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrió un error en actualizar",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  //Metodo que va guardado el estado_solicitud de lo que digita el usuario en el formulario
  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  //Metodo que funciona para saber que elemento a selecciconado de la tabla y mandarlo al modal
  seleccionSolicitud = (solicitudes) => {
    this.setState({
      form: {
        codigo_solicitud_servicio: solicitudes[0],
        estudiante: solicitudes[1],
        estado_solicitud: solicitudes[2],
        observaciones: solicitudes[3],
        cantidad_horas: solicitudes[4],
        entidad: solicitudes[5],
        servicio_social: solicitudes[6],
        servicio_social_descripcion: solicitudes[7],
      },
    });
  };

  //Metodo que hace la peticion de consulta a la BD mediante api
  componentDidMount() {
    let nombre_usuario = leerCookie("usuario"); //Se obtiene el usuario logeado
    console.log(nombre_usuario);
    axios
      .get(url, {
        params: { user: nombre_usuario },
      })
      .then((response) => {
        const arreglo_inicial = response.data; //Guardamos el arreglo inicial para su reescritura
        const solicitud = []; //Arreglo donde guardaremos los objetos reescritos
        for (var i = 0; i < arreglo_inicial.length; i++) {
          //Recorremos el arreglo inicial
          solicitud[i] =
            //Asignamos los campos del arrelgo inicial a los del nuevo objeto
            {
              codigo_solicitud_servicio:
                arreglo_inicial[i].codigo_solicitud_servicio,
              servicio_social_cantidad_estudiantes:
                arreglo_inicial[i].servicio_social_detalle.cantidad_estudiantes,
              servicio_social_cantidad_horas:
                arreglo_inicial[i].servicio_social_detalle.cantidad_horas,
              servicio_social_descripcion:
                arreglo_inicial[i].servicio_social_detalle.descripcion,
              servicio_social_entidad:
                arreglo_inicial[i].servicio_social_detalle.entidad,
              observaciones: arreglo_inicial[i].observaciones,
              estado_solicitud: arreglo_inicial[i].estado_solicitud,
              servicio_social: arreglo_inicial[i].servicio_social,
              estudiante: arreglo_inicial[i].estudiante,
            };
        }
        this.setState({ solicitudes: solicitud });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title:
            "Por el momento no hay conexión con la Base de Datos, intente en otro momento",
        });
      });
  }
  render() {
    const { form } = this.state;

    //Constante con las columnas de la tabla
    const columns = [
      {
        name: "codigo_solicitud_servicio",
        label: "Código",
        key: "codigo_solicitud_servicio",
        options: {
          display: false,
        },
      },
      {
        name: "estudiante",
        label: "Estudiante",
        key: "estudiante",
      },
      {
        name: "estado_solicitud",
        label: "Estado",
        key: "estado_solicitud",
      },
      {
        name: "observaciones",
        label: "Observaciones",
        key: "observaciones",
      },
      {
        name: "servicio_social_cantidad_horas",
        label: "Cantidad de Horas",
        key: "servicio_social_cantidad_horas",
      },
      {
        name: "servicio_social_entidad",
        label: "Entidad",
        key: "servicio_social_entidad",
      },
      {
        name: "servicio_social",
        label: "Servicio Social",
        key: "servicio_social",
        options: {
          display: false,
        },
      },
      {
        name: "servicio_social_descripcion",
        label: "Descripción",
        key: "servicio_social_descripcion",
      },
      {
        name: "tipo_servicio_social",
        label: "Tipo Servicio Social",
        key: "tipo_servicio_social",
        options: {
          display: false,
        },
      },
      {
        name: "acciones",
        label: "Acciones",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              /* Boton para redirigir hacia el proyecto que le corresponde a la propuesta */
              <Tooltip title="Ver proyecto">
                <Button
                  size="sm"
                  variant="outline-info"
                  onClick={() => {
                    this.seleccionSolicitud(tableMeta.rowData);
                    this.setState({ modalConfirmar: true });
                  }}
                >
                  <Visibility />
                </Button>
              </Tooltip>
            );
            //}
          },
        },
      },
    ];
    return (
      /* Filtrar por el usuario, los respectivos estado_solicitud de solicitud */
      <Dashboard
        contenedor={
          <div className="pt-5">
            {/* Se invoca la tabla, con los datos correspondientes */}
            <MUIDataTable
              title={"Registro a Servicio Social"}
              data={this.state.solicitudes}
              columns={columns}
              options={options}
            />

            {/* Modal para confirmar */}
            <Modal isOpen={this.state.modalConfirmar} centered>
              <ModalHeader style={{ display: "block" }}>
                <span>Revisión Solicitud</span>
              </ModalHeader>
              <ModalBody>
                <Form.Group>
                  <Form.Label>Observaciones</Form.Label>
                  <Form.Control
                    type="text"
                    id="observaciones"
                    name="observaciones"
                    required={true}
                    autoComplete="off"
                    value={form ? form.observaciones : ""}
                    onChange={this.handleChange}
                  ></Form.Control>
                </Form.Group>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="primary"
                  onClick={() => {
                    this.state.form.estado_solicitud = "Aprobado";

                    this.peticionPut();
                  }}
                >
                  Aprobar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    this.state.form.estado_solicitud = "Rechazado";
                    this.peticionPut();
                  }}
                >
                  Rechazar
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => this.setState({ modalConfirmar: false })}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        }
      />
    );
  }
}

export default SolicitudRegistroSS;
