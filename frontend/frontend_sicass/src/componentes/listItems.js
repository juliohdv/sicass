import React, { Component, useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ClassIcon from '@material-ui/icons/Class';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import { Button, Collapse } from "react-bootstrap";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Inicio" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Registrarse" />
    </ListItem>
    <Desplegar 
    opcionGeneral={"Gestionar solicitud"} 
    opcion1={"Registrar solicitud"}
    opcion2={"Consultar solicitud"}
    />
    <Desplegar 
    opcionGeneral={"Gestionar propuesta"} 
    opcion1={"Registrar propuesta"}
    opcion2={"Consultar propuesta"}
    />
  </div>
);

function Desplegar(props) {
  const [open, setOpen] = useState(false);

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
      <Collapse in={open}>
        <ListItem button>
          <ListItemIcon>
            <ClassIcon />
          </ListItemIcon>
          <ListItemText primary={props.opcion1} />
        </ListItem>
      </Collapse>
      <Collapse in={open}>
        <ListItem button>
          <ListItemIcon>
            <AnnouncementIcon />
          </ListItemIcon>
          <ListItemText primary={props.opcion2} />
        </ListItem>
      </Collapse>
    </>
  );
}