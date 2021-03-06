import React, { Component } from "react";
import Dashboard from "../layout/Dashboard";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import MUIDataTable from "mui-datatables";
import { Tooltip } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";

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
      noMatch: "No hay registros de docentes",
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
const url = "http://127.0.0.1:8000/login/docentes/";

//Clase principal del componente
class Docentes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docentes: [], //Estado que contendra todo lo que digite el usuario
      escuelas: [],
      modalInsertar: false, //Estado que controla el abrir o cerra el modal correspondiente
      modalEliminar: false,
      form: {
        //Estado que contiene los campos del formulario a ingresar
        codigo_docente: "",
        nombres_docente: "",
        apellidos_docente: "",
        correo: "",
        sexo: "",
        direccion_docente: "",
        telefono_docente: "",
        escuela:"",
        escuela_detalle:"",
        facultad_id:"826"
      },
    };
  }

  //Metodo en que realiza la peticion para ingreso de datos a la BD mediante la api
  peticionPost = async () => {
    console.log(this.state.form.password);
    await axios
              .post(url, {
                codigo_docente: this.state.form.codigo_docente,
                nombres_docente: this.state.form.nombres_docente,
                apellidos_docente: this.state.form.apellidos_docente,
                correo: this.state.form.correo,
                sexo: this.state.form.sexo,
                direccion_docente: this.state.form.direccion_docente,
                telefono_docente: this.state.form.telefono_docente,
                escuela: this.state.form.escuela
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
                  title: "Ocurrio un error en el registro del docente",
                  showConfirmButton: false,
                  timer: 2500,
                });
              });
            };
      /*});
  }; */

  //Metodo en que realiza la peticion para actualizar los datos a la BD mediante la api
  peticionPut = () => {
    axios
      .put(url + this.state.form.codigo_docente + "/", this.state.form)
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
          title: "Ocurrio un error en actualizar el docente",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  //Metodo en que realiza la peticion para eliminar los datos a la BD mediante la api
  peticionDelete = () => {
    axios
      .delete(url + this.state.form.codigo_docente)
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
          title: "Ocurrio un error en el eliminar el docente",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  //Metodo que funciona para saber que elemento a selecciconado de la tabla y mandarlo al modal
  seleccionDocente = (docente) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
          codigo_docente: docente[0],
          nombres_docente: docente[1],
          apellidos_docente: docente[2],
        correo: docente[3],
        sexo: docente[4],
        direccion_docente: docente[5],
        telefono_docente: docente[6],
        escuela: docente[7],
        escuela_detalle: docente[8],
        facultad_id: docente[9]
      },
    });
  };

  //Metodo que sirve para manejar el estado del modal
  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
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

  //Metodo que cambia el estado de true o false en el checkbox
  handleChangeCheck = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.checked,
      },
    });
  };

  //Metodo que hace la peticion de consulta a la BD mediante api
  componentDidMount() {
    let nombre_usuario = leerCookie("usuario")
    axios
      .get('http://127.0.0.1:8000/login/docentesPorEncargadoFacultad/',{
        params: {
          user: nombre_usuario,
        },
      })
      .then((response) => {
        const arreglo_inicial = response.data
        const docente = []
        for(var i=0; i<arreglo_inicial.length;i++){
          docente[i]={
            codigo_docente: arreglo_inicial[i].codigo_docente,
            nombres_docente: arreglo_inicial[i].nombres_docente,
            apellidos_docente: arreglo_inicial[i].apellidos_docente,
            correo: arreglo_inicial[i].correo,
            sexo: arreglo_inicial[i].sexo,
            direccion_docente: arreglo_inicial[i].direccion_docente,
            telefono_docente: arreglo_inicial[i].telefono_docente,
            escuela: arreglo_inicial[i].escuela,
            escuela_detalle: arreglo_inicial[i].escuela_detalle.nombre_escuela,
            facultad_id: arreglo_inicial[i].escuela_detalle.carrera_detalle.facultad,    
          }
        }
        this.setState({ docentes: docente });

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
    const { form } = this.state; //Constante que contiene el estado del formulario
    //Constante que contiene los datos estaticos de la tabla
    const columns = [
      {
        name: "codigo_docente", //0
        label: "Código",
        options: {
          display: "excluded",
        },
      },
      {
        name: "nombres_docente",  //1
        label: "Nombres",
      },
      {
        name: "apellidos_docente", //2
        label: "Apellidos",
      },
      {
        name: "correo", //3
        label: "Email",
      },
      {
        name: "sexo", //4
        label: "Sexo",
        options: {
          display: "excluded",
        },
      },
      {
        name: "direccion_docente",  //5
        label: "Dirección",
      },
      {
        name: "telefono_docente",  //6
        label: "Teléfono",
      },
      {
        name: "escuela_detalle",  //7
        label: "Escuela",
      },
      {
        name: "escuela",  //8
        label: "EscuelaID",
        options: {
          display: "excluded",
        },
      },
      {
        name: "facultad_id",  //9
        label: "FacultadID",
        options: {
          display: "excluded",
        },
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
                      this.seleccionDocente(tableMeta.rowData);
                      axios 
                        .get('http://127.0.0.1:8000/login/escuelasPorFacultad/',{
                          params:{facultad: this.state.form.facultad_id}
                        })
                        .then((response) =>{
                           this.setState({escuelas: response.data})
                        })
                      this.modalInsertar();
                    }}
                  >
                    <Edit></Edit>
                  </Button>
                </Tooltip>
                <span>
                  <Tooltip title="Eliminar">
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => {
                        this.seleccionDocente(tableMeta.rowData);
                        this.setState({ modalEliminar: true });
                      }}
                    >
                      <Delete></Delete>
                    </Button>
                  </Tooltip>
                </span>
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
              {/* Boton crear */}
              {
                <Button
                  variant="success"
                  onClick={() => {
                    axios 
                      .get('http://127.0.0.1:8000/login/escuelasPorFacultad/',{
                        params:{facultad: this.state.form.facultad_id}
                      })
                      .then((response) =>{
                        this.setState({escuelas: response.data})
                      })
                    this.setState({ form: null, tipoModal: "insertar" });
                    this.modalInsertar();
                  }}
                >
                  Registrar Nuevo
                </Button>
              }
            </div>
            <div>
              <div className="pt-3">
                {/* Invocacion de la tabla, con sus opciones correspondientes */}
                <MUIDataTable
                  title={"Docentes"}
                  data={this.state.docentes}
                  columns={columns}
                  options={options}
                />
              </div>
            </div>

            {/* Modales para creacion o actualizacion*/}
            <Modal isOpen={this.state.modalInsertar} centered className="pt-5">
              <ModalHeader style={{ display: "block" }}>
                {this.state.tipoModal === "insertar" ? (
                  <span>Crear docente</span>
                ) : (
                  <span>Actualizar docente</span>
                )}
              </ModalHeader>
              <ModalBody>
              <Form.Group>
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                      type="text"
                      id="codigo_docente"
                      name="codigo_docente"
                      readOnly
                      value={form ? form.codigo_docente : this.state.docentes.length + 1}
                      required
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                <Form.Group>
                  <Form.Label>Nombres</Form.Label>
                  <Form.Control
                    type="text"
                    id="nombres_docente"
                    name="nombres_docente"
                    autocomplete="off"
                    value={form ? form.nombres_docente : ""}
                    required={true}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                  <Form.Group>
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                      type="text"
                      id="apellidos_docente"
                      name="apellidos_docente"
                      autocomplete="off"
                      value={form ? form.apellidos_docente : ""}
                      required={true}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    id="correo"
                    name="correo"
                    placeholder="example@name.com"
                    pattern="([A-z]+)@([A-z]+)[.]([A-z.]+)"
                    value={form ? form.correo : ""}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Sexo</Form.Label>
                  <Form.Control
                    as="select"
                    id="sexo"
                    name="sexo"
                    required={true}
                    value={form ? form.sexo : ""}
                    onChange={this.handleChange}
                  >
                    <option value="" disabled={true}>
                      Seleccione..
                    </option>
                    <option key="1" value={"Masculino"}>
                      Masculino
                    </option>
                    <option key="2" value={"Femenino"}>
                      Femenino
                    </option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Direccion</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Dirección"
                    id="direccion_docente"
                    name="direccion_docente"
                    autocomplete="off"
                    value={form ? form.direccion_docente : ""}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Teléfono"
                    id="telefono_docente"
                    name="telefono_docente"
                    autocomplete="off"
                    value={form ? form.telefono_docente : ""}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Escuela</Form.Label>
                  <Form.Control
                    as="select"
                    id="escuela"
                    name="escuela"
                    required={true}
                    value={form ? form.escuela : ""}
                    onChange={this.handleChange}
                  >
                    <option value="" disabled={true}>
                      Seleccione..
                    </option>
                    {this.state.escuelas.map((elemento) =>(
                      <option key={elemento.codigo_escuela} value={elemento.codigo_escuela}>
                        {elemento.nombre_escuela}
                      </option>
                    ))}
                  </Form.Control>
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

            {/* Modal para eliminar */}
            <Modal isOpen={this.state.modalEliminar} centered>
              <ModalHeader style={{ display: "block" }}>
                <span>Eliminar docente</span>
              </ModalHeader>
              <ModalBody>
                ¿Esta seguro de eliminar el docente seleccionado?
              </ModalBody>
              <ModalFooter>
                <Button variant="danger" onClick={() => this.peticionDelete()}>
                  Si
                </Button>
                <Button
                  variant="secundary"
                  onClick={() => this.setState({ modalEliminar: false })}
                >
                  No
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        }
      />
    );
  }
}

export default Docentes;
