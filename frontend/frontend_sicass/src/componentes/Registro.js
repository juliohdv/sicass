import React, { Component } from "react";
import { Col, Form  } from "react-bootstrap";
import Botones from "./BotonesRegistro";
import axios from 'axios'
import {Formik} from 'formik'


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
      <Formik
      initialValues={{
        carnet:"", 
        nombres_estudiante:"",
        apellidos_estudiante:"",
        correo_estudiante:"",
        sexo:"",
        direccion_estudiante:"",
        telefono_estudiante:"",
        carrera_id:""
      }}
      onSubmit={async values=>{
        await new Promise(resolve => setTimeout(resolve,500))
        alert(JSON.stringify(values,null,2))
        axios
          .post("http://127.0.0.1:8000/login/estudiantes/",{
            carnet:values.carnet,
            nombres_estudiante:values.nombres_estudiante,
            apellidos_estudiante:values.apellidos_estudiante,
            correo_estudiante:values.correo_estudiante,
            sexo:values.sexo,
            direccion_estudiante:values.direccion_estudiante,
            telefono_estudiante:values.telefono_estudiante,
            carrera:values.carrera_id
          })
          .then((response)=>{

          }).catch((error)=>{
            console.log(error)
          })
      }}
    >
      {({
        values,
        handleSubmit,
        handleChange,
      })=>(
          <Form onSubmit={handleSubmit}>
          <Form.Row>
          <Form.Group as={Col} className="pr-5">
            <Form.Label>Carnet</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Ingrese carnet" 
            id="carnet"
            value={values.carnet}
            onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Dirección</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Ingrese dirección" 
            id="direccion_estudiante"
            value={values.direccion_estudiante}
            onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} className="pr-5">
            <Form.Label>Nombres</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Ingrese nombres"
            id="nombres_estudiante"
            value={values.nombres_estudiante}
            onChange={handleChange}
             />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Apellidos</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Ingrese apellidos" 
            id="apellidos_estudiante"
            value={values.apellidos_estudiante}
            onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} className="pr-5">
            <Form.Label>Email</Form.Label>
            <Form.Control 
            type="email" 
            placeholder="Ingrese correo electronico"
            id="correo_estudiante"
            value={values.correo_estudiante}
            onChange={handleChange}
             />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Ingrese teléfono" 
            id="telefono_estudiante"
            value={values.telefono_estudiante}
            onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} className="pr-5">
            <Form.Label>Sexo</Form.Label>
            <Form.Control 
              as="select"
              id="sexo"
              value={values.sexo}
              onChange={handleChange}
            >
              <option value="">Seleccione...</option>
              <option key={0} value="Masculino">Masculino</option>
              <option key={1} value="Femenino">Femenino</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
          <Form.Label >Facultad</Form.Label>
          <Form.Control as="select" onChange={this.handleChange}>
                <option value="">Seleccione..</option>
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
          <Form.Control 
            as="select"
            id="carrera_id"
            value={values.carrera_id}
            onChange={handleChange}
            >
                <option value="">Seleccione..</option>
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
        <Botones />
        </Form>
    )}
    </Formik>
    );
  }
}

//Funcion que contiene todos los datos del estudiante


//Funcion que contiene los campos del formulario


export default Registro;
