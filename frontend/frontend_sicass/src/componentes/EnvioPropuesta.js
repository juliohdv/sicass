import React, { Component } from "react";
import Dashboard from "./Dashboard";
import Card from "./Card";

class Propuesta extends Component {
  render() {
    return <Dashboard contenedor={<Cuerpo />} />;
  }
}

function Cuerpo() {
  return (
    <div className="align-center">
      <div>
        <Card 
        titulo="Datos de entidad" 
        cuerpo={<DatosEntidad />} 
        />
      </div>
      <div className="pt-4">
        <Card
          titulo="Propuesta de servicio social"
          cuerpo={<DatosPropuesta />}
        />
      </div>
      <div className="container pt-3">
          <div className="row">
              <div className="col text-right">
                  <button type="Button" className="btn btn-success">Registrar</button>
              </div>
              <div className="col">
              <button type="Button" className="btn btn-secondary">Cancelar</button>
              </div>
          </div>
      </div>
    </div>
  );
}

function DatosEntidad() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <label>Nombre de la entidad</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col">
          <label>Dirección</label>
          <input type="text" className="form-control" />
        </div>
      </div>
      <div className="row pt-3">
        <div className="col">
          <label>Correo</label>
          <input type="email" className="form-control" />
        </div>
        <div className="col">
          <label>Teléfono</label>
          <input type="text" className="form-control"/>
        </div>
      </div>
      <div className="row pt-3">
        <div className="col text-right pt-2">
          <label>Clasificación de la entidad</label>
        </div>
        <div className="col">
          <select className="form-control">
            <option>Pública</option>
            <option>Privada</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function DatosPropuesta() {
  return (
    <div className="container">
      <div className="row">
        <div className="col mr-4">
          <div className="row">
            <label>Facultad</label>
            <select className="form-control">
              <option>Ingenieria</option>
              <option>Biologia</option>
            </select>
          </div>
          <div className="row pt-3">
            <label>Carrera</label>
            <select className="form-control">
              <option>Ingenieria informatica</option>
              <option>Biologia</option>
            </select>
          </div>
          <div className="row pt-3">
            <label>Tipo de servicio social</label>
            <select className="form-control">
              <option>Soporte técnico</option>
              <option>Pasantia</option>
            </select>
          </div>
          <div className="row pt-3">
            <label>Fecha limite para repuesta</label>
            <input type="date" className="form-control" />
          </div>
        </div>
        <div className="col ml-4">
          <div className="row">
            <label className="text-right">Descripción</label>
          </div>
          <div className="row pt-3">
            <textarea maxLength="500" className="form-control" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Propuesta;
