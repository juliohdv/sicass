import React, { Component } from "react";
import { Col, Form  } from "react-bootstrap";
import Botones from "./BotonesRegistro";
import axios from 'axios'
import {Formik} from 'formik'
import Swal from 'sweetalert2'

//Clase principal del componente
class Registro extends Component {
  constructor(props) {
    super(props);
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
    const {form}=this.state;
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
        //alert(JSON.stringify(values,null,2))
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
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Te has registrado con exito',
              showConfirmButton: false,
              timer: 2500
            });
            this.limpiarFormulario();
          }).catch((error)=>{
            console.log(error)
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'No se pudo realizar su registro',
              showConfirmButton: false,
              timer: 2500
            });
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
            placeholder="AA00000" 
            id="carnet"
            maxLength="7"
            pattern="([A-Z]{2})([0-9]{5})"
            required
            value={values.carnet}
            onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
          <Form.Label>Email</Form.Label>
            <Form.Control 
            type="email" 
            placeholder="AA00000@ues.edu.sv"
            id="correo_estudiante"
            pattern="([A-Z]{2})([0-9]{5})@ues[.]edu[.]sv"
            maxLength="18"
            required
            value={values.correo_estudiante}
            onChange={handleChange}
             />
            
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} className="pr-5">
            <Form.Label>Nombres</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Carlos Roberto"
            maxLength="50"
            id="nombres_estudiante"
            pattern="([A-Z]{1}[a-z]+)[ ]([A-Z]{1}[a-z]+)"
            required
            value={values.nombres_estudiante}
            onChange={handleChange}
             />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Apellidos</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Perez Quintanilla"
            maxLength="50" 
            id="apellidos_estudiante"
            pattern="([A-Z]{1}[a-z]+)[ ]([A-Z]{1}[a-z]+)"
            required
            value={values.apellidos_estudiante}
            onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} className="pr-2">
          <Form.Label>Dirección</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Departamento, Municipio, Residencia"
            maxLength="250"
            id="direccion_estudiante"
            required
            value={values.direccion_estudiante}
            onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} className="pr-5">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="########"
            maxLength="8" 
            id="telefono_estudiante"
            pattern="([267]{1})([0-9]{7})"
            required
            value={values.telefono_estudiante}
            onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Sexo</Form.Label>
            <Form.Control 
              as="select"
              id="sexo"
              required
              value={values.sexo}
              onChange={handleChange}
            >
              <option value="" disabled="true" selected="true">Seleccione...</option>
              <option key={0} value="Masculino">Masculino</option>
              <option key={1} value="Femenino">Femenino</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} className="pr-5">
          <Form.Label >Facultad</Form.Label>
          <Form.Control as="select" id="facultad" required onChange={this.handleChange}>
                <option value="" disabled="true" selected="true">Seleccione..</option>
                {this.state.facultades.map(elemento=>(
                    <option 
                    key={elemento.codigo_facultad} 
                    value={elemento.codigo_facultad}>
                      {elemento.nombre_facultad}
                    </option>
                ))}
                </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
          <Form.Label>Carrera</Form.Label>
          <Form.Control 
            as="select"
            id="carrera_id"
            required
            value={values.carrera_id}
            onChange={handleChange}
            >
                <option value="" disabled="disabled">Seleccione..</option>
                {this.state.carreras.map(elemento=>(
                    <option 
                    key={elemento.codigo_carrera} 
                    value={elemento.codigo_carrera}>
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
