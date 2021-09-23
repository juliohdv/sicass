import React, { Component } from "react";
import Dashboard from "./Dashboard";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Swal from "sweetalert2";
import { Tooltip } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import { Button, Form } from "react-bootstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";


//Funcion para obtener el nombre del usuario
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
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20],
    tableBodyHeight: "320px",
    textLabels: {
        body: {
            noMatch: "No hay registros de solicitudes",
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
const url = "https://juliohdv.pythonanywhere.com/login/solicitudUpsPorEncargadoDeEscuela/";

//Clase principal del componente
class SolicitudInscripcionUPS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            solicitudes: [],
            solicitudUPS: [],
            form: {
                codigo_solicitud_ups: "",
                observaciones: "",
                enlace: "",
                estudiante: "",
                estado_solicitud: "",
            },
            modalConfirmar: false,
        };

    }

    //Metodo en que realiza la peticion para actualizar los datos a la BD mediante la api
    peticionPut = () => {
        console.log(this.state.form);
        axios
            .put(url + this.state.form.codigo_solicitud_ups + "/", this.state.form)
            .then((response) => {
                this.setState({ modalConfirmar: false });
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
                console.log(error);
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Ocurrio un error en actualizar",
                    showConfirmButton: false,
                    timer: 2500,
                });
            });
    };

    //Metodo que va guardado el estado_solicitud de lo que digita el usuario en el formulario
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
    seleccionSolicitud = (solicitudes) => {
        this.setState({
            form: {
                codigo_solicitud_ups: solicitudes[0],
                observaciones: solicitudes[1],
                enlace: solicitudes[2],
                estudiante: solicitudes[3],
                estado_solicitud: solicitudes[4],
            },
        });
    };

    //Metodo que hace la peticion de consulta a la BD mediante api
    componentDidMount() {
        let nombre_usuario = leerCookie("usuario"); //Se obtiene el usuario logeado
        console.log(nombre_usuario);
        axios
            .get(url,{
                params :{user:nombre_usuario}
            })
            .then((response) => {
                this.setState({ solicitudes: response.data });
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

        const { form } = this.state;

        //Constante con las columnas de la tabla
        const columns = [
            {
                name: "codigo_solicitud_ups",
                label: "Código",
                key: "codigo_solicitud_ups",
                options: {
                    display: false,
                }
            },
            {
                name: "observaciones",
                label: "Observaciones",
                key: "observaciones",
            },
            {
                name: "enlace",
                label: "Enlace",
                key: "enlace",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <a href={value} target="_blank" rel="noreferrer">Google Drive</a>
                        );
                    },
                },
            },
            {
                name: "estudiante",
                label: "Estudiante",
                key: "estudiante",
            },
            {
                name: "estado_solicitud",
                label: "Estado",
                key: "estado_solicitud",

            },
            {
                name: "acciones",
                label: "Acciones",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        
                        return (
                            /* Boton para redirigir hacia el proyecto que le corresponde a la propuesta */
                            <Tooltip title="Ver proyecto">
                                <Button
                                    size="sm"
                                    variant="outline-info"
                                    onClick={() => {
                                        this.seleccionSolicitud(tableMeta.rowData);
                                        this.setState({ modalConfirmar: true });
                                    }}
                                >
                                    <Visibility />
                                </Button>
                            </Tooltip>
                        );
                        //}
                    },
                },
            },
        ];
        return (
            /* Filtrar por el usuario, los respectivos estado_solicitud de solicitud */
            <Dashboard
                contenedor={
                    <div className="pt-5">
                        {/* Se invoca la tabla, con los datos correspondientes */}
                        <MUIDataTable
                            title={"Registro a la Unidad de Proyección Social"}
                            data={this.state.solicitudes}
                            columns={columns}
                            options={options}
                        />

                        {/* Modal para confirmar */}
                        <Modal isOpen={this.state.modalConfirmar} centered>
                            <ModalHeader style={{ display: "block" }}>
                                <span>Revisión Solicitud</span>
                            </ModalHeader>
                            <ModalBody>
                                <Form.Group>
                                    <Form.Label>
                                        Observaciones
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="observaciones"
                                        name="observaciones"
                                        required={true}
                                        autoComplete="off"
                                        value={form ? form.observaciones : ""}
                                        onChange={this.handleChange}
                                    >
                                    </Form.Control>
                                </Form.Group>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="primary" onClick={() => {
                                    //this.setState({estado_solicitud:"Aprobado"});
                                    this.state.form.estado_solicitud = "Aprobado"

                                    this.peticionPut();
                                }} >
                                    Aprobar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        this.state.form.estado_solicitud = "Rechazado"
                                        this.peticionPut();
                                    }}>
                                    Rechazar
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => this.setState({ modalConfirmar: false })}
                                >
                                    Cancelar
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                }
            />
        );
    }
}

export default SolicitudInscripcionUPS;
