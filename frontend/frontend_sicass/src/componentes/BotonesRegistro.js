import React from "react";
import { Button } from "react-bootstrap";

//Componente que contiene la base de maquetación de las card
export default function botones(props) {
  return (
    <div className="pt-4">
      <div className="row">
        <div className="col text-right pr-5">
          <Button variant="success" type="submit">
            Registrar
          </Button>
        </div>
        <div className="col pl-5">
          <Button variant="secondary" type="button">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
