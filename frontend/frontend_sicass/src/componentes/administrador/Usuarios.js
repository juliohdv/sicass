import React, { Component } from "react";
import Dashboard from "../Dashboard";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import MUIDataTable from "mui-datatables";
import { Tooltip } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Done from "@material-ui/icons/Done";
import Close from "@material-ui/icons/Close";

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
      noMatch: "No hay registros de usuarios",
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
const url = "http://127.0.0.1:8000/login/usuarios/";

//Clase principal del componente
class Usuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [], //Estado que contendra todo lo que digite el usuario
      modalInsertar: false, //Estado que controla el abrir o cerra el modal correspondiente
      modalEliminar: false,
      form: {
        //Estado que contiene los campos del formulario a ingresar
        id: "",
        last_login: "",
        is_superuser: false,
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        is_staff: false,
        is_active: false,
        date_joined: "",
        tipo_usuario: "",
        tipoModal: "",
      },
    };
  }

  //Metodo en que realiza la peticion para ingreso de datos a la BD mediante la api
  peticionPost = async () => {
    try {
      if (
        this.state.form.username.length > 0 &&
        this.state.form.password.length > 0 &&
        this.state.form.tipo_usuario.length > 0
      ) {
        await axios

          .post(url, {
            username: this.state.form.username,
            password: this.state.form.password,
            tipo_usuario: this.state.form.tipo_usuario,
            first_name: this.state.form.first_name,
            last_name: this.state.form.last_name,
            email: this.state.form.email,
            is_superuser: this.state.form.is_superuser,
            is_staff: this.state.form.is_staff,
            is_active: this.state.form.is_active,
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
              title: "Ocurrio un error en el registro del usuario",
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
          "Debe ingresar los campos obligatirios: Usuario, Contraseña y Tipo de usuario",
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
          title: "Ocurrio un error en actualizar el usuario",
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
          title: "Ocurrio un error en el eliminar el usuario",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  //Metodo que funciona para saber que elemento a selecciconado de la tabla y mandarlo al modal
  seleccionUsuario = (usuario) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        id: usuario[0],
        username: usuario[1],
        first_name: usuario[2],
        last_name: usuario[3],
        email: usuario[4],
        is_superuser: usuario[6],
        is_staff: usuario[7],
        is_active: usuario[8],
        tipo_usuario: usuario[9],
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
    axios
      .get(url)
      .then((response) => {
        this.setState({ usuarios: response.data });
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
        options: {
          display: false,
        },
      },
      {
        name: "username",
        label: "Usuario",
      },
      {
        name: "first_name",
        label: "Nombres",
      },
      {
        name: "last_name",
        label: "Apellidos",
      },
      {
        name: "email",
        label: "Email",
      },
      {
        name: "last_login",
        label: "Ultimo logeo",
      },
      {
        name: "is_superuser",
        label: "Super usuario",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            if (value === true)
              return (
                <Tooltip title="OK">
                  <Done color="primary" />
                </Tooltip>
              );
            else
              return (
                <Tooltip title="Failing">
                  <Close color="error" />
                </Tooltip>
              );
          },
        },
      },
      {
        name: "is_staff",
        label: "Staff",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            if (value === true)
              return (
                <Tooltip title="OK">
                  <Done color="primary" />
                </Tooltip>
              );
            else
              return (
                <Tooltip title="Failing">
                  <Close color="error" />
                </Tooltip>
              );
          },
        },
      },
      {
        name: "is_active",
        label: "Activo",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            if (value === true)
              return (
                <Tooltip title="OK">
                  <Done color="primary" />
                </Tooltip>
              );
            else
              return (
                <Tooltip title="Failing">
                  <Close color="error" />
                </Tooltip>
              );
          },
        },
      },
      {
        name: "tipo_usuario",
        label: "Tipo de Usuario",
      },
      {
        name: "date_joined",
        label: "Fecha creación",
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
                      this.seleccionUsuario(tableMeta.rowData);
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
                        this.seleccionUsuario(tableMeta.rowData);
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
                    this.setState({ form: null, tipoModal: "insertar" });
                    this.modalInsertar();
                  }}
                >
                  Crear
                </Button>
              }
            </div>
            <div>
              <div className="pt-3">
                {/* Invocacion de la tabla, con sus opciones correspondientes */}
                <MUIDataTable
                  title={"Usuarios"}
                  data={this.state.usuarios}
                  columns={columns}
                  options={options}
                />
              </div>
            </div>

            {/* Modales para creacion o actualizacion*/}
            <Modal isOpen={this.state.modalInsertar} centered className="pt-5">
              <ModalHeader style={{ display: "block" }}>
                {this.state.tipoModal === "insertar" ? (
                  <span>Crear usuario</span>
                ) : (
                  <span>Actualizar usuario</span>
                )}
              </ModalHeader>
              <ModalBody>
                <Form.Group>
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    id="username"
                    name="username"
                    autocomplete="off"
                    value={form ? form.username : ""}
                    required={true}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                {this.state.tipoModal === "insertar" ? (
                  <Form.Group>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      id="password"
                      name="password"
                      autocomplete="off"
                      value={form ? form.password : ""}
                      required={true}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                ) : (
                  <Form.Group>
                    <Form.Label>Id</Form.Label>
                    <Form.Control
                      type="text"
                      id="id"
                      name="id"
                      readOnly
                      value={form ? form.id : this.state.usuarios.length + 1}
                      required
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                )}
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@name.com"
                    pattern="([A-z]+)@([A-z]+)[.]([A-z.]+)"
                    value={form ? form.email : ""}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Nombres</Form.Label>
                  <Form.Control
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="Juan Antonio"
                    autocomplete="off"
                    value={form ? form.first_name : ""}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Perez Vides"
                    id="last_name"
                    name="last_name"
                    autocomplete="off"
                    value={form ? form.last_name : ""}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Row>
                  <Form.Group>
                    <Form.Check
                      id="is_superuser"
                      name="is_superuser"
                      value={form ? form.is_superuser : false}
                      checked={form ? form.is_superuser : false}
                      label="Super usuario"
                      onChange={this.handleChangeCheck}
                      inline
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Check
                      id="is_staff"
                      name="is_staff"
                      value={form ? form.is_staff : false}
                      checked={form ? form.is_staff : false}
                      label="Staff"
                      onChange={this.handleChangeCheck}
                      inline
                    />
                  </Form.Group>
                  {this.state.tipoModal === "insertar" ? (
                    <Form.Group>
                      <Form.Check
                        id="is_active"
                        name="is_active"
                        value={form ? form.is_active : false}
                        checked={form ? form.is_active : true}
                        disabled={true}
                        label="Activo"
                        onChange={this.handleChangeCheck}
                        inline
                      />
                    </Form.Group>
                  ) : (
                    <Form.Group>
                      <Form.Check
                        id="is_active"
                        name="is_active"
                        value={form ? form.is_active : false}
                        checked={form ? form.is_active : false}
                        label="Activo"
                        onChange={this.handleChangeCheck}
                        inline
                      />
                    </Form.Group>
                  )}
                </Form.Row>
                <Form.Group>
                  <Form.Label>Tipo de Usuario</Form.Label>
                  <Form.Control
                    as="select"
                    id="tipo_usuario"
                    name="tipo_usuario"
                    required={true}
                    value={form ? form.tipo_usuario : ""}
                    onChange={this.handleChange}
                  >
                    <option value="" disabled={true}>
                      Seleccione..
                    </option>
                    <option key="1" value={1}>
                      Estudiante
                    </option>
                    <option key="2" value={2}>
                      Encargado de facultad
                    </option>
                    <option key="3" value={3}>
                      Encargardo de escuela
                    </option>
                    <option key="4" value={4}>
                      Administrador
                    </option>
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
                <span>Eliminar usuario</span>
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
            </Modal>
          </div>
        }
      />
    );
  }
}

export default Usuarios;
