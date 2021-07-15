import React, { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";
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
      columnas: "",
      tipos_servicio_social: [],
      facultades: [],
      carreras: [],
      facultadSeleccionada: "",
      carreraSeleccionada: "",
      tipoServicioSocialSeleccionado: "",
    };
    this.handleFacultad = this.handleFacultad.bind(this);
  }
  handleFacultad(event) {
    this.setState({ facultadSeleccionada: event.target.value });
    this.setState({ carreraSeleccionada: event.target.value });
    axios
      .get("http://127.0.0.1:8000/login/carreraPorFacultad/", {
        params: { facultad: event.target.value },
      })
      .then((response) => {
        console.log(response);
        this.setState({ carreras: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    //Consulta lista de facultades
    axios
      .get("http://127.0.0.1:8000/login/facultades/")
      .then((response) => {
        this.setState({ facultades: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://127.0.0.1:8000/login/tiposServicioSocial/")
      .then((response) => {
        console.log(response);
        this.setState({ tipos_servicio_social: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
                      console.log(response.data);
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
                      console.log(error);
                      Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'No se pudo realizar su registro',
                        showConfirmButton: false,
                        timer: 2500
                      });
                    });
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        {({ values, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Row className="pl-5 pr-5">
              <Form.Group as={Col} className="pr-5">
                <Form.Label>Nombre entidad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ministerio de agricultura"
                  id="nombre_entidad"
                  required
                  maxLength="150"
                  value={values.nombre_entidad}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Departamento, Municipio, Residencia "
                  id="direccion_entidad"
                  required
                  maxLength="250"
                  value={values.direccion_entidad}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="pl-5 pr-5">
              <Form.Group as={Col} className="pr-5">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@name.com"
                  id="correo_entidad"
                  required
                  maxLength="254"
                  pattern="([A-z]+)@([A-z]+)[.]com"
                  value={values.correo_entidad}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="########"
                  id="telefono_entidad"
                  pattern="([267]{1})([0-9]{7})"
                  maxLength="8"
                  required
                  value={values.telefono_entidad}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="text-right pl-5 pr-5 pt-3">
              <Form.Group as={Col} className="pr-5">
                <Form.Label className="pt-2">
                  Clasificación de la entidad
                </Form.Label>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  as="select"
                  id="clasificacion_entidad"
                  required
                  value={values.clasificacion_entidad}
                  onChange={handleChange}
                >
                  <option value="" disabled="true" selected="true">
                    Seleccione...
                  </option>
                  <option key={0} value="Privada">
                    Privada
                  </option>
                  <option key={1} value="Pública">
                    Pública
                  </option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Row className="pl-5 pr-5 pt-5">
              <Col sm={this.columnas} className="pl-5">
                <Form.Group as={Row}>
                  <Form.Label>Facultad</Form.Label>
                  <Form.Control
                    as="select"
                    id="facultad"
                    required
                    onChange={this.handleFacultad}
                  >
                    <option value="" disabled="true" selected="true">
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
                    required
                    value={values.carrera_id}
                    onChange={handleChange}
                  >
                    <option value="" disabled="true" selected="true">
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
                    required
                    value={values.tipo_servicio_social_id}
                    onChange={handleChange}
                  >
                    <option value="" disabled="true" selected="true">
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
                    required
                    value={values.fecha_fin_solicitud}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col sm={1}></Col>
              <Col sm={5} className="pr-5">
                <Form.Group as={Row}>
                  <Form.Label>Descripción de la propuesta</Form.Label>
                  <Form.Control
                    as="textarea"
                    id="descripcion_propuesta"
                    required
                    value={values.descripcion_propuesta}
                    onChange={handleChange}
                    rows={11}
                    maxLength="750"
                    required
                  />
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
