import React, { Component } from "react";
import Dashboard from "../Dashboard";
import Card from "../Card";
import RegistroUps from "./RegistroUps";
import { Image } from "react-bootstrap";

//Constante para ampliacion de imagen
/* let imagenes = [
  "https://i.ibb.co/CWKq30Z/Google.png",
  "https://i.ibb.co/5RWvQwZ/Drive.png",
  "https://i.ibb.co/jLRgSNq/Carpeta.png",
  "https://i.ibb.co/6BGCd3x/Archivos.png",
  "https://i.ibb.co/Z2CgLmh/Opcion.png" 
];*/

/* const GoogleImage =() => {
  let sourceImageUrls = [
  "../img/Archivos.png",
  "../img/Carpeta.png",
  "../img/Drive.png",
  "../img/Google.png",
  "../img/Opcion.png"
] 
  let thumbImageUrls = sourceImageUrls; //In reality, the thumbnail and the original may not be the same, which are set to be equal, just for the sake of a simple demonstration
  return (
    <RViewer imageUrls={sourceImageUrls}>
      <ul>
        {thumbImageUrls.map((pic, index) => {
          return (
            <li key={index} style={{ marginBottom: "20PX" }}>
              <RViewerTrigger index={index}>
                <img
                  src={pic}
                  style={{ width: "50px", verticalAlign: "middle" }}
                />
              </RViewerTrigger>
            </li>
          );
        })}
      </ul>
    </RViewer>
  );
}; */

/* const GoogleImage = () => {
  let sourceUrl = "../img/Archivos.png";
  let options = {
    toolbar: {
      //Since there is only one picture, let's hide "prev" and "next"
      prev: false,
      next: false,
    },
  };
  return (
    <RViewer options={options} imageUrls={sourceUrl}>
      <RViewerTrigger>
         <Tooltip title="Ver proyecto">
      <Button size="sm" variant="outline-info">
        <Visibility />
      </Button>
    </Tooltip>
        <button>Imagen</button>
      </RViewerTrigger>
    </RViewer>
  );
}; */

//Clase principal del componente
class EnvioRegistroUps extends Component {
  render() {
    return (
      <Dashboard
        contenedor={
          <>
            <div className="pt-4">
              <Card
                titulo="Indicaciones"
                cuerpo={
                  <>
                    <label>
                      Debe seguir los siguientes pasos para la solicitud de su
                      registro a la Unidad de Proyección social y así poder
                      realizar su servicio social:
                    </label>
                    <ul>
                      <li>
                        En cualquier navegador ingresar a su cuenta
                        institucional
                        <div align="center">
                          <Image
                            src="https://i.ibb.co/CWKq30Z/Google.png"
                            alt="Google"
                            fluid
                          ></Image>
                        </div>
                      </li>
                      <li>
                        Ingresar a la aplicación de Drive
                        <div align="center">
                          <Image
                            src="https://i.ibb.co/5RWvQwZ/Drive.png"
                            alt="Drive"
                            fluid
                          ></Image>
                        </div>
                      </li>
                      <li>
                        En su unidad, debe crear una carpeta con el nombre
                        "Proyección social"
                        <div align="center">
                          <Image
                            src="https://i.ibb.co/jLRgSNq/Carpeta.png"
                            alt="Carpeta"
                            fluid
                          ></Image>
                        </div>
                      </li>
                      <li>
                        Ingresar a la carpeta creada y subir los siguientes
                        documentos en formato .pdf
                        <ul>
                          <li>Record de notas (Impreso del expediente Eel)</li>
                          <li>
                            Comprobante de inscripción (Impreso del expediente
                            Eel)
                          </li>
                          <li>DUI (Escaneado)</li>
                        </ul>
                        <div align="center">
                          <Image
                            src="https://i.ibb.co/6BGCd3x/Archivos.png"
                            alt="Archivos"
                            fluid
                          ></Image>
                        </div>
                      </li>
                      <li>
                        Debe obtener el enlace de la siguiente manera, para
                        pegarlo en el formulario que se presenta a continuación
                        <div align="center">
                          <Image
                            src="https://i.ibb.co/Z2CgLmh/Opcion.png"
                            alt="Opcion"
                            fluid
                          ></Image>
                        </div>
                        <div align="center" className="pt-2">
                          <Image
                            src="https://i.ibb.co/br8XJJH/Enlace.png"
                            alt="Enlace"
                            fluid
                          ></Image>
                        </div>
                      </li>
                    </ul>
                  </>
                }
              />
            </div>
            <div className="pt-4">
              <Card
                titulo="Registro a Unidad de Proyección social"
                cuerpo={<RegistroUps />}
              />
            </div>
          </>
        }
      />
    );
  }
}

export default EnvioRegistroUps;
