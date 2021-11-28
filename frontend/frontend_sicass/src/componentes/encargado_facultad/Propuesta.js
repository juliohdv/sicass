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
      noMatch: "No hay registros de propuestas",
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
const url = "https://juliohdv.pythonanywhere.com/login/PropuestasPorFacultad/";

//Clase principal del componente
class Propuesta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propuestas: [],
      modalConfirmar: false,
      form: {
        tipoModal: "",
        codigo_propuesta: "",
        codigo_carrera: "",
        codigo_tipo_servicio_social: "",
        codigo_entidad_externa: "",
        fecha_inicio: "",
        fecha_fin: "",
        estado: "",
        descripcion: ""
      },
    };
  }

  //Metodo en que realiza la peticion para actualizar los datos a la BD mediante la api
  peticionPut = () => {
    axios
      .put(
        "https://juliohdv.pythonanywhere.com/login/propuestas/" +
          this.state.form.codigo_propuesta +
          "/",
        {
            carrera: this.state.form.codigo_carrera,
            tipo_servicio_social: this.state.form.codigo_tipo_servicio_social,
            entidad_externa: this.state.form.codigo_entidad_externa,
            fecha_inicio_propuesta: this.state.form.fecha_inicio,
            fecha_fin_propuesta: this.state.form.fecha_fin,
            estado_propuesta: "Aprobado",
            descripcion_propuesta: this.state.form.descripcion
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
          title: "Ocurrio un error en actualizar la propuesta",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  //Metodo que funciona para saber que elemento a selecciconado de la tabla y mandarlo al modal
  seleccionPropuesta = (propuesta) => {
    this.setState({
      form: {
        codigo_propuesta: propuesta[3],
        codigo_carrera: propuesta[0],
        codigo_tipo_servicio_social: propuesta[1],
        codigo_entidad_externa: propuesta[2],
        fecha_inicio: propuesta[4],
        fecha_fin: propuesta[5],
        descripcion: propuesta[7]
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
          user: nombre_usuario,
        },
      })
      .then((response) => {
        const arreglo_inicial = response.data;
        const propuestas = [];
        for (var i = 0; i < arreglo_inicial.length; i++) {
          propuestas[i] = {
            codigo_propuesta: arreglo_inicial[i].codigo_propuesta,
            fecha_inicio: arreglo_inicial[i].fecha_inicio_propuesta,
            fecha_fin: arreglo_inicial[i].fecha_fin_propuesta,
            descripcion: arreglo_inicial[i].descripcion_propuesta,
            estado: arreglo_inicial[i].estado_propuesta,
            carrera_nombre: arreglo_inicial[i].carrera_detalle.nombre_carrera,
            carrera:arreglo_inicial[i].carrera,
            tipo_servicio_social: arreglo_inicial[i].tipo_servicio_social,
            entidad_externa: arreglo_inicial[i].entidad_externa,
            entidad_externa_nombre: arreglo_inicial[i].entidad_externa_detalle.nombre_entidad,
            tipo_servicio_social_nombre: arreglo_inicial[i].tipo_servicio_social_detalle.nombre_tipo_servicio_social,
          };
        }
        this.setState({ propuestas: propuestas });
      })
      .catch((error) => {});
  }
  render() {
    const { form } = this.state; 
    //Constante que contiene los datos estaticos de la tabla
    const columns = [
      {
        name: "carrera",
        label: "Código Carrera",
        options: {
          display: false,
        },
      },
      {
        name: "tipo_servicio_social",
        label: "Código Tipo Servicio Social",
        options: {
          display: false,
        },
      },
      {
        name: "entidad_externa",
        label: "Codigo Entidad Externa",
        options: {
          display: false,
        },
      },
      {
        name: "codigo_propuesta",
        label: "Codigo",
        options: {
          display: false,
        },
      },
      {
        name: "fecha_inicio",
        label: "Inicio",
      },
      {
        name: "fecha_fin",
        label: "Fin",
      },
      {
        name: "entidad_externa_nombre",
        label: "Entidad Externa",
      },
      {
        name: "descripcion",
        label: "Descripción",
        options: {
          display: true,
        },
      },
      {
        name: "estado",
        label: "Estado",
      },
      {
        name: "carrera_nombre",
        label: "Carrera",
      },
      {
        name: "tipo_servicio_social_nombre",
        label: "Tipo de Servicio Social",
      },
      {
        name: "acciones",
        label: "Acciónes",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            {
              return (
                <>
                  <Tooltip title="Aprobar">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => {
                        this.seleccionPropuesta(tableMeta.rowData);
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
    
    return (
      <Dashboard
        contenedor={
          <>
            <div className="pt-5">
              <MUIDataTable
                title={"Propuestas"}
                data={this.state.propuestas}
                columns={columns}
                options={options}
              />

              {/* Modal para confirmar */}
              <Modal isOpen={this.state.modalConfirmar} centered>
                <ModalHeader style={{ display: "block" }}>
                  <span>Aprobar propuesta</span>
                </ModalHeader>
                <ModalBody>
                  ¿Esta seguro de aprobar la propuesta?
                  <ul>
                    <li>
                      Esto cambiará el estado de la propuesta a Aprobada.
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

export default Propuesta;
