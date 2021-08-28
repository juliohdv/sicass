import React, { Component } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import { Tooltip } from "@material-ui/core";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { Button, Form } from "react-bootstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";



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
      noMatch: "No hay registros de propuestas",
      toolTip: "Sort",
      columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
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

//Constante con la url de la api (Backend)
const url = "http://127.0.0.1:8000/login/propuestaEstado/";
//Clase principal del componente
class AsignarPropuesta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicio: [],
      form:{
        propuesta:"",
        entidad: "",
        tipo_servicio_social: "",
        //condigo_tipo_servicio_social:"",
        descripcion: "",
        cantidad_horas: "",
        cantidad_estudiantes: "",
        nombre_tipo_servicio:"",
      },
     /*  formUpdate: {
        codigo_propuesta: "",
        fecha_inicio_propuesta: "",
        fecha_fin_propuesta: "",
        descripcion_propuesta: "",
        estado_propuesta: "",
        entidad_externa: "",
        carrera: "",
        tipo_servicio_social: "",
      } */
    };

  }

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

  //Metodo que funciona para saber que elemento a selecciconado de la tabla y mandarlo al modal
  seleccionPropuesta = (propuestas) => {
    this.setState({
      form: {
        propuesta:propuestas[0],
        entidad: propuestas[1],
        nombre_tipo_servicio: propuestas[2],
        condigo_tipo_servicio_social: propuestas[5],
        descripcion: propuestas[4],
      },
    });
  };

   //Metodo en que realiza la peticion para ingreso de datos a la BD mediante la api
   peticionPost = async () => {
    //delete this.state.form.id;
    await axios
      .post("http://127.0.0.1:8000/login/registroUps/", {
        propuesta: this.state.form.propuesta,
        entidad: this.state.form.entidad,
        tipo_servicio_social: this.state.form.condigo_tipo_servicio_social,
        //condigo_tipo_servicio_social: this.state.form.condigo_tipo_servicio_social,
        descripcion: this.state.form.descripcion,
        cantidad_horas: this.state.form.cantidad_horas,
        cantidad_estudiantes: this.state.form.cantidad_estudiantes,
        
      })
      .then((response) => {
                this.modalInsertar();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se ha guardado con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
        this.componentDidMount();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrió un Error en el Registro",
          showConfirmButton: false,
          timer: 2500,
        });  
      });
  };


  componentDidMount() {
    axios
      .get(url, {
        params:{
          estado: "Aprobado",
        }
      })
      .then((response) => {
        console.log(response.data);
        const arreglo_inicial = response.data; //Guardamos el arreglo inicial para su reescritura
        const servicios = new Array(); //Arreglo donde guardaremos los objetos reescritos
        //const propuestas = new Array();
        for (var i = 0; i < arreglo_inicial.length; i++) {
          servicios[i] =
            //Asignamos los campos del arreglo inicial a los del nuevo objeto
            {
              codigo_propuesta: arreglo_inicial[i].codigo_propuesta,
              entidad_externa: arreglo_inicial[i].entidad_externa_detalle.nombre_entidad,
              tipo_servicio_social: arreglo_inicial[i].tipo_servicio_social_detalle.condigo_tipo_servicio_social,
              telefono_entidad: arreglo_inicial[i].entidad_externa_detalle.telefono_entidad,
              descripcion_propuesta: arreglo_inicial[i].descripcion_propuesta,
              //condigo_tipo_servicio_social: arreglo_inicial[i].condigo_tipo_servicio_social,
              nombre_tipo_servicio: arreglo_inicial[i].tipo_servicio_social_detalle.nombre_tipo_servicio_social,
            };
         
        }
        this.setState({ servicio: servicios }); //Asignamos el nuevo arreglo reescrito al del estado
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
    const {form}=this.state;
    //Constante con las columnas de la tabla
const columns = [
    {
      name: "codigo_propuesta",
      label: "Código",
      key: "codigo_propuesta",
      options: {
        display: false,
      }
    },
    {
      name: "entidad_externa",
      label: "Nombre Entidad Externa",
      key: "entidad_externa",
    },
    {
      name: "nombre_tipo_servicio",
      label: "Tipo Servicio Social",
      key: "nombre_tipo_servicio",
    },
    {
      name: "telefono_entidad",
      label: "Teléfono",
      key: "telefono_entidad",
    },
    {
      name: "descripcion_propuesta",
      label: "Descripción",
      key: "descripcion_propuesta",
    },
    {
      name: "tipo_servicio_social",
      label: "Tipo Servicio Social",
      key: "tipo_servicio_social",
      options: {
        display: false,
      }
    },
    {
      name: "acciones",
      label: "Acciones",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            /* Boton para redirigir hacia el proyecto que le corresponde a la propuesta */
            <Tooltip title="Asignar Datos de Proyecto">
              <Button
                size="sm"
                variant="outline-primary"
                 onClick={() => {
                    this.seleccionPropuesta(tableMeta.rowData);
                    console.log(tableMeta.rowData);
                    this.modalInsertar();
                  }} 
              >
                <PostAddIcon />
              </Button>
            </Tooltip>
          );
        },
      },
    },
  ];
    return (
      <Dashboard
        contenedor={
          <div className="pt-5">
            {/* Se invoca la tabla, con los datos correspondientes */}
            <MUIDataTable
              title={"Asignación de proyecto"}
              data={this.state.servicio}
              columns={columns}
              options={options}
            />

    {/* Modal para actualizar o crear */}
    <Modal isOpen={this.state.modalInsertar} centered>
              <ModalHeader style={{ display: "block" }}>
              <div>
              <h3>
                  Registro
              </h3>
              </div>
              </ModalHeader>
              <ModalBody>
                <Form.Group>
                  
                  <Form.Control
                    type="hidden"
                    id="propuesta"
                    name="propuesta"
                    value={this.state.form.propuesta}

                    required
                    readOnly
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Nombre Entidad</Form.Label>
                  <Form.Control
                    type="text"
                    id="entidad"
                    name="entidad"
                    required
                    readOnly
                    value={this.state.form.entidad}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Tipo Servicio Social</Form.Label>
                  <Form.Control
                    type="text"
                    id="nombre_tipo_servicio"
                    name="nombre_tipo_servicio"
                    required
                    readOnly
                    value={this.state.form.nombre_tipo_servicio}
                  />
                </Form.Group>
                <Form.Group>
                
                  <Form.Control
                    type="hidden"
                    id="condigo_tipo_servicio_social"
                    name="condigo_tipo_servicio_social"
                    required
                    readOnly
                    value={this.state.form.condigo_tipo_servicio_social}
                  />
                  </Form.Group>
                <Form.Group>
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                   type="text"
                    id="descripcion"
                    name="descripcion"
                    required
                    readOnly
                    value={this.state.form.descripcion}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Cantidad de Horas</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="###"
                    id="cantidad_horas"
                    maxLength="3"
                    pattern="[0-9]"
                    title="Horas en números enteros"
                    name="cantidad_horas"
                    required
                    value={form.cantidad_horas}
                    onChange={this.handleChange} 
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Cantidad de estudiantes</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="##"
                    id="cantidad_estudiantes"
                    maxLength="2"
                    pattern="[0-9]"
                    title="Ingrese la cantidad de estudiantes en números enteros"
                    autoComplete="off"
                    name="cantidad_estudiantes"
                    required
                    value={form.cantidad_estudiantes}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <ModalFooter>
                  
                    <Button
                      variant="primary"
                      onClick={() => this.peticionPost()}
                    >
                      Guardar
                    </Button>
                
                  <Button
                    variant="secondary"
                    onClick={() => this.modalInsertar()}
                  >
                    Cancelar
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

export default AsignarPropuesta;
