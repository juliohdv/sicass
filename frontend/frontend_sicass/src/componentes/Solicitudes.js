import React, { Component, forwardRef } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import { Tooltip } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import {Button} from "react-bootstrap";

const columns = [
  {
    name: "codigo_solicitud",
    label: "Codigo",
  },
  {
    name: "entidad_externa",
    label: "Entidad que solicita",
  },
  {
    name: "tipo_entidad",
    label: "Tipo de entidad",
  },
  {
    name: "carrera",
    label: "carrera",
  },
  {
    name: "tipo_servicio_social",
    label: "Tipo de Servicio Social",
  },
  {
    name: "fecha_inicio_solicitud",
    label: "Fecha de Solicitud",
  },
  {
    name: "fecha_fin_solicitud",
    label: "Fecha de Finalización",
  },
  {
    name: "estado_solicitud",
    label: "Estado",
  },
  {
    name: "acciones",
    label: "Acciónes",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
            <Tooltip title="Ver proyecto">
              <Button
                size="sm"
                variant="outline-info"
                /* onClick={() => {
                  this.seleccionPrivilegio(tableMeta.rowData);
                  this.modalInsertar();
                }} */
              >
                <Visibility/>
              </Button>
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

const url = "http://127.0.0.1:8000/login/solicitudes/";
//Clase principal del componente
class Solicitudes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitudes: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/login/solicitudes/")
      .then((response) => {
        const arreglo_inicial =  response.data //Guardamos el arreglo inicial para su reescritura
        const solicitud = new Array() //Arreglo donde guardaremos los objetos reescritos
        for(var i =0; i<arreglo_inicial.length; i++){  //Recorremos el arreglo inicial
          solicitud[i] = //Asignamos los campos del arrelgo inicial a los del nuevo objeto
            {'codigo_solicitud': arreglo_inicial[i].codigo_solicitud ,
            'entidad_externa':arreglo_inicial[i].entidad_externa.nombre_entidad,
            'tipo_entidad':arreglo_inicial[i].entidad_externa.clasificacion_entidad,
            'carrera': arreglo_inicial[i].carrera.nombre_carrera,
            'tipo_servicio_social':arreglo_inicial[i].tipo_servicio_social.nombre_tipo_servicio_social,
            'fecha_inicio_solicitud':arreglo_inicial[i].fecha_inicio_solicitud,
            'fecha_fin_solicitud':arreglo_inicial[i].fecha_fin_solicitud,
            'estado_solicitud':arreglo_inicial[i].estado_solicitud}
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
    //Retorna todo la interfas respectiva para la gestion de roles y privilegios
    const { form } = this.state;
    return (
      <Dashboard
        contenedor={
          <div className="pt-5">
            <MUIDataTable
              title={"Solicitudes de servicios"}
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

export default Solicitudes;
