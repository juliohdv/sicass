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
        fetch("https://juliohdv.pythonanywhere.com/login/csrf/",{
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
        fetch("https://juliohdv.pythonanywhere.com/login/session/",{
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
        fetch("https://juliohdv.pythonanywhere.com/login/whoami/",{
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
        fetch("https://juliohdv.pythonanywhere.com/login/logout/",{
            credentials: "same-origin",
        })
        .then(this.isResponseOk)
        .then((data)=>{
            this.setState({isAuthenticated:false})
            this.getCSRF();
            sessionStorage.clear()
            
            window.location.href = "/";
            

        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return(
            <Card border="info" style={{width:'18rem'}} >
            <Card.Header className="bg-light">Cerrar Sesión:</Card.Header>
                <Card.Body>
                    <p>¿Está seguro de que quiere cerrar sesión?</p>
                    <Button
                    variant="primary"
                    type="button"
                    onClick={this.logout}
                    >
                        SI
                    </Button>
                </Card.Body>
                <p>{this.state.error}</p>
        </Card>
        );
    }
}

export default Logout;