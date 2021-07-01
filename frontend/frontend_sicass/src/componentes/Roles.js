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
const url = "http://127.0.0.1:8000/login/permisos/";

//Clase principal del componente
class Roles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permisos: [], //Estdo que contendra todo lo que digite el usuario
      modalInsertar: false, //Estado que controla el abrir o cerra el modal correspondiente
      modalEliminar: false,
      form: {
        //Estado que contiene los campos del formulario a ingresar
        id: "",
        name: "",
        content_type_id: "",
        codename: "",
        tipoModal: "",
      },
    };
  }

  //Metodo en que realiza la peticion para ingreso de datos a la BD mediante la api
  peticionPost = async () => {
    //delete this.state.form.id;
    //console.log(this.state.form);
    await axios
      .post(url, {
        id: this.state.form.id,
        name: this.state.form.name,
        content_type_id: this.state.form.content_type_id,
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
  };

  //Metodo en que realiza la peticion para actualizar los datos a la BD mediante la api
  peticionPut = () => {
    console.log(this.state.form.id);
    axios.put(url + this.state.form.id, this.state.form)
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
    .catch((error) => {

    });
  };

  //Metodo que funciona para saber que elemento a selecciconado de la tabla y mandarlo al modal
  seleccionPrivilegio = (privilegio) => {
    //console.log(privilegio);

    this.setState({
      tipoModal: "actualizar",
      form: {
        id: privilegio[0],
        name: privilegio[1],
        content_type_id: privilegio[2],
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
    //console.log(this.state.form);
  };

  //Metodo que hace la peticion de consulta a la BD mediante api
  componentDidMount() {
    axios
      .get(url)
      .then((response) => {
        this.setState({ permisos: response.data });
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
    //Retorna todo la interfas respectiva para la gestion de roles y privilegios
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
        label: "Código de tipo",
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
                <MUIDataTable
                  title={"Privilegios"}
                  data={this.state.permisos}
                  columns={columns}
                  options={options}
                />
              </div>
            </div>

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
                  <Form.Label>Código</Form.Label>
                  <Form.Control
                    type="text"
                    id="id"
                    name="id"
                    value={form ? form.id : this.state.permisos.length + 1}
                    required
                    readOnly
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Ejemplo de nombre"
                    required
                    value={form ? form.name : ""}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Grupo</Form.Label>
                  <Form.Control
                    type="text"
                    id="content_type_id"
                    name="content_type_id"
                    placeholder="######"
                    required
                    value={form ? form.content_type_id : ""}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Privilegio</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ejemplo de privilegio"
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

export default Roles;
