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

const COLUMNAS = [
  {
    title: "Codigo",
    field: "codigo_solicitud",
  },
  {
    title: "Entidad que solicita",
    field: "entidad_externa",
  },
  {
    title: "Carrera",
    field: "carrera",
  },
  {
    title: "Fecha de Solicitud",
    field: "fecha_inicio_solicitud",
  },
  {
    title: "Fecha de Finalización",
    field: "fecha_fin_solicitud",
  },
  {
    title: "Estado",
    field: "estado_solicitud",
  },
  {
    title: "Tipo de Servicio Social",
    field: "tipo_servicio_social",
  },
];

const url = "http://127.0.0.1:8000/login/solicitudes/";
//Clase principal del componente
class Solicitudes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitudes: [],
      modalInsertar: false,
      modalEliminar: false,
      form: {
        codigo_solicitud: "",
        entidad_externa: "",
        carrera: "",
        fecha_inicio_solicitud: "",
        fecha_fin_solicitud: "",
        estado_solicitud:"",
        tipo_servicio_social:"",
      },
    };
  }

  /* peticionPost = async () => {
    //delete this.state.form.id;
    await axios
      .post(url, this.state.form)
      .then((response) => {
        this.modalInsertar();
        this.componentDidMount();

      })
      .catch((error) => {
        console.log(error.masage);
      });
  };
  peticionPut = () => {
    console.log(this.state.form.id);
    axios.put(url + this.state.form.id, this.state.form.id).then((response) => {
      this.modalInsertar();
      this.componentDidMount();
    });
  };

  peticionDelete = () => {
    axios.delete(url + this.state.form.id).then((response) => {
      this.setState({ modalEliminar: false });
      this.componentDidMount();
    });
  }; */
  seleccionSolicitud = (solicitud) => {
    console.log(solicitud);

    this.setState({
      tipoModal: "actualizar",
      carrera_id:"",
      form: {
        codigo_solicitud: solicitud.codigo_solicitud,
        entidad_externa: solicitud.entidad_externa,
        carrera: solicitud.carrera,
        fecha_inicio_solicitud: solicitud.fecha_inicio_solicitud,
        fecha_fin_solicitud: solicitud.fecha_fin_solicitud,
        estado_solicitud: solicitud.estado_solicitud,
        tipo_servicio_social: solicitud.tipo_servicio_social,
      },
    });
  };
 /*  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  }; */
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
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/login/solicitudes/")
      .then((response) => {
        this.setState({ solicitudes: response.data });
        /* for(let i=0; i<this.state.solicitudes.length; i++){
          console.log(this.state.solicitudes[i].carrera)
          this.setState({carrera_id:this.state.solicitudes[i].carrera})
          axios
            .get('http://127.0.0.1:8000/login/carreraPorId',{params:{carrera:this.state.carrera_id}})
            .then((response)=>{
                console.log(response)
                console.log(response.data.map(elemento=>(elemento.nombre_carrera)).toString())
                this.setState({carrera:response.data.map(elemento=>(elemento.nombre_carrera)).toString()})
                console.log(this.state.carrera)
            })
        } */
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    //Retorna todo la interfas respectiva para la gestion de roles y privilegios
    const { form } = this.state;
    return (
      <Dashboard
        contenedor={
          <div className="pt-4">
          {/*   <div>
              <Button
                variant="success"
                onClick={() => {
                  this.setState({ form: null, tipoModal: "insertar" });
                  this.modalInsertar();
                }}
              >
                Crear
              </Button>
            </div> */}
            <div>
              <div className="pt-3">
                <MaterialTable
                  icons={tableIcons}
                  columns={COLUMNAS}
                  data={this.state.solicitudes}
                  title="Solicitudes de Servicio Social"
                  options={{
                    actionsColumnIndex: -1,
                  }}
                  actions={[
                    {
                      icon: EditIcon,
                      tooltip: "Editar elemento",
                      onClick: (event, rowData) => {
                        this.seleccionSolicitud(rowData); //Hqy que mandar bien el elemento seleccionado
                        //this.modalInsertar();
                        alert("Selecionada" + rowData)
                      },
                    },
                    /* {
                      icon: DeleteIcon,
                      tooltip: "Eliminar elemento",
                      onClick: (event, rowData) => {
                        this.seleccionPrivilegio(rowData); //Hqy que mandar bien el elemento seleccionado
                        this.setState({modalEliminar: true});
                      },
                    }, */
                  ]}
                  localization={{
                    header: {
                      actions: "Acciones",
                    },
                  }}
                />
              </div>
            </div>

            {/* <Modal isOpen={this.state.modalInsertar} centered>
              <ModalHeader style={{ display: "block" }}>
              {this.state.tipoModal == "insertar" ? (
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
                    maxLength="100"
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
            </Modal> */}

            {/* <Modal isOpen={this.state.modalEliminar} centered>
              <ModalBody>
                ¿Esta seguro de eliminar el privilegio seleccionado?{" "}
                {form && form.name}
              </ModalBody>
              <ModalFooter>
                <Button variant="danger" onClick={()=>this.peticionDelete()}>Si</Button>
                <Button variant="secundary" onClick={()=>this.setState({modalEliminar: false})}>No</Button>
              </ModalFooter>
            </Modal> */}
          </div>
        }
      />
    );
  }
}

export default Solicitudes;
