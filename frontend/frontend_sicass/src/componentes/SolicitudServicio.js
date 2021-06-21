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
      descripcion: '',
      tipos_servicio_social:[],
      facultades:[],
      carreras:[],
    }
}
  componentDidMount(){
    axios
    .get('http://127.0.0.1:8000/login/tiposServicioSocial/')
    .then((response) => {
      console.log(response);
      this.setState({tipos_servicio_social:response.data})
    })
    .catch((error) => {
      console.log(error);
    });
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
              <Form.Control as="select">
                <option>Ingenieria y arquitectura</option>
                <option>Biologia</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label>Carrera</Form.Label>
              <Form.Control as="select">
                <option>Ingenieria informatica</option>
                <option>Licenciatura en biologia</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label>Tipo de servicio social</Form.Label>
              <Form.Control as="select">
              {this.state.tipos_servicio_social.map(elemento=>(
                  <option key={elemento.condigo_tipo_servicio_social} value={elemento.condigo_tipo_servicio_social}>{elemento.nombre_tipo_servicio_social}</option>
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
  cambioTipo(e){
    this.setState({
      tipo: e.target.value
    })
  }
}

export default SolicitudServicio;

