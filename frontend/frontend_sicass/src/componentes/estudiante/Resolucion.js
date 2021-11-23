import React, { Component } from "react";
import Dashboard from "../layout/Dashboard";
import axios from "axios";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import MUIDataTable from "mui-datatables";
import { Tooltip } from "@material-ui/core";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

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
      noMatch: "No hay registros de servicios sociales",
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
const url = "http://127.0.0.1:8000/login/proyectoPorEstudiante/";

//Clase principal del componente
class Resolucion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proyecto: [],
      modalConfirmar: false,
      form: {
        tipoModal: "",
        codigo_proyecto: "",
        observaciones: "",
        estado_proyecto: "",
        solicitud_servicio_id: "",
      },
    };
  }

  //Metodo en que realiza la peticion para actualizar los datos a la BD mediante la api
  peticionPut = () => {
    axios
      .put(
        "http://127.0.0.1:8000/login/proyecto/" +
          this.state.form.codigo_proyecto +
          "/",
        {
          observaciones: this.state.form.observaciones,
          estado_proyecto: "Revisión",
          solicitud_servicio: this.state.form.solicitud_servicio_id,
        }
      )
      .then((response) => {
        this.setState({ modalConfirmar: false });
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
  seleccionProyecto = (proyecto) => {
    this.setState({
      form: {
        codigo_proyecto: proyecto[0],
        observaciones: proyecto[1],
        estado_proyecto: proyecto[2],
        solicitud_servicio_id: proyecto[3],
      },
    });
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
      .get(url, {
        params: {
          estudiante: nombre_usuario,
        },
      })
      .then((response) => {
        const arreglo_inicial = response.data;
        const proyectos = [];
        for (var i = 0; i < arreglo_inicial.length; i++) {
          proyectos[i] = {
            codigo_proyecto: arreglo_inicial[i].codigo_proyecto,
            observaciones: arreglo_inicial[i].observaciones,
            estado_proyecto: arreglo_inicial[i].estado_proyecto,
            entidad:
              arreglo_inicial[i].solicitud_servicio_detalle
                .servicio_social_detalle.entidad,
            tipo_servicio_social:
              arreglo_inicial[i].solicitud_servicio_detalle
                .servicio_social_detalle.tipo_servicio_social_detalle
                .nombre_tipo_servicio_social,
            cantidad_horas:
              arreglo_inicial[i].solicitud_servicio_detalle
                .servicio_social_detalle.cantidad_horas,
            solicitud_servicio_id: arreglo_inicial[i].solicitud_servicio,
          };
        }
        this.setState({ proyecto: proyectos });
      })
      .catch((error) => {});
  }
  render() {
    //const { form } = this.state; 
    //Constante que contiene los datos estaticos de la tabla
    const columns = [
      {
        name: "codigo_proyecto",
        label: "Codigo",
        options: {
          display: false,
        },
      },
      {
        name: "observaciones",
        label: "Observaciones",
      },
      {
        name: "estado_proyecto",
        label: "Estado",
      },
      {
        name: "solicitud_servicio_id",
        label: "Solicitud",
        options: {
          display: false,
        },
      },
      {
        name: "entidad",
        label: "Entidad",
      },
      {
        name: "tipo_servicio_social",
        label: "Tipo servicio",
      },
      {
        name: "cantidad_horas",
        label: "Total de horas",
      },
      {
        name: "acciones",
        label: "Acciónes",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            if (
              tableMeta.rowData[2] === "Rechazado" ||
              tableMeta.rowData[2] === "En Proceso"
            ) {
              return (
                <>
                  <Tooltip title="Editar">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => {
                        this.seleccionProyecto(tableMeta.rowData);
                        this.setState({ modalConfirmar: true });
                      }}
                    >
                      <AssignmentTurnedInIcon />
                    </Button>
                  </Tooltip>
                </>
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
                title={"Proyectos realizados"}
                data={this.state.proyecto}
                columns={columns}
                options={options}
              />

              {/* Modal para confirmar */}
              <Modal isOpen={this.state.modalConfirmar} centered>
                <ModalHeader style={{ display: "block" }}>
                  <span>Revisión proyecto</span>
                </ModalHeader>
                <ModalBody>
                  ¿Esta seguro de solicitar la revisión del proyecto?
                  <ul>
                    <li>
                      Solo es posible enviar una revisión, hastas obtener una
                      respuesta de esta.
                    </li>
                    <li>
                      Si su solicitud es "Rechazado", podra realizar otra
                      revisión, en donde debe haber solucionado las
                      observaciones correspondientes.
                    </li>
                    <li>
                      Si su solicitud es "Aprobado", su proyecto esta
                      finalizado.
                    </li>
                  </ul>
                </ModalBody>
                <ModalFooter>
                  <Button variant="primary" onClick={() => this.peticionPut()}>
                    Enviar
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
          </>
        }
      />
    );
  }
}

export default Resolucion;
