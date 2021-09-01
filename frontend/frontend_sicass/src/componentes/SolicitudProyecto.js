import React, { Component } from "react";
import Dashboard from "./Dashboard";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Swal from "sweetalert2";

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

//Constante con las columnas de la tabla
const columns = [
  {
    name: "codigo_solicitud_servicio",
    label: "Codigo",
    key: "codigo_solicitud_servicio",
    options: {
      display: false,
    }
  },
  {
    name: "estado_solicitud",
    label: "Estado",
    key: "estado_solicitud",
  },
  {
    name: "observaciones",
    label: "Observaciones",
    key: "observaciones",
  },
  {
    name: "entidad",
    label: "Entidad",
    key: "entidad",
  },
  {
    name: "tipo_servicio_social",
    label: "Tipo servicio",
    key: "tipo_servicio_social",
  },
  {
    name: "descripcion",
    label: "Descripción",
    key: "descripcion",
  },
];

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
const url = "http://127.0.0.1:8000/login/solicitudServicioEstudiante/";

//Clase principal del componente
class SolicitudProyecto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitudes: [],
    };
  }
  //Metodo que hace la peticion de consulta a la BD mediante api
  componentDidMount() {
    let nombre_usuario = leerCookie("usuario"); //Se obtiene el usuario logeado
    axios
      .get(url, {
        params: {
          estudiante: nombre_usuario,
        },
      })
      .then((response) => {
        const arreglo_inicial = response.data;
        const solicitud = [];
        for (var i = 0; i < arreglo_inicial.length; i++) {
          solicitud[i] = 
          {
            codigo_solicitud_servicio: arreglo_inicial[i].codigo_solicitud_servicio,
            estado_solicitud: arreglo_inicial[i].estado_solicitud,
            observaciones: arreglo_inicial[i].observaciones,
            entidad: arreglo_inicial[i].servicio_social_detalle.entidad,
            tipo_servicio_social: arreglo_inicial[i].servicio_social_detalle.tipo_servicio_social_detalle.nombre_tipo_servicio_social,
            descripcion: arreglo_inicial[i].servicio_social_detalle.descripcion,
          };
        }
        this.setState({ solicitudes: solicitud });
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
      /* Filtrar por usuario iniciado, los estdos de solicitud respectivos */
      <Dashboard
        contenedor={
          <div className="pt-5">
            {/* Se invoca la tabla, con los datos correspondientes */}
            <MUIDataTable
              title={"Estado solicitud de proyecto"}
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

export default SolicitudProyecto;