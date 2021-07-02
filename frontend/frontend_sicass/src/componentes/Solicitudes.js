import React, { Component } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";
import MUIDataTable from "mui-datatables"


const columnas = [
  {
    label: "Codigo",
    name: "codigo_solicitud",
    key: "codigo_solicitud",
  },
  {
    label: "Entidad que solicita",
    name: "entidad_externa",
    key: "entidad_externa",
  },
  {
    label: "Tipo de entidad",
    name: "tipo_entidad",
    key: "tipo_entidad",
  },
  {
    label: "Carrera",
    name: "carrera",
    key: "carrera",
  },
  {
    label: "Fecha de Solicitud",
    name: "fecha_inicio_solicitud",
    key: "fecha_inicio_solicitud",
  },
  {
    label: "Fecha de Finalización",
    name: "fecha_fin_solicitud",
    key: "fecha_fin_solicitud",
  },
  {
    label: "Estado",
    name: "estado_solicitud",
    key: "estado_solicitud",
  },
  {
    title: "Tipo de Servicio Social",
    name: "tipo_servicio_social",
    key: "tipo_servicio_social",
  },
];

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
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/login/solicitudes/")
      .then((response) => {
        const arreglo_inicial =  response.data //Guardamos el arreglo inicial para su reescritura
        const solicitud = [] //Arreglo donde guardaremos los objetos reescritos
        for(var i =0; i<arreglo_inicial.length; i++){  //Recorremos el arreglo inicial
          solicitud[i] = //Asignamos los campos del arrelgo inicial a los del nuevo objeto
            {'codigo_solicitud': arreglo_inicial[i].codigo_solicitud ,
            'entidad_externa':arreglo_inicial[i].entidad_externa_detalle.nombre_entidad,
            'tipo_entidad':arreglo_inicial[i].entidad_externa_detalle.clasificacion_entidad,
            'carrera': arreglo_inicial[i].carrera_detalle.nombre_carrera,
            'tipo_servicio_social':arreglo_inicial[i].tipo_servicio_social_detalle.nombre_tipo_servicio_social,
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

    return (
      <Dashboard
        contenedor={
          <div className="pt-4">
            <div>
              <div className="pt-3">
                <MUIDataTable 
                  title={"Solicitudes de Servicio Social"}
                  columns={columnas}
                  data={this.state.solicitudes}
                  tableLayout="auto"
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
