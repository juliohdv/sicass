import React, { Component } from "react";
import Dashboard from "../layout/Dashboard";
import axios from "axios";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import { Tooltip } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import { Button } from "react-bootstrap";

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
const url = "http://127.0.0.1:8000/login/solicitudUpsVista";
//Clase principal del componente
class SolicitudesEstudiantes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitudes: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/login/solicitudUpsVista")
      .then((response) => {
        const arreglo_inicial = response.data; //Guardamos el arreglo inicial para su reescritura
        const solicitud = []; //Arreglo donde guardaremos los objetos reescritos
        for (var i = 0; i < arreglo_inicial.length; i++) {
          //Recorremos el arreglo inicial
          solicitud[i] =
            //Asignamos los campos del arrelgo inicial a los del nuevo objeto
            {
              codigo_solicitud_ups: arreglo_inicial[i].codigo_solicitud_ups,
              enlace: arreglo_inicial[i].enlace,
              observaciones:arreglo_inicial[i].observaciones,
              estado_solicitud: arreglo_inicial[i].estado_solicitud,
              estudiante:arreglo_inicial[i].estudiante,
            };
        }
        this.setState({ solicitudes: solicitud }); //Asignamos el nuevo arreglo reescrito al del estado
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
    //Constante con las columnas de la tabla
    const columns = [
      {
        name: "codigo_solicitud_ups",
        label: "Codigo",
        key: "codigo_solicitud_ups",
      },
      {
        name: "enlace",
        label: "Enlace",
        key: "enlace",
      },
      {
        name: "observaciones",
        label: "Observaciones",
        key: "observaciones",
      },
      {
        name: "estado_solicitud",
        label: "Estado de Solcitud",
        key: "estado_solicitud",
      },
      {
        name: "estudiante",
        label: "Estudiante",
        key: "estudiante",
      },
      {
        name: "acciones",
        label: "Acciónes",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            if (tableMeta.rowData[7] === "Aprobado") {
              return (
                /* Boton para redirigir hacia la solcitud */
                <Tooltip title="Ver solicitud">
                  <Button
                    size="sm"
                    variant="outline-info"
                    /* onClick={() => {
                    this.seleccionPrivilegio(tableMeta.rowData);
                    this.modalInsertar();
                  }} */
                  >
                    <Visibility />
                  </Button>
                </Tooltip>
              );
            }
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
              title={"Solicitudes de Registros a UPS"}
              data={this.state.solicitudes}
              columns={columns}
              options={options}
            />
          </div>
        }
      />
    );
  }
}

export default SolicitudesEstudiantes;
