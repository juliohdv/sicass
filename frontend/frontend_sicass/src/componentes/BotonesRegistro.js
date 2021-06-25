import React from "react";
import { Button } from "react-bootstrap";

//Componente que contiene la base de maquetación de las card
export default function botones() {
  return (
    <div className="pt-4">
      <div className="row">
        <div className="col text-right pr-5">
          <Button variant="success" type="submit">
            Registrar
          </Button>
        </div>
        <div className="col pl-5">
          <a className="btn btn-secondary" href="https://juliohdv.github.io/sicass_app/">Cancelar</a>
        </div>
      </div>
    </div>
  );
}
