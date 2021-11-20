import React, { Component } from "react";
import Dashboard from "../layout/Dashboard";
import axios from "axios";
import { Button, Form} from "react-bootstrap";
import Swal from "sweetalert2";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import MUIDataTable from "mui-datatables";
import { Tooltip } from "@material-ui/core";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import Visibility from "@material-ui/icons/Visibility";
import RateReviewIcon from "@material-ui/icons/RateReview"

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
const url = "http://127.0.0.1:8000/login/proyectosPorEscuelaRevision/";

//Clase principal del componente
class ResolucionActividades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proyecto: [],
      modalActividades: false,
      modalObservacion: false,
      modalConfirmar: false,
      form: {
        tipoModal: "",
        codigo_proyecto: "",
        observaciones: "",
        estado_proyecto: "",
        solicitud_servicio_id: "",
      },
      actividades: [],
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
          estado_proyecto: "En Proceso",
          solicitud_servicio: this.state.form.solicitud_servicio_id,
        }
      )
      .then((response) => {
        this.setState({ modalActividades: false });
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
          title: "Ocurrio un error en actualizar las observaciones",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };
  peticionAprobar = () => {
    axios
      .put(
        "http://127.0.0.1:8000/login/proyecto/" +
          this.state.form.codigo_proyecto +
          "/",
        {
          estado_proyecto: "Aprobado",
          solicitud_servicio: this.state.form.solicitud_servicio_id,
        }
      )
      .then((response) => {
        this.setState({ modalActividades: false });
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
          title: "Ocurrio un error en actualizar el estado del proyecto",
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
  obtenerActividades = (proyecto) =>{
      axios
        .get("http://127.0.0.1:8000/login/actividadesEstudiante/",{params:{proyecto:proyecto[0]}})
        .then((response) => {
            this.setState({ actividades:response.data})
        })
  }
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
          user: nombre_usuario,
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
    const { form } = this.state; 
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
              tableMeta.rowData[2] === "Revisión" ||
              tableMeta.rowData[2] === "Aprobado"
            ) {
              return (
                <>
                  <Tooltip title="Ver Actividades">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => {
                        this.seleccionProyecto(tableMeta.rowData);
                        this.obtenerActividades(tableMeta.rowData);
                        this.setState({ modalActividades: true });
                      }}
                    >
                      <Visibility />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Enviar Observación">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => {
                        this.seleccionProyecto(tableMeta.rowData);
                        this.obtenerActividades(tableMeta.rowData);
                        this.setState({ modalObservacion: true });
                      }}
                    >
                      <RateReviewIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Aprobar">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => {
                        this.seleccionProyecto(tableMeta.rowData);
                        this.obtenerActividades(tableMeta.rowData);
                        this.setState({ modalConfirmar: true });
                      }}
                    >
                      <CheckCircleIcon />
                    </Button>
                  </Tooltip>
                </>
              );
            }
          },
        },
      },
    ];
    const columnsActividades = [
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
            label: "Descripción",
          },
          {
            name: "encargado",
            label: "Encargado",
          },
          {
            name: "total_horas",
            label: "Horas",
          },
          {
            name: "proyecto",
            label: "Proyecto",
          },
    ]
    return (
      <Dashboard
        contenedor={
          <>
            <div className="pt-5">
              <MUIDataTable
                title={"Proyectos en Revisión"}
                data={this.state.proyecto}
                columns={columns}
                options={options}
              />

              {/* Modal para confirmar */}
              <Modal isOpen={this.state.modalActividades} centered size="lg">
                <ModalHeader style={{ display: "block" }}>
                  <span>Revisión de actividades</span>
                </ModalHeader>
                <ModalBody>
                        <MUIDataTable
                        title={"Actividades realizadas"}
                        data={this.state.actividades}
                        columns={columnsActividades}
                        options={options}
                        />  
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="secondary"
                    onClick={() => this.setState({ modalActividades: false })}
                  >
                    Salir
                  </Button>
                </ModalFooter>
              </Modal>
              <Modal isOpen={this.state.modalObservacion} centered size="lg">
              <ModalHeader style={{ display: "block" }}>
                  <span>Revisión de Observaciones</span>
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
                  <Button variant="primary" onClick={() => this.peticionPut()}>
                    Enviar
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => this.setState({ modalObservacion: false })}
                  >
                    Cancelar
                  </Button>
                </ModalFooter>
              </Modal>
              <Modal isOpen={this.state.modalConfirmar} centered>
                <ModalHeader style={{ display: "block" }}>
                  <span>Aprobar las actividades</span>
                </ModalHeader>
                <ModalBody>
                  ¿Esta seguro de solicitar aprobar la revisión?
                  <ul>
                    <li>
                      Esto cambiará el estado del proyecto a finalizado.
                    </li>
                  </ul>
                </ModalBody>
                <ModalFooter>
                  <Button variant="primary" onClick={() => this.peticionAprobar()}>
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

export default ResolucionActividades;
