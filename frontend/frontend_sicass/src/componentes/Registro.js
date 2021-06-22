import React, { Component } from "react";
import { Col, Form, Button } from "react-bootstrap";
import axios from "axios";

//Clase principal del componente
class Registro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facultades: [],
      carreras: [],
      facultadSeleccionada: "",
      form:{
        carnet: "",
        nombres: "",
        apellidos: "",
        correo: "",
        sexo: "",
        direccion: "",
        telefono: "",
        carrera: "",
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChangeForm = async e=> {
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form)
  }
  peticionPost= async() =>{
    await axios
      .post("http://127.0.0.1:8000/login/estudiante/", {
      params: { estudiante: this.state.form}
    }).then(response=>{
      console.log(response);
    }).catch(error=>{
      console.log(error.message);
    });
  }
  handleChange(event) {
    this.setState({ facultadSeleccionada: event.target.value });
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
    axios
      .get("http://127.0.0.1:8000/login/facultades/")
      .then((response) => {
        this.setState({ facultades: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const {form}=this.state;
    //Retorna todo la interfas respectiva para la solicitud de la propuesta
    return (
      <>
        <Form.Row>
          <Form.Group as={Col} className="pr-5">
            <Form.Label>Carnet</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="AA00000" 
              name="carnet"
              value={form.carnet} 
              maxLength="7"
              onChange={this.handleChangeForm} 
              required/>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control 
              type="tel" 
              placeholder="########" 
              name="telefono"
              maxLength="8" 
              value={form.telefono}
              onChange={this.handleChangeForm} 
              required/>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} className="pr-5">
            <Form.Label>Nombres</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Roberto Carlos" 
              name="nombres" 
              value={form.nombres}
              onChange={this.handleChangeForm} 
              required/>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Apellidos</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Perez Martinez" 
              name="apellidos" 
              value={form.apellidos}
              onChange={this.handleChangeForm} 
              required/>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} className="pr-1">
            <Form.Label>Dirección</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Departamento, Municipio, Residencia" 
              name="direccion" 
              value={form.direccion}
              onChange={this.handleChangeForm} 
              required/>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} className="pr-5">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="correo"
              value={form.correo}
              onChange={this.handleChangeForm}  
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Sexo</Form.Label>
            <Form.Control 
              as="select" 
              name="sexo" 
              value={form.sexo}
              onClick={this.handleChangeForm} 
              required>
              <option>Masculino</option>
              <option>Femenino</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} className="pr-5">
            <Form.Label>Facultad</Form.Label>
            <Form.Control 
              as="select" 
              name="facultad"
              onChange={this.handleChange}>
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
          <Form.Group as={Col}>
            <Form.Label>Carrera</Form.Label>
            <Form.Control 
              as="select" 
              name="carrera" 
              value={form.carrera}
              onClick={this.handleChangeForm} 
              required>
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
        <div className="row pt-3">
            <div className="col text-right">
              <Button variant="success" type="submit" onClick={this.peticionPost}>
                Registrar
              </Button>
            </div>
            <div className="col">
              <Button variant="secondary" type="button" onClick="">
                Cancelar
              </Button>
            </div>
          </div>
      </>
    );
  }
}

export default Registro;
