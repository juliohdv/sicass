import React, { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";
import axios from "axios";

/* Componente que contiene el formulario base de los datos del servicio
social a solicitar */
class SolicitudServicio extends Component {
  constructor(props){
    super(props);
    this.state = {
      columnas: '',
      descripcion: 'descripcion',
      tipos_servicio_social:[],
      facultades:[],
      carreras:[],
      facultadSeleccionada:'',
      carreraSeleccionada:'',
      tipoServicioSocialSeleccionado:'',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleOtro = this.handleOtro.bind(this)
}
  handleChange(event){
    this.setState({facultadSeleccionada: event.target.value})
    this.setState({carreraSeleccionada: event.target.value})
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
  
  handleOtro(event){
    axios
      .get('http://127.0.0.1:8000/login/tiposServicioSocialPorCarrera/', {params:{carrera: event.target.value}})
      .then((response) => {
        console.log(response);
        this.setState({tipos_servicio_social:response.data})
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount(){
    //Consulta lista de facultades
    axios
      .get('http://127.0.0.1:8000/login/facultades/')
      .then((response) =>{
        this.setState({facultades:response.data})
      })
      .catch((error)=>{
        console.log(error)
      })

  }

  render(){
    return (
      /* Recibe dos propiedades las cuales solo se utilizaran en la interfas
      de la propuesta, columnas que se refiere a la cantidad columnas de el
      contenedor y descripción que es el campo agregado en la propuesta*/
      //<Form>
        
        <Row className="pl-5 pr-5">
          <Col sm={this.columnas} className="pl-5">
            <Form.Group as={Row}>
              <Form.Label>Facultad</Form.Label>
              <Form.Control as="select" onChange={this.handleChange}>
                <option value="">Selecione...</option>
              {this.state.facultades.map(elemento=>(
                  <option 
                  key={elemento.codigo_facultad} 
                  value={elemento.codigo_facultad}>
                    {elemento.nombre_facultad}
                  </option>
              ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label>Carrera</Form.Label>
              <Form.Control as="select" onChange={this.handleOtro}>
              <option value="">Selecione...</option>
              {this.state.carreras.map(elemento=>(
                  <option 
                  key={elemento.codigo_carrera} 
                  value={elemento.codigo_carrera}>
                    {elemento.nombre_carrera}
                  </option>
              ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label>Tipo de servicio social</Form.Label>
              <Form.Control as="select">
              <option value="">Selecione...</option>
              {this.state.tipos_servicio_social.map(elemento=>(
                  <option 
                  key={elemento.condigo_tipo_servicio_social} 
                  value={elemento.condigo_tipo_servicio_social}>
                    {elemento.nombre_tipo_servicio_social}
                  </option>
              ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label>Fecha limite para respuesta</Form.Label>
              <Form.Control type="Date"></Form.Control>
            </Form.Group>
          </Col>
          {this.descripcion}
        </Row>
      //</Form>
    );
  }

}

export default SolicitudServicio;

