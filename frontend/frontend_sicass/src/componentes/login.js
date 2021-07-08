import React, { Component } from 'react';
import {Button, Form, Card}  from  'react-bootstrap';

class Login extends Component {
    state = {
        credenciales : {username: '', password: ''}
    }
    login = event =>{
        console.log(this.state.credenciales);
        fetch('http://127.0.0.1:8000/auth/',{ //solicitud a django regresa el token
            method: 'POST',
            body: JSON.stringify(this.state.credenciales),
            headers: {'Content-Type': 'application/json'},
        })
        .then(data => data.json())
        .then(
            data => {
                console.log(data);
            }
        ).catch(error => console.error(error))
    }
    inputChanged = event =>{ //asociamos el valor actual del form al stado del componente
        const credenc = this.state.credenciales;
        credenc[event.target.name] = event.target.value;
        this.setState({credenciales: credenc});
    }
    render(){
        return (
        <Card border="info" style={{width:'18rem'}} >
            <Card.Header className="bg-light">Iniciar Sesión:</Card.Header>
                <Card.Body>
                    <div id="formContent">
                        <Form>
                            <Form.Label>
                                Usuario:
                            </Form.Label>
                            <Form.Control 
                                name="username" //mismo name que en el modelo!
                                type="text"  
                                placeholder="Ingresar usuario"
                                value={this.state.credenciales.username}
                                onChange={this.inputChanged}
                            />
                            <Form.Label>
                                Contraseña:
                            </Form.Label>
                            <Form.Control 
                                name="password" 
                                type="password" 
                                placeholder="Contraseña" 
                                value={this.state.credenciales.password}
                                onChange={this.inputChanged}
                            />
                            <br></br>
                            <Button 
                            variant="primary" 
                            type="button" 
                            onClick={this.login}>
                            Iniciar Sesión
                            </Button>
                        </Form>
                    </div>
                </Card.Body>
        </Card>
       
        );
    }
}

export default Login;