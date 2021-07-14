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
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme)=>({
  nested:{
    paddingLeft: theme.spacing(4),
  },
}))
export const mainListItems = (
  <div>
      <ListItem button component={Link} to="/Login">
          <ListItemIcon>
            <AccountCircle></AccountCircle>
          </ListItemIcon>
            <ListItemText primary="Login" />
        </ListItem>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
          <ListItemText primary="Inicio" />
      </ListItem>
      <ListItem button component={Link} to="/GestionarPrivilegios">
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
          <ListItemText primary="Gestionar privilegios" />
      </ListItem>
      <ListItem button component={Link} to="/GestionarUsuarios">
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
          <ListItemText primary="Gestionar usuarios" />
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
    {/* <ListItem button component={Link} to="/RegistroUps">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Registro UPS" />
    </ListItem>
    <ListItem button component={Link} to="/SolicitudInscripcion">
        <ListItemIcon>
          <AnnouncementIcon />
        </ListItemIcon>
        <ListItemText primary="Estado inscripción" />
    </ListItem>
    <ListItem button component={Link} to="/ServicioSocial">
        <ListItemIcon>
          <AnnouncementIcon />
        </ListItemIcon>
        <ListItemText primary="Consultar servicios" />
    </ListItem> */}
    <Desplegar 
    opcionGeneral={"Gestionar registro"} 
    opcion1={"Registro UPS"}
    link1={"/RegistroUps"}
    opcion2={"Estado inscripción"}
    link2={"/SolicitudInscripcion"}
    />
    <Desplegar 
    opcionGeneral={"Gestionar servicio social"} 
    opcion1={"Registrar solicitud"}
    link1={"/ServicioSocial"}
    opcion2={"Estado solicitud"}
    link2={"/SolicitudProyecto"}
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