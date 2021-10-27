
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Home, Beenhere,Done, EmojiPeople} from "@material-ui/icons/";
import { ListSubheader } from "@material-ui/core";


export const itemsEscuela = (
  <div>
    <ListSubheader>Menú Encargado de Escuela</ListSubheader>
    <ListItem button component={Link} to="/sicass_app">
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Inicio" />
    </ListItem>
    <ListItem button component={Link} to="/PropuestasAceptadas">
      <ListItemIcon>
        <Beenhere />
      </ListItemIcon>
      <ListItemText primary="Propuestas Aceptadas" />
    </ListItem>
    <ListItem button component={Link} to="/SolicitudRegistroUPS">
      <ListItemIcon>
        <Done />
      </ListItemIcon>
      <ListItemText primary="Solicitudes de Registro para UPS" />
    </ListItem>
    <ListItem button component={Link} to="/SolicitudRegistroSS">
      <ListItemIcon>
        <EmojiPeople />
      </ListItemIcon>
      <ListItemText primary="Solicitudes de Estudiantes para SS" />
    </ListItem>
  </div>
);

