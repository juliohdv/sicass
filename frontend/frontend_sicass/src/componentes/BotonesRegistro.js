import React from "react";
import { Button } from "react-bootstrap";

//Componente que contiene la base de maquetación de los botones para un registro
export default function botones() {
  return (
    <div className="pt-4">
      <div className="row">
        <div className="col text-right ">
          <Button variant="success" type="submit">
            Registrar
          </Button>
        </div>
        <div className="col ">
          <a className="btn btn-secondary" href="/">Cancelar</a>
        </div>
      </div>
    </div>
  );
}
