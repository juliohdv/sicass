import React, { Component } from 'react';
//Aqui importamos nuestra imagen
import logoProyeccion from './logoProyeccionSocial.jpg';

class LogoProyeccion extends Component {
  render() {
    return (    
        <div className="pr-3">
            <img src={logoProyeccion} width="200" height="200" alt="Logo Proyeccion"/>
        </div>
    );
  }
}

export default LogoProyeccion;