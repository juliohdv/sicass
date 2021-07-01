import React, { Component, forwardRef } from "react";
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
const url = "http://127.0.0.1:8000/login/usuarios/";

//Clase principal del componente
class Usuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [], //Estdo que contendra todo lo que digite el usuario
      modalInsertar: false, //Estado que controla el abrir o cerra el modal correspondiente
      modalEliminar: false,
      form: {
        //Estado que contiene los campos del formulario a ingresar
        id: "",
        last_login: "",
        is_superuser: "",
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        is_staff: "",
        is_active: "",
        date_joined: "",
        tipoModal: "",
      },
    };
  }

  //Metodo en que realiza la peticion para ingreso de datos a la BD mediante la api
  peticionPost = async () => {
    //delete this.state.form.id;
    console.log(this.state.form);
    await axios
      .post(url, {
        id: this.state.form.id,
        is_superuser: this.state.form.is_superuser,
        first_name: this.form.first_name,
        last_name: this.state.form.last_name,
        email: this.state.form.email,
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
  };

  //Metodo en que realiza la peticion para actualizar los datos a la BD mediante la api
  peticionPut = () => {
    console.log(this.state.form.id);
    axios.put(url + this.state.form.id, this.state.form).then((response) => {
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
    .catch((error) =>{
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
    axios.delete(url + this.state.form.id).then((response) => {
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
    .catch((error) =>{
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
    console.log(usuario);

    this.setState({
      tipoModal: "actualizar",
      form: {
        id: usuario[0],
        is_superuser: usuario[2],
        username: usuario[3],
        first_name: usuario[4],
        last_name: usuario[5],
        email: usuario[6],
        is_staff: usuario[7],
        is_active: usuario[8],
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
    console.log(this.state.form);
  };

  //Metodo que hace la peticion de consulta a la BD mediante api
  componentDidMount() {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data)
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
    //Retorna todo la interfas respectiva para la gestion de roles y usuarios
    const { form } = this.state; //Constante que contiene el estado del formulario
    //Constante que contiene los datos estaticos de la tabla
    const columns = [
      {
        name: "id",
        label: "Codigo",
      },
      {
        name: "last_login",
        label: "Ultimo logeo",
      },
      {
        name: "is_superuser",
        label: "Super usuario",
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
        name: "is_staff",
        label: "Staff",
      },
      {
        name: "is_active",
        label: "Activo",
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
                <span className="pl-2">
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
              {<Button
                variant="success"
                onClick={() => {
                  this.setState({ form: null, tipoModal: "insertar" });
                  this.modalInsertar();
                }}
              >
                Crear
            </Button>}
            </div>
            <div>
              <div className="pt-3">
              <MUIDataTable
                  title={"Usuarios"}
                  data={this.state.usuarios}
                  columns={columns}
                  options={options}
                />
              </div>
            </div>

            <Modal isOpen={this.state.modalInsertar} centered className="pt-5">
              <ModalHeader style={{ display: "block" }}>
                {this.state.tipoModal == "insertar" ? (
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
                    value={
                      form ? form.username : ""
                    }
                    required
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@name.com"
                    required
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
                    required
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
                    required
                    value={form ? form.last_name : ""}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Super usuario</Form.Label>
                  <Form.Control
                    type="checkbox"
                    id="is_superuser"
                    name="is_superuser"
                    required
                    value={form ? form.is_superuser : ""}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Staff</Form.Label>
                  <Form.Control
                    type="checkbox"
                    id="is_staff"
                    name="is_staff"
                    required
                    value={form ? form.is_staff : ""}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Activo</Form.Label>
                  <Form.Control
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    required
                    value={form ? form.is_active : ""}
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <ModalFooter>
                  {this.state.tipoModal == "insertar" ? (
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

export default Usuarios;
