import React, { useState } from "react";
import { Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Home, Group, GroupAdd, LibraryBooks, Add, Widgets, ImportContacts, Visibility} from "@material-ui/icons/";
import { ListSubheader } from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
    
  },
}));

export const itemsFacultad = (
  <div>
    <ListSubheader>Menú Encargado de Facultad</ListSubheader>
    <ListItem button component={Link} to="/sicass_app">
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Inicio" />
    </ListItem>
    <ListItem button component={Link} to="/Docentes">
      <ListItemIcon>
        <Group />
      </ListItemIcon>
      <ListItemText primary="Nómina Docente" />
    </ListItem>
    <ListItem button component={Link} to="/AsignarEE">
      <ListItemIcon>
        <GroupAdd />
      </ListItemIcon>
      <ListItemText primary="Asignar Encargado a Escuela" />
    </ListItem>
    <ListItem button component={Link} to="/Propuesta">
      <ListItemIcon>
        <ImportContacts />
      </ListItemIcon>
      <ListItemText primary="Propuestas" />
    </ListItem>
    <ListItem button component={Link} to="">
      <ListItemIcon>
        <LibraryBooks />
      </ListItemIcon>
      <ListItemText primary="Solicitudes" />
    </ListItem>
    <ListItem button component={Link} to="/GestionServicioSocial">
      <ListItemIcon>
        <LibraryBooks />
      </ListItemIcon>
      <ListItemText primary="Servicios Sociales" />
    </ListItem>
    {/* <DesplegarServicioSocial
      opcionGeneral={"Servicios Sociales"}
      opcion1={"Registrar Servicio Social"}
      link1={""}
      opcion2={"Consultar Servicio Social"}
      link2={""}
    /> */}
  </div>
);
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

