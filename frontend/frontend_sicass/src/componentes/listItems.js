import React, { useState } from "react";
import { Link } from 'react-router-dom'
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ClassIcon from '@material-ui/icons/Class';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import { Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme)=>({
  nested:{
    paddingLeft: theme.spacing(4),
  },
}))
export const mainListItems = (
  <div>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
          <ListItemText primary="Inicio" />
      </ListItem>
      <ListItem button component={Link} to="/GestionarRoles">
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
          <ListItemText primary="Gestionar roles y privilegios" />
      </ListItem>
      <ListItem button component={Link} to="/RegistroEstudiante">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
          <ListItemText primary="Registrarse" />
      </ListItem>
    <Desplegar 
    opcionGeneral={"Gestionar solicitud"} 
    opcion1={"Registrar solicitud"}
    link1={"/RegistrarSolicitud"}
    opcion2={"Consultar solicitud"}
    link2={"/ConsultarSolicitud"}
    />
    <Desplegar 
    opcionGeneral={"Gestionar propuesta"} 
    opcion1={"Registrar propuesta"}
    link1={"/RegistrarPropuesta"}
    opcion2={"Consultar propuesta"}
    link2={"/ConsultarPropuesta"}
    />
  </div>
);
function Desplegar(props) {
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
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary={props.opcionGeneral} />
      </ListItem>
      <Collapse in={open} timeout="auto">
        <ListItem button className={classes.nested} component={Link} to={props.link1}>
          <ListItemIcon>
            <ClassIcon />
          </ListItemIcon>
          <ListItemText primary={props.opcion1} />
        </ListItem>
      </Collapse>
      <Collapse in={open} timeout="auto">
        <ListItem button className={classes.nested} component={Link} to={props.link2}> 
          <ListItemIcon>
            <AnnouncementIcon />
          </ListItemIcon>
          <ListItemText primary={props.opcion2} />
        </ListItem>
      </Collapse>
    </>
  );
}