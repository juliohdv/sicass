import React, { Component } from "react";
import Dashboard from "./Dashboard";
import Card from "./Card";
import Botones from "./BotonesRegistro";
import { Col, Form  } from "react-bootstrap";
import axios from 'axios'

//Clase principal del componente
class Registro extends Component {
  constructor(props){
    super(props)
    this.state = {
      facultades:[],
      carreras:[],
      facultadSeleccionada:'',
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event){
    this.setState({facultadSeleccionada: event.target.value})
    axios
      .get('http://127.0.0.1:8000/login/carreraPorFacultad/', {params:{facultad: event.target.value}})
      .then((response) =>{
        console.log(response);
        this.setState({carreras:response.data})
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  componentDidMount(){
    axios
      .get('http://127.0.0.1:8000/login/facultades/')
      .then((response) =>{
        this.setState({facultades:response.data})
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  render() {
    //Retorna todo la interfas respectiva para la solicitud de la propuesta
    return (
      <Form>
      <Form.Row>
      <Form.Group as={Col} className="pr-5">
        <Form.Label>Carnet</Form.Label>
        <Form.Control type="text" placeholder="Ingrese carnet" />
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Dirección</Form.Label>
        <Form.Control type="text" placeholder="Ingrese dirección" />
      </Form.Group>
    </Form.Row>
    <Form.Row>
      <Form.Group as={Col} className="pr-5">
        <Form.Label>Nombres</Form.Label>
        <Form.Control type="text" placeholder="Ingrese nombres" />
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Apellidos</Form.Label>
        <Form.Control type="text" placeholder="Ingrese apellidos" />
      </Form.Group>
    </Form.Row>
    <Form.Row>
      <Form.Group as={Col} className="pr-5">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Ingrese correo electronico" />
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Teléfono</Form.Label>
        <Form.Control type="text" placeholder="Ingrese teléfono" />
      </Form.Group>
    </Form.Row>
    <Form.Row>
      <Form.Group as={Col} className="pr-5">
        <Form.Label>Sexo</Form.Label>
        <Form.Control as="select">
          <option>Masculino</option>
          <option>Femenino</option>
        </Form.Control>
      </Form.Group>
      <Form.Group as={Col}>
      <Form.Label>Facultad</Form.Label>
      <Form.Control as="select" onChange={this.handleChange}>
            {this.state.facultades.map(elemento=>(
                <option 
                key={elemento.codigo_facultad} 
                value={elemento.codigo_facultad}>
                  {elemento.nombre_facultad}
                </option>
            ))}
            </Form.Control>
      </Form.Group>
    </Form.Row>
    <Form.Row>
      <Form.Group as={Col} className="pr-5">
      <Form.Label>Carrera</Form.Label>
      <Form.Control as="select">
            {this.state.carreras.map(elemento=>(
                <option 
                key={elemento.codigo_carrera} 
                value={elemento.codigo_carrera}>
                  {elemento.nombre_carrera}
                </option>
            ))}
            </Form.Control>
      </Form.Group>
      <Form.Group as={Col}>

      </Form.Group>
    </Form.Row>
    </Form>
    );
  }
}

//Funcion que contiene todos los datos del estudiante


//Funcion que contiene los campos del formulario


export default Registro;
