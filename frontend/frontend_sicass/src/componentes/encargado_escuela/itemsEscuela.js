import React, { useState } from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Home, Beenhere, Done, EmojiPeople, Pages, Description } from "@material-ui/icons/";
import { Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ListSubheader } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import TocIcon from '@material-ui/icons/Toc';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

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
    <ListItem button component={Link} to="/ResolucionActividades">
      <ListItemIcon>
        <TocIcon />
      </ListItemIcon>
      <ListItemText primary="Resolución de Actividades" />
    </ListItem>
    <DesplegarInformes
      opcionGeneral={"Informes"}
      opcion1={"Proyectos Activos"}
      link1={"/informeProyecto"}
      opcion2={"Estadisticos"}
      link2={"/estadisticos"}
      opcion3={"Estudiantes no aptos"}
      link3={"/estudiantesNoAptos"}
      opcion4={"Estudiantes con observaciones"}
      link4={"/estudiantesObservacion"}
      opcion5={"Tiempo de finalización"}
      link5={"/tiempoFinalizacion"}
    />
  </div>
);

function DesplegarInformes(props) {
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
            <Description />
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
            <Description />
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
            <Description />
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
            <Description />
          </ListItemIcon>
          <ListItemText primary={props.opcion4} />
        </ListItem>
      </Collapse>
      <Collapse in={open} timeout="auto">
        <ListItem
          button
          className={classes.nested}
          component={Link}
          to={props.link5}
        >
          <ListItemIcon>
            <Description />
          </ListItemIcon>
          <ListItemText primary={props.opcion5} />
        </ListItem>
      </Collapse>
    </>
  );
}
