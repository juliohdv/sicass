import React, { Component } from 'react';
//Aqui importamos nuestra imagen
import sicass from './iconoSicass.png';

class LogoSicass extends Component {
  render() {
    return (    
        <div className="pr-3">
            <img src={sicass} width="50" height="50" alt="Lgo SICASS"/>
        </div>
    );
  }
}

export default LogoSicass;