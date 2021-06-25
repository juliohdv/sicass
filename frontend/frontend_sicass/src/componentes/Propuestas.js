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
    field: "codigo_propuesta",
  },
  {
    title: "Entidad que solicita",
    field: "entidad_externa",
  },
  {
    title: "Carrera",
    field: "carrera",
  },
  {
    title: "Fecha de Solicitud",
    field: "fecha_inicio_propuesta",
  },
  {
    title: "Fecha de Finalización",
    field: "fecha_fin_propuesta",
  },
  {
    title: "Estado",
    field: "estado_propuesta",
  },
  {
    title: "Tipo de Servicio Social",
    field: "tipo_servicio_social",
  },
  {
    title: "Descripción propuesta",
    field: "descripcion_propuesta",
  },
];

const url = "https://127.0.0.1:8000/login/propuestas/";
//Clase principal del componente
class Propuestas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitudes: [],
      form: {
        codigo_propuesta: "",
        entidad_externa: "",
        carrera: "",
        fecha_inicio_propuesta: "",
        fecha_fin_propuesta: "",
        estado_propuesta:"",
        tipo_servicio_social:"",
        descripcion_propuesta: "",
      },
    };
  }
  seleccionSolicitud = (solicitud) => {
    console.log(solicitud);

    this.setState({
      carrera_id:"",
      form: {
        codigo_propuesta: solicitud.codigo_propuesta,
        entidad_externa: solicitud.entidad_externa,
        carrera: solicitud.carrera,
        fecha_inicio_propuesta: solicitud.fecha_inicio_propuesta,
        fecha_fin_propuesta: solicitud.fecha_fin_propuesta,
        estado_propuesta: solicitud.estado_propuesta,
        tipo_servicio_social: solicitud.tipo_servicio_social,
        descripcion_propuesta: solicitud.descripcion_propuesta,
      },
    });
  };
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
      .get("https://127.0.0.1:8000/login/propuestas/")
      .then((response) => {
        this.setState({ solicitudes: response.data });
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
                  title="Propuestas de Servicio Social"
                  options={{
                    actionsColumnIndex: -1,
                  }}
                  actions={[
                    {
                      icon: Visibility,
                      tooltip: "Ver datos del proyecto",
                      onClick: (event, rowData) => {
                        this.seleccionSolicitud(rowData);
                        alert("Selecionada" + rowData)
                      },
                    },
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

export default Propuestas;