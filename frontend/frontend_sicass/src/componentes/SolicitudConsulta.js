import React, { Component, forwardRef } from "react";
import Dashboard from "./Dashboard";
import TablaGestion from "./TablaGestion";
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
import VisibilityIcon from "@material-ui/icons/Visibility";
import Swal from "sweetalert2";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

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

//Constante que contiene los datos de la columna de la tabla
const COLUMNAS = [
  {
    title: "Nombre de Entidad",
    field: "codigo_solicitud",
  },
  {
    title: "Clasificación de la entidad",
    field: "estado_solicitud",
  },
  {
    title: "Carrera solicitada",
    field: "fecha_fin_solicitud",
  },
  {
    title: "Tipo de servicio social",
    field: "fecha_inicio_solicitud",
  },
];

const DATA = [
  { nombre: "Nombre", privilegio: "Student" },
  { nombre: "Administrador", privilegio: "Admin" },
];

const url = "http://127.0.0.1:8000/login/permisos/";
//Clase principal del componente
class SolicitudConsulta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitudes: [],
      modalVisualizar: false,
    };
  }
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/login/solicitudes/")
      .then((response) => {
        this.setState({ solicitudes: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  seleccionSolicitud = (solicitud) => {
    console.log(solicitud);

    this.setState({
      form: {
        codigo_solicitud: solicitud.codigo_solicitud,
        fecha_inicio_solicitud: solicitud.fecha_inicio_solicitud,
        fecha_fin_solicitud: solicitud.fecha_fin_solicitud,
        estado_solicitud: solicitud.estado_solicitud,
      },
    });
  };
  modalVisualizar = () => {
    this.setState({ modalVisualizar: !this.state.modalVisualizar });
  };
  render() {
    const { form } = this.state;
    //Retorna todo la interfas respectiva para la gestion de roles y privilegios
    return (
      <Dashboard
        contenedor={
          <div>
            <div className="pt-5">
              <MaterialTable
                icons={tableIcons}
                columns={COLUMNAS}
                data={this.state.solicitudes}
                title="Solicitud de servicio social"
                options={{
                  actionsColumnIndex: -1,
                }}
                actions={[
                  {
                    icon: VisibilityIcon,
                    tooltip: "Ver mas datos de solicitud",
                    onClick: (event, rowData) => {
                      this.seleccionSolicitud(rowData);
                      this.modalVisualizar();
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
            <Modal isOpen={this.state.modalVisualizar} centered>
              <ModalHeader style={{ display: "block" }}>
               <span aling="center">Solicitud</span>
              </ModalHeader>
              <ModalBody>
                <Form.Group>
                  <Form.Label>Código de la solicitud</Form.Label>
                  <Form.Control
                    type="text"
                    id="codigo_solicitud"
                    name="codigo_solicitud"
                    //value= {form.codigo_solicitud}
                    readOnly
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Fecha solicitud</Form.Label>
                  <Form.Control
                    type="text"
                    id="fecha_inicio_solicitud"
                    name="fecha_inicio_solicitud"
                    readOnly
                    //value={form.fechaInicio}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Fecha final solicitud</Form.Label>
                  <Form.Control
                    type="text"
                    id="fecha_fin_solicitud"
                    name="fecha_fin_solicitud"
                    readOnly
                    //value={form.fechaFin}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Estado de la solicitud</Form.Label>
                  <Form.Control
                    type="text"
                    id="estado_solicitud"
                    name="estado_solicitud"
                    readOnly
                    //value={form.estado}
                  />
                </Form.Group>

                <ModalFooter>
                    <Button
                      variant="primary"
                    >
                      Consultar proyecto
                    </Button>
                
                  
                  <Button
                    variant="secondary"
                    onClick={() => this.modalVisualizar()}
                  >
                    Salir
                  </Button>
                </ModalFooter>
              </ModalBody>
            </Modal>
          </div>
        }
      />
    );
  }
}

export default SolicitudConsulta;
