import React, { Component } from "react";
import Dashboard from "./Dashboard";
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
const url = "http://127.0.0.1:8000/login/propuestas/";
//Clase principal del componente
class Propuestas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitudes: [],
    };
  }
  componentDidMount() {
    axios
      .get(url)
      .then((response) => {
        const arreglo_inicial = response.data; //Guardamos el arreglo inicial para su reescritura
        const solicitud = []; //Arreglo donde guardaremos los objetos reescritos
        for (var i = 0; i < arreglo_inicial.length; i++) {
          //Recorremos el arreglo inicial
          solicitud[i] =
            //Asignamos los campos del arrelgo inicial a los del nuevo objeto
            {
              codigo_propuesta: arreglo_inicial[i].codigo_propuesta,
              entidad_externa:
                arreglo_inicial[i].entidad_externa_detalle.nombre_entidad,
              tipo_entidad:
                arreglo_inicial[i].entidad_externa_detalle
                  .clasificacion_entidad,
              carrera: arreglo_inicial[i].carrera_detalle.nombre_carrera,
              tipo_servicio_social:
                arreglo_inicial[i].tipo_servicio_social_detalle
                  .nombre_tipo_servicio_social,
              fecha_inicio_propuesta: arreglo_inicial[i].fecha_inicio_propuesta,
              fecha_fin_propuesta: arreglo_inicial[i].fecha_fin_propuesta,
              descripcion_propuesta: arreglo_inicial[i].descripcion_propuesta,
              estado_propuesta: arreglo_inicial[i].estado_propuesta,
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
        name: "codigo_propuesta",
        label: "Código",
        key: "codigo_propuesta",
      },
      {
        name: "entidad_externa",
        label: "Entidad que solicita",
        key: "entidad_externa",
      },
      {
        name: "tipo_entidad",
        label: "Tipo de entidad",
        key: "tipo_entidad",
      },
      {
        name: "carrera",
        label: "Carrera",
        key: "carrera",
      },
      {
        name: "tipo_servicio_social",
        label: "Tipo de Servicio Social",
        key: "tipo_servicio_social",
      },
      {
        name: "fecha_inicio_propuesta",
        label: "Fecha de Solicitud",
        key: "fecha_inicio_propuesta",
      },
      {
        name: "fecha_fin_propuesta",
        label: "Fecha de Finalización",
        key: "fecha_fin_propuesta",
      },
      {
        name: "descripcion_propuesta",
        label: "Descripción propuesta",
        key: "descripcion_propuesta",
      },
      {
        name: "estado_propuesta",
        label: "Estado",
        key: "estado_propuesta",
      },
      {
        name: "acciones",
        label: "Acciónes",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            if (tableMeta.rowData[8] === "Aprobado") {
              return (
                /* Boton para redirigir hacia el proyecto que le corresponde a la propuesta */
                <Tooltip title="Ver proyecto">
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
              title={"Solicitudes de propuestas"}
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

export default Propuestas;
