import React, { Component } from 'react'
import Dashboard from '../Dashboard'
import MUIDataTable from 'mui-datatables'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Tooltip } from '@material-ui/core'
import { Button, Form, OverlayTrigger} from "react-bootstrap"
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { ModalHeader } from 'reactstrap'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core'
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
const url = "https://juliohdv.pythonanywhere.com/login/encargadoEscuela/"
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
        noMatch: "No hay registros de encargados",
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

class AsignarEE extends Component{
    constructor(props){
        super(props)
        this.state = {
            listaDocentes: [],
            listaEncargados: [],
            escuelas:[],
            modalInsertar:false,
            modalEliminar:false,
            form: {
                codigo_encargado:"",
                estado: "",
                docente_encargado:"",
                nombre_docente_encargado:"",
                escuela: "",
                nombre_escuela:"",
                user:"",
                password:"",
                nombre_usuario:"",
            },
        }
    }
    peticionPost = async () =>{
        await axios
        .post("https://juliohdv.pythonanywhere.com/login/crearUsuario/", {
          username: this.state.form.user,
          password: this.state.form.password,
          tipo_usuario: 3
        })
        .then((response)=>{
            axios
            .get("https://juliohdv.pythonanywhere.com/login/ultimoUsuario/")
            .then((response) =>{
                axios
                .post(url, {
                    codigo_encargado : this.state.form.codigo_encargado,
                    estado: true,
                    docente_encargado: this.state.form.docente_encargado,
                    escuela: this.state.form.escuela,
                    user: response.data.map((elemento) => elemento.id).toString()
                })
                .then((response) =>{
                    this.modalInsertar();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Se a guardado con exito",
                        showConfirmButton: false,
                        timer: 2500,
                    })
                    this.componentDidMount();
                })
                .catch((error) =>{
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Ocurrio un error en la asignación!",
                        showConfirmButton: false,
                        timer: 2500,
                      })
                })
            })
        })
    }
    peticionPut = () => {
        axios
          .put(url + this.state.form.codigo_encargado + "/", this.state.form)
          .then((response) => {
            this.modalInsertar();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Se a actualizado con exito",
              showConfirmButton: false,
              timer: 2500,
            });
            this.componentDidMount();
          })
          .catch((error) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Ocurrio un error en actualizar el encargado",
              showConfirmButton: false,
              timer: 2500,
            });
          });
      };
      peticionDelete = () => {
        axios
          .delete(url + this.state.form.codigo_encargado)
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
      seleccionEncargado = (encargado) => {
        this.setState({
          tipoModal: "actualizar",
          form: {
              codigo_encargado: encargado[0],
              docente_encargado: encargado[1],
              nombre_docente_encargado: encargado[2],
              escuela: encargado[3],
              nombre_escuela: encargado[4],
              user: encargado[5],
              nombre_usuario:[6],
              estado : encargado[7],
          },
        });
      };
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
    componentDidMount(){
        let nombre_usuario = leerCookie("usuario")
            axios
            .get('https://juliohdv.pythonanywhere.com/login/encargadosEscuelaPorFacultad/',{
            params: {
                user: nombre_usuario,
            },
            })  
            .then((response) => {
                const arreglo_inicial = response.data; //Guardamos el arreglo inicial para su reescritura
                const encargados = []; //Arreglo donde guardaremos los objetos reescritos
                for (var i = 0; i < arreglo_inicial.length; i++) {
                //Recorremos el arreglo inicial
                encargados[i] =
                    //Asignamos los campos del arrelgo inicial a los del nuevo objeto
                    {
                    codigo_encargado: arreglo_inicial[i].codigo_encargado,
                    docente_encargado: arreglo_inicial[i].docente_encargado,
                    nombre_docente_encargado: arreglo_inicial[i].docente_detalle.nombres_docente,
                    nombre_usuario:arreglo_inicial[i].usuario_detalle.username,
                    user:arreglo_inicial[i].user,
                    estado_detalle: !arreglo_inicial[i].estado ? "Sin Asignar" : "Asignado" ,
                    estado: !arreglo_inicial[i].estado,
                    escuela:arreglo_inicial[i].docente_detalle.escuela,
                    escuela_detalle:arreglo_inicial[i].docente_detalle.escuela_detalle.nombre_escuela,
                    };
                }
                this.setState({listaEncargados: encargados})
            })
            .catch((error) =>{
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Por el momento no hay conexión con la base de datos, intente en otro momento",
                })
            })
            axios
            .get("https://juliohdv.pythonanywhere.com/login/docentes/")
            .then((response) => {
                this.setState({listaDocentes: response.data})
            })
            .catch((error) =>{
            })
    }
    render(){
        const {form} = this.state
        const columns = [
            {
                name: "codigo_encargado",
                label: "Código",
                options: {
                    display: false,
                },
            },
            {
                name: "docente_encargado",
                label: "IDDocente",
            },
            {
                name: "nombre_docente_encargado",
                label: "Docente",
            },
            {
                name: "escuela",
                label: "IDEscuela",
            },
            {
                name: "escuela_detalle",
                label: "Escuela Asignada",
            },
            {
                name: "user",
                label: "IDUsuario",
            },
            {
                name: "nombre_usuario",
                label: "Usuario",
            },
            {
                name: "estado_detalle",
                label: "Estado",
            },
            {
                name: "acciones",
                label: "Acciones",
                options: {
                    customBodyRender:  (value, tableMeta, updateValue) =>{
                        return(
                            <>
                                <span>
                                <Tooltip title="Eliminar">
                                    <Button
                                    size="sm"
                                    variant="outline-primary"
                                    onClick={() => {
                                        this.seleccionEncargado(tableMeta.rowData)
                                        this.setState({modalEliminar: true})
                                    }}
                                    >
                                        <Delete></Delete>
                                    </Button>
                                </Tooltip>
                                </span>
                            </>
                        )
                    }
                }
            }
        ]
        return(
            <Dashboard 
                contenedor = {
                    <div className="pt-4">
                        <div>
                            {
                                <Button
                                variant="success"
                                onClick={()=>{
                                    this.setState({form: null, tipoModal:"insertar"})
                                    this.modalInsertar();
                                    axios 
                                        .get('https://juliohdv.pythonanywhere.com/login/escuelasPorEncargadoFacultad/',{
                                        params:{user: leerCookie('usuario')}
                                        })
                                        .then((response) =>{
                                        this.setState({escuelas: response.data})
                                        })
                                }}>
                                    Asignar Nuevo
                                </Button>
                            }
                        </div>
                        <div>
                            <div className="pt-3">
                                    <MUIDataTable
                                    title={"Encargados de Escuelas"}
                                    data = {this.state.listaEncargados}
                                    columns={columns}
                                    options={options}
                                    /> 
                                    
                            </div>
                        </div>
                        <Modal isOpen={this.state.modalInsertar} centered className="pt-5">
                            <ModalHeader style={{display:"block"}}>
                                {this.state.tipoModal === "insertar" ? (<span>Asignar nuevo encargado</span>) : (<span>Actualizar encargado</span>)}
                            </ModalHeader>
                            <ModalBody>
                                <Form.Group>
                                    <Form.Label>Código</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="codigo_encargado"
                                        name="codigo_encargado"
                                        readOnly
                                        value={form ? form.codigo_encargado : this.state.listaEncargados.length+1}
                                        required
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>¿Asignado? </Form.Label>
                                    <Form.Check
                                        id="estado"
                                        name="estado"
                                        value={form ? form.estado : false}
                                        checked={form ? form.estado : false}
                                        onChange={this.handleChangeCheck}
                                        inline
                                        />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Docente</Form.Label>
                                    <Form.Control
                                    as="select"
                                    id="docente_encargado"
                                    name="docente_encargado"
                                    required={true}
                                    value={form ? form.docente_encargado : ""}
                                    onChange={this.handleChange}
                                >
                                    <option value="" disabled={true}>
                                    Seleccione..
                                    </option>
                                    {this.state.listaDocentes.map((elemento) =>(
                                    <option key={elemento.codigo_docente} value={elemento.codigo_docente}>
                                        {elemento.nombres_docente + " " + elemento.apellidos_docente}
                                    </option>
                                    ))}
                                </Form.Control>
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
                                <Form.Group>
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control
                                        type="text"
                                        id="user"
                                        name="user"
                                        required
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="**********"
                                        id="password"
                                        name="password"
                                        autoComplete="off"
                                        required={true}
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
                                    ):(
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
                                <span>Eliminar docente</span>
                            </ModalHeader>
                            <ModalBody>
                                ¿Esta seguro de eliminar el encargado seleccionado?
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
export default AsignarEE
