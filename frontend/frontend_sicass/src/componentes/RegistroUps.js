import React, { Component } from "react";
import { Form, Col, Tooltip, OverlayTrigger, Alert } from "react-bootstrap";
import Botones from "./BotonesRegistro";
import axios from "axios";
import Swal from "sweetalert2";
import { Formik } from "formik";

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

//Constannte que contiene la url de conexion con la api de rest
const url = "http://127.0.0.1:8000/login/registroUpsEstudiante/";

//Clase principal del componente, para el registro de los estudiantes
class RegistroUps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitudes: [],
      solicitudEstudiante: [],
      ultimoEstado: "",
      longitud: 0,
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
        for (var i = 0; i < response.data.length; i++) {
          this.setState({ ultimoEstado: response.data[i].estado_solicitud });
        }
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
      <Formik
        initialValues={{
          enlace: "",
          observaciones: "Ninguna",
          estado: "En Proceso",
          estudiante: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          let nombre_usuario = leerCookie("usuario");
          axios
            .post("http://127.0.0.1:8000/login/registroUps/", {
              enlace: values.enlace,
              observaciones: values.observaciones,
              estado: values.estado,
              estudiante: nombre_usuario,
            })
            .then((response) => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Se a guardado con exito",
                showConfirmButton: false,
                timer: 2500,
              });
              resetForm({});
              this.componentDidMount();
            })
            .catch((error) => {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Ocurrio un error en el registro en la UPS",
                showConfirmButton: false,
                timer: 2500,
              });
            });
        }}
      >
        {({ values, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            {this.state.ultimoEstado === "En Proceso" ||
            this.state.ultimoEstado === "Aprobada" ? (
              <Alert variant="success">
                <Alert.Heading>Aviso</Alert.Heading>
                <hr />
                <p className="mb-0">
                  <ul>
                    <li>
                      Solo se puede realizar una solicitud de registro a la UPS,
                      por favor espere a la respuesta de dicha solicitud.
                    </li>
                    <li>
                      Puede consultar el estado la solicitud en la opcion de
                      "Consultar Registro".
                    </li>
                    <li>
                      Si su solicitud es "Rechazada", debe realizar otra
                      solicitud, cuando haya solventado toda las observaciones
                      que se le realizaron.
                    </li>
                    <li>
                      Si su solicitud es "Aprobada", se habilitaran las opciones
                      para que pueda solicitar un servicio social.
                    </li>
                  </ul>
                </p>
              </Alert>
            ) : (
              <>
                <Form.Row>
                  <Form.Group as={Col} className="pl-5 pr-5">
                    <Form.Label>
                      Enlace de la carpeta creada en Drive
                    </Form.Label>
                    <OverlayTrigger
                      overlay={
                        <Tooltip>
                          Pegue el enlace obtenido en los pasos anteriores
                        </Tooltip>
                      }
                    >
                      <Form.Control
                        type="text"
                        id="enlace"
                        autoComplete="off"
                        pattern="(https:[/][/]drive[.]google[.]com[/]drive[/]folders[/])(.+)"
                        placeholder="https://drive.google.com/drive/folders/..."
                        required={true}
                        value={values.enlace}
                        onChange={handleChange}
                      />
                    </OverlayTrigger>
                  </Form.Group>
                </Form.Row>
                <Botones />
              </>
            )}
          </Form>
        )}
      </Formik>
    );
  }
}

export default RegistroUps;
