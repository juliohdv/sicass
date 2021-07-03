import React, { Component } from "react";
import { Col, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import Botones from "./BotonesRegistro";
import axios from "axios";
import { Formik } from "formik";
import Swal from "sweetalert2";

//Clase principal del componente, para el registro de los estudiantes
class Registro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facultades: [],
      carreras: [],
      facultadSeleccionada: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  //Funcion para la obtener las carreras, dependiendo de la seleccion de la facultad
  handleChange(event) {
    this.setState({ facultadSeleccionada: event.target.value });
    axios
      .get("http://127.0.0.1:8000/login/carreraPorFacultad/", {
        params: { facultad: event.target.value },
      })
      .then((response) => {
        this.setState({ carreras: response.data });
      })
      .catch((error) => {});
  }
  //Funcion que carga todas las facultades, al ingresar a la pantalla
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/login/facultades/")
      .then((response) => {
        this.setState({ facultades: response.data });
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
  //Funcion que limpiar todo los campos del formulario
  limpiarFormulario() {
    document.getElementById("carnet").value = "";
    document.getElementById("correo_estudiante").value = "";
    document.getElementById("nombres_estudiante").value = "";
    document.getElementById("apellidos_estudiante").value = "";
    document.getElementById("direccion_estudiante").value = "";
    document.getElementById("telefono_estudiante").value = "";
    document.getElementById("sexo").selectedIndex = "0";
    document.getElementById("facultad").selectedIndex = "0";
    document.getElementById("carrera_id").selectedIndex = "0";
  }
  render() {
    //Retorna todo la interfas respectiva para la solicitud de la propuesta
    return (
      /* Componente que facilita el control de los campos del fomrulario */
      <Formik
        initialValues={{
          carnet: "",
          nombres_estudiante: "",
          apellidos_estudiante: "",
          correo_estudiante: "",
          sexo: "",
          direccion_estudiante: "",
          telefono_estudiante: "",
          carrera_id: "",
        }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          /* Librearia que facilita la comunicación con el backend */
          axios
            .post("http://127.0.0.1:8000/login/estudiantes/", {
              carnet: values.carnet,
              nombres_estudiante: values.nombres_estudiante,
              apellidos_estudiante: values.apellidos_estudiante,
              correo_estudiante: values.correo_estudiante,
              sexo: values.sexo,
              direccion_estudiante: values.direccion_estudiante,
              telefono_estudiante: values.telefono_estudiante,
              carrera: values.carrera_id,
            })
            .then((response) => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Te has registrado con exito",
                showConfirmButton: false,
                timer: 2500,
              });
              this.limpiarFormulario();
              /* Hay que limpiar los valores iniciales los vuelve a poner en los input */
            })
            .catch((error) => {
              Swal.fire({
                position: "center",
                icon: "error",
                title:
                  "Ocurrio un error en su registro: Estudiante ya registrado",
              });
              /* Hay que limpiar los valores iniciales los vuelve a poner en los input */
            });
        }}
      >
        {({ values, handleSubmit, handleChange }) => (
          /* Formulario que contiene todo los campos requeridos */
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} className="pr-5">
                <Form.Label>Carnet</Form.Label>
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      Dos letras en mayúscula y cinco dígitos númericos
                    </Tooltip>
                  }
                >
                  <Form.Control
                    type="text"
                    placeholder="AA00000"
                    id="carnet"
                    maxLength="7"
                    pattern="([A-Z]{2})([0-9]{5})"
                    autoComplete="off"
                    required={true}
                    value={values.carnet}
                    onChange={handleChange}
                  />
                </OverlayTrigger>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      Carnet con el dominio del correo de la Universidad
                    </Tooltip>
                  }
                >
                  <Form.Control
                    type="email"
                    placeholder="AA00000@ues.edu.sv"
                    id="correo_estudiante"
                    pattern="([A-Za-z]{2})([0-9]{5})@ues[.]edu[.]sv"
                    maxLength="18"
                    required={true}
                    value={values.correo_estudiante}
                    onChange={handleChange}
                  />
                </OverlayTrigger>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} className="pr-5">
                <Form.Label>Nombres</Form.Label>
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      Inciales en mayúscula, resto en minúscula y los nombres
                      separados por un espacio
                    </Tooltip>
                  }
                >
                  <Form.Control
                    type="text"
                    placeholder="Carlos Roberto"
                    maxLength="50"
                    id="nombres_estudiante"
                    pattern="([A-ZÑ]{1}[a-zá-úñ]+)[ ]([A-ZÑ]{1}[a-zá-úñ]+)"
                    autoComplete="off"
                    required={true}
                    value={values.nombres_estudiante}
                    onChange={handleChange}
                  />
                </OverlayTrigger>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Apellidos</Form.Label>
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      Inciales en mayúscula, resto en minúscula y los apellidos
                      separados por un espacio
                    </Tooltip>
                  }
                >
                  <Form.Control
                    type="text"
                    placeholder="Perez Quintanilla"
                    maxLength="50"
                    id="apellidos_estudiante"
                    pattern="([A-ZÑ]{1}[a-zá-úñ]+)[ ]([A-ZÑ]{1}[a-zá-úñ]+)"
                    autoComplete="off"
                    required={true}
                    value={values.apellidos_estudiante}
                    onChange={handleChange}
                  />
                </OverlayTrigger>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} className="pr-2">
                <Form.Label>Dirección</Form.Label>
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      Cada subdivisión de la dirección, separado por una ","
                    </Tooltip>
                  }
                >
                  <Form.Control
                    type="text"
                    placeholder="Departamento, Municipio, Residencia"
                    maxLength="250"
                    id="direccion_estudiante"
                    autoComplete="off"
                    required={true}
                    value={values.direccion_estudiante}
                    onChange={handleChange}
                  />
                </OverlayTrigger>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} className="pr-5">
                <Form.Label>Teléfono</Form.Label>
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      Ocho dígitos numericos, iniciando por 2, 6 o 7
                    </Tooltip>
                  }
                >
                  <Form.Control
                    type="text"
                    placeholder="########"
                    maxLength="8"
                    id="telefono_estudiante"
                    pattern="([267]{1})([0-9]{7})"
                    required={true}
                    value={values.telefono_estudiante}
                    onChange={handleChange}
                  />
                </OverlayTrigger>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Sexo</Form.Label>
                <Form.Control
                  as="select"
                  id="sexo"
                  required={true}
                  value={values.sexo}
                  onChange={handleChange}
                >
                  <option value="" disabled={true}>
                    Seleccione...
                  </option>
                  <option key={0} value="Masculino">
                    Masculino
                  </option>
                  <option key={1} value="Femenino">
                    Femenino
                  </option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} className="pr-5">
                <Form.Label>Facultad</Form.Label>
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      Si no aparecen las facultades, no hay conexión con la Base
                      de datos, intente en otro momento
                    </Tooltip>
                  }
                >
                  <Form.Control
                    as="select"
                    id="facultad"
                    required={true}
                    onChange={this.handleChange}
                  >
                    <option value="" disabled={true} selected>
                      Seleccione...
                    </option>
                    {this.state.facultades.map((elemento) => (
                      <option
                        key={elemento.codigo_facultad}
                        value={elemento.codigo_facultad}
                      >
                        {elemento.nombre_facultad}
                      </option>
                    ))}
                  </Form.Control>
                </OverlayTrigger>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Carrera</Form.Label>
                <Form.Control
                  as="select"
                  id="carrera_id"
                  required={true}
                  value={values.carrera_id}
                  onChange={handleChange}
                >
                  <option value="" disabled={true}>
                    Seleccione..
                  </option>
                  {this.state.carreras.map((elemento) => (
                    <option
                      key={elemento.codigo_carrera}
                      value={elemento.codigo_carrera}
                    >
                      {elemento.nombre_carrera}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Botones />
          </Form>
        )}
      </Formik>
    );
  }
}

export default Registro;
