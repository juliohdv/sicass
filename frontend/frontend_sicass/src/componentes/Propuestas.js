import React, { Component } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import { Tooltip } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";

//Constante con las columnas de la tabla
const columns = [
  {
    name: "codigo_propuesta",
    label: "Código",
  },
  {
    name: "entidad_externa",
    label: "Entidad que solicita",
  },
  {
    name: "carrera",
    label: "Carrera",
  },
  {
    name: "tipo_servicio_social",
    label: "Tipo de Servicio Social",
  },
  {
    name: "fecha_fin_propuesta",
    label: "Fecha de Finalización",
  },
  {
    name: "fecha_inicio_propuesta",
    label: "Fecha de Solicitud",
  },
  {
    name: "descripcion_propuesta",
    label: "Descripción propuesta",
  },
  {
    name: "estado_propuestaEstado",
    label: "Estado",
  },
  {
    name: "proyecto",
    label: "Acciones",
    options: {
      customBodyRender: () => {
        return (
          <Tooltip title="Ver proyecto">
            <a className="btn" href="/">
              <Visibility>Ver proyecto</Visibility> {/* Aqui debe redirigir a los detalles del proyecto */}
            </a>
          </Tooltip>
        );
      },
    },
  },
];

//Constante con las opciones de la tabla
const options = {
  download: "false",
  print: "false",
  responsive: "simple",
  selectableRows: false,
  actionsColumnIndex: -1,
  textLabels: {
    body: {
      noMatch: "No hay registros de solicitudes de propuestas",
      toolTip: "Sort",
      columnHeaderTooltip: (column) => `Sort for ${column.label}`,
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
    return (
      <Dashboard
        contenedor={
          <div className="pt-5">
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
