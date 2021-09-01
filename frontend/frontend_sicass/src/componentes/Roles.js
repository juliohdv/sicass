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
const url = "https://juliohdv.pythonanywhere.com/login/permisos/";

//Clase principal del componente
class Roles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permisos: [], //Estdo que contendra todo lo que digite el usuario
      tipoContenido: [], //Estado que contendra todo los content_type
      modalInsertar: false, //Estado que controla el abrir o cerra el modal correspondiente
      modalEliminar: false,
      form: {
        //Estado que contiene los campos del formulario a ingresar
        id: "",
        name: "",
        content_type: "",
        codename: "",
        tipoModal: "",
      },
    };
  }

  //Metodo en que realiza la peticion para ingreso de datos a la BD mediante la api
  peticionPost = async () => {
    try {
      if (
        this.state.form.name.length > 0 &&
        this.state.form.codename.length > 0 &&
        this.state.form.content_type.length > 0
      ) {
        await axios
          .post(url, {
            name: this.state.form.name,
            content_type: this.state.form.content_type,
            codename: this.state.form.codename,
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
              title: "Ocurrio un error en el registro del privilegio",
              showConfirmButton: false,
              timer: 2500,
            });
          });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title:
          "Debe ingresar los campos obligatirios: Nombre, Modelo y Privilegio",
      });
    }
  };

  //Metodo en que realiza la peticion para actualizar los datos a la BD mediante la api
  peticionPut = () => {
    axios
      .put(url + this.state.form.id + "/", this.state.form)
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
          title: "Ocurrio un error en actualizar el privilegio",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  //Metodo en que realiza la peticion para eliminar los datos a la BD mediante la api
  peticionDelete = () => {
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
          title: "Ocurrio un error en eliminar el privilegio",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  //Metodo que funciona para saber que elemento a selecciconado de la tabla y mandarlo al modal
  seleccionPrivilegio = (privilegio) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        id: privilegio[0],
        name: privilegio[1],
        content_type: privilegio[2],
        codename: privilegio[3],
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
        this.setState({ permisos: response.data });
        axios
          .get("http://127.0.0.1:8000/login/tipoContenido/")
          .then((response) => {
            this.setState({ tipoContenido: response.data });
          })
          .catch((error) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title:
                "Por el momento no hay conexión con la base de datos, intente en otro momento",
            });
          });
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
        name: "id",
        label: "Código",
      },
      {
        name: "name",
        label: "Nombre",
      },
      {
        name: "content_type",
        label: "Código de modelo",
      },
      {
        name: "codename",
        label: "Privilegio",
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
                      this.seleccionPrivilegio(tableMeta.rowData);
                      this.modalInsertar();
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
                        this.seleccionPrivilegio(tableMeta.rowData);
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
                }}
              >
                Crear
              </Button>
            </div>
            <div>
              <div className="pt-3">
                {/* Invocacion de la tabla, con sus opciones */}
                <MUIDataTable
                  title={"Privilegios"}
                  data={this.state.permisos}
                  columns={columns}
                  options={options}
                />
              </div>
            </div>

            {/* Modal para actualizar o crear */}
            <Modal isOpen={this.state.modalInsertar} centered>
              <ModalHeader style={{ display: "block" }}>
                {this.state.tipoModal === "insertar" ? (
                  <span>Crear privilegios</span>
                ) : (
                  <span>Actualizar privilegios</span>
                )}
              </ModalHeader>
              <ModalBody>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Puede cambiar grupos"
                    required
                    value={form ? form.name : ""}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Modelo</Form.Label>
                  <Form.Control
                    as="select"
                    id="content_type"
                    name="content_type"
                    required={true}
                    value={form ? form.content_type : ""}
                    onChange={this.handleChange}
                  >
                    <option value="" disabled={true}>
                      Seleccione..
                    </option>
                    {this.state.tipoContenido.map((elemento) => (
                      <option key={elemento.id} value={elemento.id}>
                        {elemento.model}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Privilegio</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Cambio de grupo"
                    id="codename"
                    name="codename"
                    required
                    value={form ? form.codename : ""}
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

            {/* Modal para eliminar */}
            <Modal isOpen={this.state.modalEliminar} centered>
              <ModalHeader style={{ display: "block" }}>
                <span>Eliminar privilegio</span>
              </ModalHeader>
              <ModalBody>
                ¿Esta seguro de eliminar el privilegio seleccionado?
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
            </Modal>
          </div>
        }
      />
    );
  }
}

export default Roles;
