import React, { Component } from "react";
import Dashboard from "./Dashboard";
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
  tableBodyHeight: "320px",
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 20],
  textLabels: {
    body: {
      noMatch: "No hay registros de privilegios",
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
const url = "http://127.0.0.1:8000/login/servicioSocial/";

//Clase principal del componente
class GestionServicioSocial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicios: [], //Estdo que contendra todo lo que digite el usuario
      modalInsertar: false, //Estado que controla el abrir o cerra el modal correspondiente
      modalEliminar: false,
      tipoServicio: [],
      form: {
        //Estado que contiene los campos del formulario a ingresar
        codigo_servicio_social: "",
        entidad: "",
        descripcion: "",
        cantidad_horas: "",
        cantidad_estudiantes: "",
        tipo_servicio_social: "",
        nombre_tipo_servicio_social:"",
        tipoModal: "",
      },
    };
  }

  //Metodo en que realiza la peticion para ingreso de datos a la BD mediante la api
  peticionPost = async () => {
    //delete this.state.form.id;
    await axios
      .post(url, {
        entidad: this.state.form.entidad,
        descripcion: this.state.form.descripcion,
        cantidad_horas: this.state.form.cantidad_horas,
        cantidad_estudiantes: this.state.form.cantidad_estudiantes,
        tipo_servicio_social: this.state.form.tipo_servicio_social,
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
          title: "Ocurrio un error en el registro del servicio social",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  //Metodo en que realiza la peticion para actualizar los datos a la BD mediante la api
  peticionPut = () => {
    console.log(this.state.codigo_servicio_social);
    axios.put(url + this.state.form.codigo_servicio_social + "/", this.state.form)
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

      });

  };

  //Metodo en que realiza la peticion para eliminar los datos a la BD mediante la api
  peticionDelete = () => {
    axios.delete(url + this.state.form.codigo_servicio_social).then((response) => {
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

      });
  };

  //Metodo que funciona para saber que elemento a selecciconado de la tabla y mandarlo al modal
  seleccionServicio = (servicio) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        codigo_servicio_social: servicio[0],
        entidad: servicio[1],
        descripcion: servicio[2],
        cantidad_horas: servicio[3],
        cantidad_estudiantes: servicio[4],
        nombre_tipo_servicio_social: servicio[5],
        tipo_servicio_social: servicio[6],/* las pisiciones se deben cambiar con base en BD */
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

  //Metodo que hace la peticion de consulta a la BD mediante api
  componentDidMount() {
    axios
      .get(url)
      .then((response) => {
        const arreglo_inicial = response.data;
        const servicio = [];
        for(var i=0;i< arreglo_inicial.length;i++){
          servicio[i] = 
          {
            codigo_servicio_social: arreglo_inicial[i].codigo_servicio_social,
            entidad: arreglo_inicial[i].entidad,
            descripcion: arreglo_inicial[i].descripcion,
            cantidad_horas: arreglo_inicial[i].cantidad_horas,
            cantidad_estudiantes: arreglo_inicial[i].cantidad_horas,
            tipo_servicio_social: arreglo_inicial[i].tipo_servicio_social,
            nombre_tipo_servicio_social: arreglo_inicial[i].tipo_servicio_social_detalle.nombre_tipo_servicio_social,
          }
        }
        this.setState({ servicios: servicio });
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
        name: "codigo_servicio_social",
        label: "Código",
      },
      {
        name: "entidad",
        label: "Nombre de la Entidad",
      },
      {
        name: "descripcion",
        label: "Descripción ",
      },
      {
        name: "cantidad_horas",
        label: "Horas",
      },
      {

        name: "cantidad_estudiantes",
        label: "Cantidad de estudiantes",
      },
      {
        name: "nombre_tipo_servicio_social",
        label: "Tipo de Servicio",

      },
      {
        name: "tipo_servicio_social",
        label: "ID Tipo de Servicio",
        options: {
          display: false,
         }
      },
      {
        name: "acciones",
        label: "Acciónes",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
                {/* Botones para editar y eliminar */}
                <Tooltip title="Editar">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => {
                      this.seleccionServicio(tableMeta.rowData);
                      this.modalInsertar();
                      axios
                          .get("http://127.0.0.1:8000/login/tipoServicioFacultad/",{
                            params:{user:leerCookie("usuario")}
                          })
                          .then((response) => {
                            console.log(response.data)
                            this.setState({ tipoServicio: response.data })
                          })
                          .catch((error) => { })
                    }}
                  >
                    <Edit></Edit>
                  </Button>
                </Tooltip>
                <span className="pl-2">
                  <Tooltip title="Eliminar">
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => {
                        this.seleccionServicio(tableMeta.rowData);
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
              {/* Boton para crear */}
              <Button
                variant="success"
                onClick={() => {
                  this.setState({ form: null, tipoModal: "insertar" });
                  this.modalInsertar();
                  axios
                      .get("http://127.0.0.1:8000/login/tipoServicioFacultad/",{
                        params:{user:leerCookie("usuario")}
                      })
                      .then((response) => {
                        console.log(response.data)
                        this.setState({ tipoServicio: response.data })
                      })
                      .catch((error) => { })
                }}
              >
                Crear
              </Button>
            </div>
            <div>
              <div className="pt-3">
                {/* Invocacion de la tabla, con sus opciones */}
                <MUIDataTable
                  title={"Gestion de servicios"}
                  data={this.state.servicios}
                  columns={columns}
                  options={options}
                />
              </div>
            </div>

            {/* Modal para actualizar o crear */}
            <Modal isOpen={this.state.modalInsertar} centered className="pt-5">
              <ModalHeader style={{ display: "block" }}>
                {this.state.tipoModal === "insertar" ? (
                  <span>Crear servicio social</span>
                ) : (
                  <span>Actualizar servicio social</span>
                )}
              </ModalHeader>
              <ModalBody>
                {/*
                <Form.Group>
                  <Form.Label>Código</Form.Label>
                  <Form.Control
                    type="text"
                    id="codigo_servicio_social"
                    name="codigo_servicio_social"
                    value={form ? form.codigo_servicio_social : this.state.servicios.length + 1}
                    
                  />
                </Form.Group>*/}
                <Form.Group>
                  <Form.Label>Entidad</Form.Label>
                  <Form.Control
                    type="text"
                    id="entidad"
                    name="entidad"
                    placeholder="CEPA"
                    required
                    value={form ? form.entidad : ""}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    id="descripcion"
                    name="descripcion"
                    placeholder="Ayudara al ingeniero de software en los respectivos proyectos"
                    required
                    value={form ? form.descripcion : ""}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Horas</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="###"
                    id="cantidad_horas"
                    name="cantidad_horas"
                    required
                    value={form ? form.cantidad_horas : ""}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Cantidad de estudiantes</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="##"
                    id="cantidad_estudiantes"
                    name="cantidad_estudiantes"
                    required
                    value={form ? form.cantidad_estudiantes : ""}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Tipo Servicio </Form.Label>
                  <Form.Control
                    as="select"
                    id="tipo_servicio_social"
                    name="tipo_servicio_social"
                    required={true}
                    value={form ? form.tipo_servicio_social : ""}
                    onChange={this.handleChange}
                  >
                    <option value="" disabled={true}>
                      Seleccione..
                    </option>
                    {this.state.tipoServicio.map((elemento) => (
                      <option key={elemento.condigo_tipo_servicio_social} value={elemento.condigo_tipo_servicio_social}>
                        {elemento.nombre_tipo_servicio_social}
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
                <span>Eliminar Servicio Social</span>
              </ModalHeader>
              <ModalBody>
                ¿Esta seguro de eliminar el Servicio Social seleccionado?
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

export default GestionServicioSocial;
