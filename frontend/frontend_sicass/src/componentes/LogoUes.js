import React, { Component } from 'react';
//Aqui importamos nuestra imagen
import logoUes from './logoUes.png';


class LogoUes extends Component {
  render() {
    return (    
        <div className="pr-3">
            <img src={logoUes} width="200" height="200" alt="Logo UES"/>
        </div>
    );
  }
}

export default LogoUes;