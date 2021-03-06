import React, { Component } from 'react';
import {Button, Form, Card}  from  'react-bootstrap';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            credenciales : {
            csrf:'',
            username: '', 
            password: '', 
            tipo_usuario:'', 
            isAuthenticated:false, 
            error:'',}
        }
    }
    componentDidMount = () =>{
        this.getSession()
    }
    createCookie(key, valor){
        const cookie = escape(key) + "=" + escape(valor) + ";secure;"
        document.cookie = cookie; 
        console.log(cookie)
    }
    isResponseOk(response){
        if(response.status >= 200 && response.status  <= 299){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }
    getCSRF = () =>{
        fetch("http://127.0.0.1:8000/login/csrf/",{
            credentials: "include",
        })
        .then((res)=>{
            let csrfToken = res.headers.get("X-CSRFToken")
            this.setState({csrf: csrfToken})
            console.log(csrfToken)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    getSession = () => {
        fetch("http://127.0.0.1:8000/login/session/",{
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) =>{
            console.log(data)
            if(data.isAuthenticated){
                this.setState({isAuthenticated:true})
            }else {
                this.setState({isAuthenticated:false})
                this.getCSRF()
            }
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    whoami = () =>{
        fetch("http://127.0.0.1:8000/login/whoami/",{
            headers:{
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Te has logeado como: " + data.username)
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    login = event =>{
        console.log(this.state.credenciales);
        fetch('http://127.0.0.1:8000/login/login/',{
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            'X-CSRFToken': this.state.csrf},
            credentials: 'include',
            body: JSON.stringify({
                username: this.state.credenciales.username,
                password: this.state.credenciales.password
            }),
        })
        .then(this.isResponseOk)
        .then(
            data => {
                this.setState({isAuthenticated:true, username:"", password:"", error:""})
                this.createCookie("usuario",data.username);
                this.createCookie("tipo_usuario", data.tipo_usuario);
                
            }
        ).catch(error => this.setState({error:"Nombre de usuario o contrase??a no v??lido."}))
    }
    logout = () =>{
        fetch("http://127.0.0.1:8000/login/logout/",{
            credentials: "include",
        })
        .then(this.isResponseOk)
        .then((data)=>{
            console.log(data)
            this.setState({isAuthenticated:false})
            this.getCSRF();
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    inputChanged = event =>{ //asociamos el valor actual del form al stado del componente
        const credenc = this.state.credenciales;
        credenc[event.target.name] = event.target.value;
        this.setState({credenciales: credenc});
    }
    render(){
        return (
        <Card border="info" style={{width:'18rem'}} >
            <Card.Header className="bg-light">Iniciar Sesi??n:</Card.Header>
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
                                Contrase??a:
                            </Form.Label>
                            <Form.Control 
                                name="password" 
                                type="password" 
                                placeholder="Contrase??a" 
                                value={this.state.credenciales.password}
                                onChange={this.inputChanged}
                            />
                            <br></br>
                            <Button 
                            variant="primary" 
                            type="button" 
                            onClick={this.login}>
                            Iniciar Sesi??n
                            </Button>
                        </Form>
                    </div>
                </Card.Body>
                <p>{this.state.error}</p>
        </Card>
        );
    }
}

export default Login;