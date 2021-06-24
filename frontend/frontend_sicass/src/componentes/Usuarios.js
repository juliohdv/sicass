import React, { Component, forwardRef } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

//Constante que contiene todo los iconos de la tabla de Datatable con material UI
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

//Constante que contiene los datos estaticos de la tabla
const COLUMNAS = [
  {
    title: "Codigo",
    field: "id",
  },
  {
    title: "Ultimo logeo",
    field: "last_login",
  },
  {
    title: "Super usuario",
    field: "is_superuser",
  },
  {
    title: "Usuario",
    field: "username",
  },
  {
    title: "Nombres",
    field: "first_name",
  },
  {
    title: "Apellidos",
    field: "last_name",
  },
  {
    title: "Email",
    field: "email",
  },
  {
    title: "Staff",
    field: "is_staff",
  },
  {
    title: "Activo",
    field: "is_active",
  },
  {
    title: "Fecha creación",
    field: "date_joined",
  },
];

//Constannte que contiene la url de conexion con la api de rest
const url = "http://127.0.0.1:8000/login/usuarios/";

//Clase principal del componente
class Usuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permisos: [], //Estdo que contendra todo lo que digite el usuario
      modalInsertar: false, //Estado que controla el abrir o cerra el modal correspondiente
      modalEliminar: false,
      form: { //Estado que contiene los campos del formulario a ingresar
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
    console.log(this.state.form)
    await axios
      .post(url, {
        id:this.state.form.id,
        is_superuser:this.state.form.is_superuser,
        first_name: this.form.first_name,
        last_name:this.state.form.last_name,
        email:this.state.form.email,
        is_staff:this.state.form.is_staff,
        is_active:this.state.form.is_active,
      })
      .then((response) => {
        this.modalInsertar();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se a guardado con exito',
          showConfirmButton: false,
          timer: 2500
        })
        this.componentDidMount();
      })
      .catch((error) => {
        console.log(error.masage);
      });
  };

  //Metodo en que realiza la peticion para actualizar los datos a la BD mediante la api
  peticionPut = () => {
    console.log(this.state.form.id);
    axios.put(url + this.state.form.id, this.state.form).then((response) => {
      this.modalInsertar();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se a guardado con exito',
        showConfirmButton: false,
        timer: 2500
      })
      this.componentDidMount();
    });
  };

  //Metodo en que realiza la peticion para eliminar los datos a la BD mediante la api
  peticionDelete = () => {
    axios.delete(url + this.state.form.id).then((response) => {
      this.setState({ modalEliminar: false });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se a eliminado con exito',
        showConfirmButton: false,
        timer: 2500
      })
      this.componentDidMount();
    });
  };

  //Metodo que funciona para saber que elemento a selecciconado de la tabla y mandarlo al modal
  seleccionUsuario = (usuario) => {
    console.log(usuario);

    this.setState({
      tipoModal: "actualizar",
      form: {
        id: usuario.id,
        username: usuario.username,
        is_superuser: usuario.is_superuser,
        first_name: usuario.first_name,
        last_name: usuario.last_name,
        email: usuario.email,
        is_staff: usuario.is_staff,
        is_active: usuario.is_active,
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
        this.setState({ permisos: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    //Retorna todo la interfas respectiva para la gestion de roles y usuarios
    const { form } = this.state; //Constante que contiene el estado del formulario
    return (
      <Dashboard
        contenedor={
          <div className="pt-4">
            <div>
              {/*<Button
                variant="success"
                onClick={() => {
                  this.setState({ form: null, tipoModal: "insertar" });
                  this.modalInsertar();
                }}
              >
                Crear
            </Button>*/}
            </div>
            <div>
              <div className="pt-3">
                <MaterialTable
                  icons={tableIcons}
                  columns={COLUMNAS}
                  data={this.state.permisos}
                  title="usuarios"
                  options={{
                    actionsColumnIndex: -1,
                  }}
                  actions={[
                    {
                      icon: EditIcon,
                      tooltip: "Editar elemento",
                      onClick: (event, rowData) => {
                        this.seleccionUsuario(rowData); 
                        this.modalInsertar();
                      },
                    },
                    {
                      icon: DeleteIcon,
                      tooltip: "Eliminar elemento",
                      onClick: (event, rowData) => {
                        this.seleccionUsuario(rowData); 
                        this.setState({modalEliminar: true});
                      },
                    },
                  ]}
                  localization={{
                    header: {
                      actions: "Acciones",
                    },
                  }}
                />
              </div>
            </div>

            <Modal isOpen={this.state.modalInsertar} centered>
              <ModalHeader style={{ display: "block" }}>
              {this.state.tipoModal == "insertar" ? (
                    <span>Crear usuarios</span>
                  ) : (
                    <span>Actualizar usuarios</span>
                  )}
              </ModalHeader>
              <ModalBody>
                <Form.Group>
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    id="username"
                    name="username"
                    value={form ? form.username : this.state.permisos.length + 1}
                    required
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    id="enail"
                    name="email"
                    placeholder="Ejemplo de nombre"
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
                    placeholder="Nombres"
                    required
                    value={form ? form.first_name : ""}
                    onChange={this.handleChange}
                  />
                </Form.Group>
               <Form.Group>
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ejemplo de usuario"
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
              <ModalBody>
                ¿Esta seguro de eliminar el usuario seleccionado?
              </ModalBody>
              <ModalFooter>
                <Button variant="danger" onClick={()=>this.peticionDelete()}>Si</Button>
                <Button variant="secundary" onClick={()=>this.setState({modalEliminar: false})}>No</Button>
              </ModalFooter>
            </Modal>
          </div>
        }
      />
    );
  }
}

export default Usuarios;