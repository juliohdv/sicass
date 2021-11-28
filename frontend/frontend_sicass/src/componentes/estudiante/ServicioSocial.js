import React, { Component } from "react";
import Dashboard from "../layout/Dashboard";
import axios from "axios";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import { Tooltip } from "@material-ui/core";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { Button } from "react-bootstrap";
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
      noMatch: "No hay registros de propuestas",
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
const url = "https://juliohdv.pythonanywhere.com/login/servicioSocialPorCarreraTipo/";
//Clase principal del componente
class Propuestas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicio: [],
      modalVerificacion: false,
      ultimoEstado: "",
      estadoRegistro: "",
      totalHoras: 0,
      form: {
        servicios_social: "",
        cantidad_estudiantes: 0,
        observaciones: "Ninguna",
        estado_solicitud: "En Proceso",
        estudiante: "",
      },
      formUpdate: {
        cantidad_horas: 0,
        descripcion: "",
        entidad: "",
        tipo_servicio_social: "",
        cantidad_estudiantes: 0,
      },
    };
  }

  //Metodo que funciona para saber que elemento a selecciconado de la tabla y mandarlo al modal
  seleccionServicio = (servicio) => {
    let carnetEstudiante = leerCookie("usuario");
    this.setState({
      form: {
        servicio_social: servicio[0],
        cantidad_estudiantes: servicio[3],
        observaciones: "Ninguna",
        estado_solicitud: "En Proceso",
        estudiante: carnetEstudiante,
      },
      formUpdate: {
        tipo_servicio_social: servicio[2],
        descripcion: servicio[3],
        cantidad_estudiantes: servicio[4] - 1,
        cantidad_horas: servicio[5],
        entidad: servicio[6],
      },
    });
  };

  //Metodo en que realiza la peticion para ingreso de datos a la BD mediante la api
  peticionPost = async () => {
    await axios
      .post("https://juliohdv.pythonanywhere.com/login/solicitudServicio/", {
        servicio_social: this.state.form.servicio_social,
        observaciones: this.state.form.observaciones,
        estado_solicitud: this.state.form.estado_solicitud,
        estudiante: this.state.form.estudiante,
      })
      .then((response) => {
        axios
          .put(
            "https://juliohdv.pythonanywhere.com/login/servicioSocial/" +
              this.state.form.servicio_social +
              "/",
            this.state.formUpdate
          )
          .then((response) => {
            this.setState({ modalVerificacion: false });
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Se a guardado con exito",
              showConfirmButton: false,
              timer: 2500,
            });
            this.componentDidMount();
          })
          .catch((error) => {});
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrio en el envio de la solicitud",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  componentDidMount() {
    let nombre_usuario = leerCookie("usuario"); //Se obtiene el usuario logeado
    axios
      .get("https://juliohdv.pythonanywhere.com/login/solicitudServicioEstudiante/", {
        params: {
          estudiante: nombre_usuario,
        },
      })
      .then((response) => {
        var horasRealizadas = 0;
        const arreglo_inicial = response.data;
        for (var i = 0; i < response.data.length; i++) {
          this.setState({ ultimoEstado: response.data[i].estado_solicitud });
          if(arreglo_inicial[i].estado_solicitud === "Finalizado"){
            horasRealizadas += arreglo_inicial[i].servicio_social_detalle.cantidad_horas;
          }
        }
        this.setState({ totalHoras: horasRealizadas });
      })
      .catch((error) => {});
      axios
      .get("https://juliohdv.pythonanywhere.com/login/registroUpsEstudiante/", {
        params: {
          estudiante: nombre_usuario,
        },
      })
      .then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          this.setState({ estadoRegistro: response.data[i].estado_solicitud });
        }
      })
      .catch((error) => {});
    axios
      .get(url, {
        params: {
          carnet: nombre_usuario,
        },
      })
      .then((response) => {
        const arreglo_inicial = response.data; //Guardamos el arreglo inicial para su reescritura
        const servicios = []; //Arreglo donde guardaremos los objetos reescritos
        for (var i = 0; i < arreglo_inicial.length; i++) {
          if (arreglo_inicial[i].cantidad_estudiantes > 0) {
            servicios[i] = {
              codigo_servicio_social: arreglo_inicial[i].codigo_servicio_social,
              cantidad_estudiantes: arreglo_inicial[i].cantidad_estudiantes,
              cantidad_horas: arreglo_inicial[i].cantidad_horas,
              entidad: arreglo_inicial[i].entidad,
              descripcion: arreglo_inicial[i].descripcion,
              propuesta: arreglo_inicial[i].propuesta_detalle,
              solicitud: arreglo_inicial[i].solicitud_detalle,
              codigo_tipo_servicio: arreglo_inicial[i].tipo_servicio_social,
              nombre_servicio:
                arreglo_inicial[i].tipo_servicio_social_detalle
                  .nombre_tipo_servicio_social,
            };
          }
        }
        this.setState({ servicio: servicios }); //Asignamos el nuevo arreglo reescrito al del estado
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title:
            "Por el momento no hay conexión con la base de datos, intente en otro momento",
        });
      });
  }
  render() {
    //Constante con las columnas de la tabla
    const columns = [
      {
        name: "codigo_servicio_social",
        label: "Código",
        key: "codigo_servicio_social",
        options: {
          display: false,
        },
      },
      {
        name: "nombre_servicio",
        label: "Nombre servicio",
        key: "nombre_servicio",
      },
      {
        name: "codigo_tipo_servicio",
        label: "Codigo SS",
        key: "codigo_tipo_servicio",
        options: {
          display: false,
        },
      },
      {
        name: "descripcion",
        label: "Descripción",
        key: "descripcion",
      },
      {
        name: "cantidad_estudiantes",
        label: "Cantidad de cupos",
        key: "cantidad_estudiantes",
      },
      {
        name: "cantidad_horas",
        label: "Horas totales",
        key: "cantidad_horas",
      },
      {
        name: "entidad",
        label: "Nombre entidad",
        key: "entidad",
      },
      {
        name: "acciones",
        label: "Acciónes",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            if (
              (this.state.ultimoEstado === "Rechazado" ||
              this.state.ultimoEstado === "Finalizado" ||
              this.state.ultimoEstado === "") &&
              this.state.estadoRegistro === "Aprobado" &&
              this.state.totalHoras < 500
            ) {
              return (
                <Tooltip title="Solicitar servicio social">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => {
                      this.seleccionServicio(tableMeta.rowData);
                      this.setState({ modalVerificacion: true });
                    }}
                  >
                    <PostAddIcon />
                  </Button>
                </Tooltip>
              );
            }
          },
        },
      },
    ];
    return (
      <Dashboard
        contenedor={
          <>
            <div className="pt-5">
              <MUIDataTable
                title={"Servicios sociales disponibles"}
                data={this.state.servicio}
                columns={columns}
                options={options}
              />
            </div>

            {/* Modal para verificacion */}
            <Modal isOpen={this.state.modalVerificacion} centered>
              <ModalHeader style={{ display: "block" }}>
                <span>Enviar solicitud</span>
              </ModalHeader>
              <ModalBody>
                ¿Esta seguro de solicitar el servicio social seleccionado?
                <ul>
                  <li>
                    Solo es posible enviar una solicitud, hastas obtener una
                    respuesta de esta.
                  </li>
                  <li>
                    Si su solicitud es "Rechazada", podra realizar otra
                    solicitud.
                  </li>
                  <li>
                    Si su solicitud es "Aprobada", podra realizar otra solicitud
                    si lo amerita, hasta que finalice con el servicio social
                    presente.
                  </li>
                </ul>
              </ModalBody>
              <ModalFooter>
                <Button variant="primary" onClick={() => this.peticionPost()}>
                  Enviar
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => this.setState({ modalVerificacion: false })}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </Modal>
          </>
        }
      />
    );
  }
}

export default Propuestas;
