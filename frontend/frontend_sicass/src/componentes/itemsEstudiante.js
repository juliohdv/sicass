import React, { useState } from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Home, Pages, Visibility, Add, Schedule, AssignmentTurnedIn,Widgets} from "@material-ui/icons/";
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
export const itemsEstudiante = (

  <div>
    <ListSubheader>Menú Estudiante</ListSubheader>
    <ListItem button component={Link} to="/sicass_app">
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Inicio" />
    </ListItem>
    <DesplegarUPS
      opcionGeneral={"UPS"}
      opcion1={"Registro"}
      link1={"/RegistroUps"}
      opcion2={"Consultar Registro"}
      link2={"/SolicitudInscripcion"}
    />
    <DesplegarServicioSocial
      opcionGeneral={"Servicio Social"}
      opcion1={"Consultar SS Disponible"}
      link1={"/ServicioSocial"}
      opcion2={"Estado de Mis Servicios Sociales"}
      link2={"/SolicitudProyecto"}
      opcion3={"Registrar Actividades"}
      link3={"/Actividades"}
      opcion4={"Resolución"}
      link={""}
    />
  </div>
);
function DesplegarUPS(props) {
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
          <Pages />
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
            <Add />
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
            <Visibility />
          </ListItemIcon>
          <ListItemText primary={props.opcion2} />
        </ListItem>
      </Collapse>
    </>
  );
}
function DesplegarServicioSocial(props) {
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
          <Widgets />
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
            <Schedule />
          </ListItemIcon>
          <ListItemText primary={props.opcion2} />
        </ListItem>
      </Collapse>
      <Collapse in={open} timeout="auto">
        <ListItem
          button
          className={classes.nested}
          component={Link}
          to={props.link3}
        >
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary={props.opcion3} />
        </ListItem>
      </Collapse>
      <Collapse in={open} timeout="auto">
        <ListItem
          button
          className={classes.nested}
          component={Link}
          to={props.link4}
        >
          <ListItemIcon>
            <AssignmentTurnedIn />
          </ListItemIcon>
          <ListItemText primary={props.opcion4} />
        </ListItem>
      </Collapse>
    </>
  );
}
