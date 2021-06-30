import React, { Component, forwardRef } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";
import MaterialTable from "material-table";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Search from "@material-ui/icons/Search";
import Visibility from "@material-ui/icons/Visibility";

const tableIcons = {
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
};

const COLUMNAS = [
  {
    title: "Codigo",
    field: "codigo_solicitud",
  },
  {
    title: "Entidad que solicita",
    field: "entidad_externa",
  },
  {
    title: "Tipo de entidad",
    field: "tipo_entidad",
  },
  {
    title: "Carrera",
    field: "carrera",
  },
  {
    title: "Fecha de Solicitud",
    field: "fecha_inicio_solicitud",
  },
  {
    title: "Fecha de Finalización",
    field: "fecha_fin_solicitud",
  },
  {
    title: "Estado",
    field: "estado_solicitud",
  },
  {
    title: "Tipo de Servicio Social",
    field: "tipo_servicio_social",
  },
];

const url = "http://127.0.0.1:8000/login/solicitudes/";
//Clase principal del componente
class Solicitudes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitudes: [],
      form: {
        codigo_solicitud: "",
        entidad_externa: "",
        tipo_entidad:"",
        carrera: "",
        fecha_inicio_solicitud: "",
        fecha_fin_solicitud: "",
        estado_solicitud:"",
        tipo_servicio_social:"",
      },
    };
  }

  
  /* seleccionSolicitud = (solicitud) => {
    console.log(solicitud);

    this.setState({
      carrera_id:"",
      form: {
        codigo_solicitud: solicitud.codigo_solicitud,
        entidad_externa: solicitud.entidad_externa,
        tipo_entidad: "",
        carrera: solicitud.carrera,
        fecha_inicio_solicitud: solicitud.fecha_inicio_solicitud,
        fecha_fin_solicitud: solicitud.fecha_fin_solicitud,
        estado_solicitud: solicitud.estado_solicitud,
        tipo_servicio_social: solicitud.tipo_servicio_social,
      },
    });
  }; */
 /*  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  }; */
  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };
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
        console.log(error);
      });
  }
  render() {
    //Retorna todo la interfas respectiva para la gestion de roles y privilegios
    const { form } = this.state;
    return (
      <Dashboard
        contenedor={
          <div className="pt-4">
            <div>
              <div className="pt-3">
                <MaterialTable
                  icons={tableIcons}
                  columns={COLUMNAS}
                  data={this.state.solicitudes}
                  title="Solicitudes de Servicio Social"
                  options={{
                    actionsColumnIndex: -1,
                  }}
                  actions={[
                    
                  ]}
                  localization={{
                    header: {
                      actions: "Acciones",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        }
      />
    );
  }
}

export default Solicitudes;
