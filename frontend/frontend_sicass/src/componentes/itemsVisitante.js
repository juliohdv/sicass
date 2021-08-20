import React, { useState } from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Home, LockOpen, PersonAdd, ImportContacts, LibraryBooks, Visibility, Add} from "@material-ui/icons/";
import { Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ListSubheader } from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),  
  },
}));

export const itemsVisitante = (
  <div>
    <ListSubheader>Menú</ListSubheader>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Inicio" />
    </ListItem>
    <ListItem button component={Link} to="/Login">
      <ListItemIcon>
        <LockOpen />
      </ListItemIcon>
      <ListItemText primary="Login" />
    </ListItem>
    <ListItem button component={Link} to="/RegistroEstudiante">
      <ListItemIcon>
        <PersonAdd />
      </ListItemIcon>
      <ListItemText primary="Registro de Estudiante" />
    </ListItem>
    <DesplegarPropuestas
      opcionGeneral={"Propuestas"}
      opcion1={"Consultar Propuestas"}
      link1={"/ConsultarPropuesta"}
      opcion2={"Registrar Propuestas"}
      link2={"/RegistrarPropuesta"}
    />
    <DesplegarSolicitudes
      opcionGeneral={"Solicitudes"}
      opcion1={"Consultar Solicitudes"}
      link1={"/ConsultarSolicitud"}
      opcion2={"Registrar Solicitud"}
      link2={"/RegistrarSolicitud"}
    />
  </div>
);
function DesplegarPropuestas(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <ListItem
        button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        <ListItemIcon>
          <ImportContacts />
        </ListItemIcon>
        <ListItemText primary={props.opcionGeneral} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto">
        <ListItem
          button
          className={classes.nested}
          component={Link}
          to={props.link1}
        >
          <ListItemIcon>
            <Visibility />
          </ListItemIcon>
          <ListItemText primary={props.opcion1} />
        </ListItem>
      </Collapse>
      <Collapse in={open} timeout="auto">
        <ListItem
          button
          className={classes.nested}
          component={Link}
          to={props.link2}
        >
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary={props.opcion2} />
        </ListItem>
      </Collapse>
    </>
  );
}
function DesplegarSolicitudes(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <>
      <ListItem
        button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        <ListItemIcon>
          <LibraryBooks />
        </ListItemIcon>
        <ListItemText primary={props.opcionGeneral} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto">
        <ListItem
          button
          className={classes.nested}
          component={Link}
          to={props.link1}
        >
          <ListItemIcon>
            <Visibility />
          </ListItemIcon>
          <ListItemText primary={props.opcion1} />
        </ListItem>
      </Collapse>
      <Collapse in={open} timeout="auto">
        <ListItem
          button
          className={classes.nested}
          component={Link}
          to={props.link2}
        >
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary={props.opcion2} />
        </ListItem>
      </Collapse>
    </>
  );
}
