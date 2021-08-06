import React, {Component} from 'react';
import {Button, Card}  from  'react-bootstrap';

class Logout extends Component{
    constructor(props){
        super(props)
        this.state = {
            isAuthenticated:true,
            error:''
        }
    }
    componentDidMount = () => {
        this.getSession()

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
            credentials: "same-origin",
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
            credentials: "same-origin",
        })
        .then((res) => res.json())
        .then((data) =>{
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
            credentials: "same-origin",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Te has logeado como: " + data.username)
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    
    logout = () =>{
        fetch("http://127.0.0.1:8000/login/logout/",{
            credentials: "same-origin",
        })
        .then(this.isResponseOk)
        .then((data)=>{
            this.setState({isAuthenticated:false})
            this.getCSRF();
            sessionStorage.clear();
            document.cookie='name=tipo_usuario;expires=Thu, 01 Jan 1970 00:00:01 GMT';
            document.cookie='name=usuario;expires=Thu, 01 Jan 1970 00:00:01 GMT';
            

        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return(
            <Card border="info" style={{width:'18rem'}} >
            <Card.Header className="bg-light">Iniciar Sesión:</Card.Header>
                <Card.Body>
                    <Button
                    variant="primary"
                    type="button"
                    onClick={this.logout}
                    >
                        Cerrar Sesión
                    </Button>
                </Card.Body>
                <p>{this.state.error}</p>
        </Card>
        );
    }
}

export default Logout;