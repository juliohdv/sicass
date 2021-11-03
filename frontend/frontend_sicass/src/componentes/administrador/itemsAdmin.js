
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Home, SupervisedUserCircle, VerifiedUser} from "@material-ui/icons/";
import { ListSubheader } from "@material-ui/core";


export const itemsAdmin= (
  <div>
    <ListSubheader>Menú Administrador</ListSubheader>
    <ListItem button component={Link} to="/sicass_app">
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Inicio" />
    </ListItem>
    <ListItem button component={Link} to="/GestionarPrivilegios">
      <ListItemIcon>
        <VerifiedUser/>
      </ListItemIcon>
      <ListItemText primary="Roles y Privilegios" />
    </ListItem>
    <ListItem button component={Link} to="/GestionarUsuarios">
      <ListItemIcon>
        <SupervisedUserCircle />
      </ListItemIcon>
      <ListItemText primary="Usuarios" />
    </ListItem>
  </div>
);

