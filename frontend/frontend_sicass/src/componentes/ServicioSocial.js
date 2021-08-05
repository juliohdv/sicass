import React, { Component } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import { Tooltip } from "@material-ui/core";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { Button } from "react-bootstrap";

//Constante con las columnas de la tabla
const columns = [
  {
    name: "codigo_servicio_social",
    label: "Código",
    key: "codigo_servicio_social",
  },
  {
    name: "nombre_servicio",
    label: "Nombre servicio",
    key: "nombre_servicio",
  },
  {
    name: "descripcion",
    label: "Descripción",
    key: "descripcion",
  },
  {
    name: "cantidad_estudiantes",
    label: "Cantidad de cupos",
    key: "cantidad_estudiantes",
  },
  {
    name: "cantidad_horas",
    label: "Horas totales",
    key: "cantidad_horas",
  },
  {
    name: "entidad",
    label: "Nombre entidad",
    key: "entidad",
  },
  {
    name: "acciones",
    label: "Acciónes",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          /* Boton para redirigir hacia el proyecto que le corresponde a la propuesta */
          <Tooltip title="Solicitar servicio social">
            <Button
              size="sm"
              variant="outline-primary"
              /* onClick={() => {
                  this.seleccionPrivilegio(tableMeta.rowData);
                  this.modalInsertar();
                }} */
            >
              <PostAddIcon />
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
const url = "http://127.0.0.1:8000/login/servicioSocial/";
//Clase principal del componente
class Propuestas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicio: [],
    };
  }
  componentDidMount() {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        const arreglo_inicial = response.data; //Guardamos el arreglo inicial para su reescritura
        const servicios = []; //Arreglo donde guardaremos los objetos reescritos
        for (var i = 0; i < arreglo_inicial.length; i++) {
          /*if(arreglo_inicial[i].Propuestas != null){
                arreglo_inicial[i].entidad = arreglo_inicial[i].Propuestas.entidad_externa_detalle.nombre_entidad;
            }else if (arreglo_inicial[i].Solicitud != null){
                arreglo_inicial[i].entidad = arreglo_inicial[i].Solicitud.entidad_externa_detalle.nombre_entidad;
            }*/
          //Recorremos el arreglo inicial
          servicios[i] =
            //Asignamos los campos del arrelgo inicial a los del nuevo objeto
            {
              codigo_servicio_social: arreglo_inicial[i].codigo_servicio_social,
              cantidad_estudiantes: arreglo_inicial[i].cantidad_estudiantes,
              cantidad_horas: arreglo_inicial[i].cantidad_horas,
              entidad: arreglo_inicial[i].entidad,
              descripcion: arreglo_inicial[i].descripcion,
              propuesta: arreglo_inicial[i].propuesta_detalle,
              solicitud: arreglo_inicial[i].solicitud_detalle,
              nombre_servicio:
                arreglo_inicial[i].tipo_servicio_social_detalle
                  .nombre_tipo_servicio_social,
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
    return (
      /* Obtener el id del usuario, asi obtener su carnet, enviar los datos 
      a la tabla de solicitud servicio (hacer backend), disminuir la cantidad de cupos
      disponibles, solo servicios disponibles y aprobados*/
      <Dashboard
        contenedor={
          <div className="pt-5">
            {/* Se invoca la tabla, con los datos correspondientes */}
            <MUIDataTable
              title={"Servicios sociales disponibles"}
              data={this.state.servicio}
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
