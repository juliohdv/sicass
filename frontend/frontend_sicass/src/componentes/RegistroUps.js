import React, { Component } from "react";
import { Form, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
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
const url = "http://127.0.0.1:8000/login/registroUps/";

//Clase principal del componente, para el registro de los estudiantes
class RegistroUps extends Component {
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
            .post(url, {
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
            <Form.Row>
              <Form.Group as={Col} className="pl-5 pr-5">
                <Form.Label>Enlace de la carpeta creada en Drive</Form.Label>
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
          </Form>
        )}
      </Formik>
    );
  }
}

export default RegistroUps;
