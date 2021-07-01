import React, { Component } from "react";
import { Form, Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";
import { Formik } from "formik";
import Botones from "./BotonesRegistro";
import Swal from "sweetalert2";

/* Componente que contiene el formulario base de los datos del servicio
social a solicitar */
class PropuestaServicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipos_servicio_social: [],
      facultades: [],
      carreras: [],
      facultadSeleccionada: "",
      carreraSeleccionada: "",
      tipoServicioSocialSeleccionado: "",
    };
    this.handleFacultad = this.handleFacultad.bind(this);
  }
  //Funcion que obtiene la carrera dependiendo la facultad seleccionada
  handleFacultad(event) {
    this.setState({ facultadSeleccionada: event.target.value });
    this.setState({ carreraSeleccionada: event.target.value });
    axios
      .get("http://127.0.0.1:8000/login/carreraPorFacultad/", {
        params: { facultad: event.target.value },
      })
      .then((response) => {
        this.setState({ carreras: response.data });
      })
      .catch((error) => {

      });
  }
  //Obtiene de la BD las facultadas para cargar el combobox
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
    axios
      .get("http://127.0.0.1:8000/login/tiposServicioSocial/")
      .then((response) => {
        this.setState({ tipos_servicio_social: response.data });
      })
      .catch((error) => {}
      );
  }
  //Funcion para limpiar los campos ingresados
  limpiarFormulario() {
    document.getElementById("nombre_entidad").value = "";
    document.getElementById("direccion_entidad").value = "";
    document.getElementById("correo_entidad").value = "";
    document.getElementById("telefono_entidad").value = "";
    document.getElementById("clasificacion_entidad").selectedIndex = "0";
    document.getElementById("facultad").selectedIndex = "0";
    document.getElementById("carrera_id").selectedIndex = "0";
    document.getElementById("tipo_servicio_social_id").selectedIndex = "0";
    document.getElementById("descripcion_propuesta").value = "";
  }
  //Funcion para obtener la fecha actual
  fechaActual() {
    var fecha = new Date();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();
    var ano = fecha.getFullYear();
    if (dia < 10) dia = "0" + dia;
    if (mes < 10) mes = "0" + mes;
    return ano + "-" + mes + "-" + dia;
  }
  render() {
    return (
      <Formik
        initialValues={{
          nombre_entidad: "",
          direccion_entidad: "",
          correo_entidad: "",
          telefono_entidad: "",
          clasificacion_entidad: "",
          fecha_fin_propuesta: "",
          estado_propuesta: "En Proceso",
          descripcion_propuesta: "",
          entidad_externa_id: "",
          carrera_id: "",
          tipo_servicio_social_id: "",
        }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          axios
            .post("http://127.0.0.1:8000/login/entidadExterna/", {
              nombre_entidad: values.nombre_entidad,
              direccion_entidad: values.direccion_entidad,
              correo_entidad: values.correo_entidad,
              telefono_entidad: values.telefono_entidad,
              clasificacion_entidad: values.clasificacion_entidad,
            })
            .then((response) => {
              axios
                .get("http://127.0.0.1:8000/login/ultimaEntidadExterna/")
                .then((response) => {
                  axios
                    .post("http://127.0.0.1:8000/login/propuestas/", {
                      fecha_fin_propuesta: values.fecha_fin_propuesta,
                      estado_propuesta: values.estado_propuesta,
                      descripcion_propuesta: values.descripcion_propuesta,
                      entidad_externa: response.data
                        .map((elemento) => elemento.codigo_entidad)
                        .toString(),
                      carrera: values.carrera_id,
                      tipo_servicio_social: values.tipo_servicio_social_id,
                    })
                    .then((response) => {
                      Swal.fire({
                        position: "center",
                        icon: "success",
                        title:
                          "Tu propuesta de servicio social ha sido registrada con éxito.",
                        showConfirmButton: false,
                        timer: 2500,
                      });
                      this.limpiarFormulario();
                    })
                    .catch((error) => {
                      Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Ocurrio un error en su registro de propuesta",
                      });
                    });
                })
                .catch((error) => {});
            })
            .catch((error) => {});
        }}
      >
        {({ values, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} className="pr-5">
                <Form.Label>Nombre entidad</Form.Label>
                <OverlayTrigger
                  overlay={
                    <Tooltip>Nombre de la entidad a la que representa</Tooltip>
                  }
                >
                  <Form.Control
                    type="text"
                    placeholder="Ministerio de agricultura"
                    id="nombre_entidad"
                    required={true}
                    maxLength="150"
                    value={values.nombre_entidad}
                    onChange={handleChange}
                  />
                </OverlayTrigger>
              </Form.Group>
              <Form.Group as={Col}>
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
                    placeholder="Departamento, Municipio, Residencia "
                    id="direccion_entidad"
                    required={true}
                    maxLength="250"
                    value={values.direccion_entidad}
                    onChange={handleChange}
                  />
                </OverlayTrigger>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} className="pr-5">
                <Form.Label>Correo</Form.Label>
                <OverlayTrigger
                  overlay={
                    <Tooltip>Debe contener una "@" y al menos un "."</Tooltip>
                  }
                >
                  <Form.Control
                    type="email"
                    placeholder="example@name.com"
                    id="correo_entidad"
                    required={true}
                    maxLength="254"
                    pattern="([A-z]+)@([A-z]+)[.]([A-z.]+)"
                    value={values.correo_entidad}
                    onChange={handleChange}
                  />
                </OverlayTrigger>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Teléfono</Form.Label>
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      Ocho dígitos númericos, iniciados por 2, 6 o 7
                    </Tooltip>
                  }
                >
                  <Form.Control
                    type="text"
                    placeholder="########"
                    id="telefono_entidad"
                    pattern="([267]{1})([0-9]{7})"
                    maxLength="8"
                    required={true}
                    value={values.telefono_entidad}
                    onChange={handleChange}
                  />
                </OverlayTrigger>
              </Form.Group>
            </Form.Row>
            <Form.Row className="text-right pt-3">
              <Form.Group as={Col} className="pr-5">
                <Form.Label className="pt-2">
                  Clasificación de la entidad
                </Form.Label>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  as="select"
                  id="clasificacion_entidad"
                  required={true}
                  value={values.clasificacion_entidad}
                  onChange={handleChange}
                >
                  <option value="" disabled={true}>
                    Seleccione...
                  </option>
                  <option key={0} value="Privada">
                    Privada
                  </option>
                  <option key={1} value="Pública">
                    Pública
                  </option>
                  <option key={2} value="Autónoma">
                    Autónoma
                  </option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Row className="pt-5">
              <Col sm={6} className="pl-5">
                <Form.Group as={Row}>
                  <Form.Label>Facultad</Form.Label>
                  <Form.Control
                    as="select"
                    id="facultad"
                    required={true}
                    onChange={this.handleFacultad}
                  >
                    <option value="" disabled={true} selected>
                      Selecione...
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
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label>Carrera</Form.Label>
                  <Form.Control
                    as="select"
                    id="carrera_id"
                    required={true}
                    value={values.carrera_id}
                    onChange={handleChange}
                  >
                    <option value="" disabled={true}>
                      Selecione...
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
                <Form.Group as={Row}>
                  <Form.Label>Tipo de servicio social</Form.Label>
                  <Form.Control
                    as="select"
                    id="tipo_servicio_social_id"
                    required={true}
                    value={values.tipo_servicio_social_id}
                    onChange={handleChange}
                  >
                    <option value="" disabled={true} selected={true}>
                      Selecione...
                    </option>
                    {this.state.tipos_servicio_social.map((elemento) => (
                      <option
                        key={elemento.condigo_tipo_servicio_social}
                        value={elemento.condigo_tipo_servicio_social}
                      >
                        {elemento.nombre_tipo_servicio_social}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label>Fecha limite para respuesta</Form.Label>
                  <Form.Control
                    type="Date"
                    id="fecha_fin_propuesta"
                    required={true}
                    value={values.fecha_fin_propuesta}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col sm={1}></Col>
              <Col sm={5}>
                <Form.Group as={Row}>
                  <Form.Label>Descripción de la propuesta</Form.Label>
                  <OverlayTrigger
                  overlay={
                    <Tooltip>Descripción de la propuesta, maximo 750 carácteres</Tooltip>
                  }
                >
                  <Form.Control
                    as="textarea"
                    id="descripcion_propuesta"
                    required={true}
                    value={values.descripcion_propuesta}
                    onChange={handleChange}
                    rows={11}
                    maxLength="750"
                  />
                </OverlayTrigger>
                </Form.Group>
              </Col>
            </Row>
            <Botones />
          </Form>
        )}
      </Formik>
    );
  }
}

export default PropuestaServicio;
