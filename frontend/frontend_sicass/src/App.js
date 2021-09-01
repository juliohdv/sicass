import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Button } from "@material-ui/core";
import { itemsVisitante } from "./componentes/itemsVisitante";
import { itemsEstudiante } from "./componentes/itemsEstudiante";
import { itemsFacultad } from "./componentes/itemsFacultad";
import { itemsEscuela } from "./componentes/itemsEscuela";
import { itemsAdmin } from "./componentes/itemsAdmin";
import LogoSicass from "./componentes/LogoSicass";
import EnvioRegistro from "./componentes/EnvioRegistro";
import EnvioPropuesta from "./componentes/EnvioPropuesta";
import EnvioSolicitud from "./componentes/EnvioSolicitud";
import Roles from "./componentes/Roles";
import Solicitudes from "./componentes/Solicitudes";
import Login from "./componentes/login";
import Logout from "./componentes/logout";
import Propuestas from "./componentes/Propuestas";
import Usuarios from "./componentes/Usuarios";
import InicioInformacion from "./componentes/InicioInformacion";
import EnvioRegistroUps from "./componentes/EnvioRegistroUps";
import SolicitudInscripcion from "./componentes/SolicitudInscripcion";
import ServicioSocial from "./componentes/ServicioSocial";
import SolicitudProyecto from "./componentes/SolicitudProyecto";
import { LockOpen } from "@material-ui/icons";
import { Backdrop, Fade, Modal } from "@material-ui/core";

function leerCookie(nombre){
  let key = nombre + "=";
  let cookies = document.cookie.split(";")
  for(let i=0; i<cookies.length; i++){
    let cookie = cookies[i]
    while(cookie.charAt(0) === ' '){
      cookie = cookie.substring(1,cookie.length)
    }
    if(cookie.indexOf(key) === 0){
      return cookie.substring(key.length, cookie.length)
    }
  }
  return null;
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        SICASS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
let tipo_usuario = " ";
let nombre_usuario = " ";
const drawerWidth = 335; //Ancho del menú desplegable
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperLogin: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openLogout, setOpenLogout] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleCloseLogin = () => {
    setOpenLogin(false);
    tipo_usuario = leerCookie("tipo_usuario");
    nombre_usuario = leerCookie("usuario");

  };
  const handleOpenLogout = () => {
    setOpenLogout(true);
  }
  const handleCloseLogout = () => {
    setOpenLogout(false);
    tipo_usuario = " "
    nombre_usuario = " "
    
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <LogoSicass />
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            SICASS
          </Typography>
          
          {(() => {
            if(tipo_usuario !== " "){
              return(
               <Typography
                variant ="overline"
                color="inherit"
                align="center"
                display="block">
                Bienvenid@: {nombre_usuario}{"  "} 
                    <Button 
                    variant="contained" 
                    color="default" 
                    startIcon={<LockOpen />}
                    onClick={handleOpenLogout}>
                      Cerrar Sesión
                    </Button>
                </Typography>
              );

            }else{
              return <Button
                variant="contained"
                color="default"
                startIcon={<LockOpen />}
                onClick={handleOpenLogin}>
                Iniciar Sesión
              </Button>
            }
        })()}
          
          
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openLogin}
            onClose={handleCloseLogin}

            closeAfterTransition={true}
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openLogin}>
              <div className={classes.paperLogin}>
                <h2 id="transition-modal-title">Inicio de Sesión:</h2>
                <Login />
              </div>
            </Fade>
          </Modal>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openLogout}
            onClose={handleCloseLogout}

            closeAfterTransition={true}
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openLogout}>
              <div className={classes.paperLogin}>
                <h2 id="transition-modal-title">Cerrar Sesión:</h2>
                <Logout />
              </div>
            </Fade>
          </Modal>
        </Toolbar>
      </AppBar>
      <Router>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          {(() => {
          switch(tipo_usuario) {
            case "1": return <List>{itemsEstudiante}</List>;
            case "2": return <List>{itemsFacultad}</List>;
            case "3": return <List>{itemsEscuela}</List>;
            case "4": return <List>{itemsAdmin}</List>;
            default: return <List>{itemsVisitante}</List>
          }
        })()}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container>
            <Switch>
              {
                <Route exact path="/">
                  <Inicio />
                </Route>
              }
              <Route path="/RegistroEstudiante">
                <RegistroEstudiante />
              </Route>
              <Route path="/RegistrarPropuesta">
                <RegistrarPropuesta />
              </Route>
              <Route path="/RegistrarSolicitud">
                <RegistrarSolicitud />
              </Route>
              <Route path="/GestionarPrivilegios">
                <GestionarRoles />
              </Route>
              <Route path="/ConsultarSolicitud">
                <ConsultarSolicitud />
              </Route>
              <Route path="/Login">
                <IniciarSesion />
              </Route>
              <Route path="/GestionarUsuarios">
                <GestionUsuarios />
              </Route>
              <Route path="/ConsultarPropuesta">
                <ConsultarPropuesta />
              </Route>
              <Route path="/RegistroUps">
                <RegistrarseUps />
              </Route>
              <Route path="/SolicitudInscripcion">
                <ConsultarInscripcion />
              </Route>
              <Route path="/ServicioSocial">
                <Servicios />
              </Route>
              <Route path="/SolicitudProyecto">
                <Proyecto />
              </Route>
            </Switch>
          </Container>
          <Box pt={4}>
            <Copyright />
          </Box>
        </main>
      </Router>
    </div>
  );
}

function RegistroEstudiante() {
  return <EnvioRegistro></EnvioRegistro>;
}
function RegistrarPropuesta() {
  return <EnvioPropuesta></EnvioPropuesta>;
}
function RegistrarSolicitud() {
  return <EnvioSolicitud></EnvioSolicitud>;
}
function GestionarRoles() {
  return <Roles></Roles>;
}
function ConsultarPropuesta() {
  return <Propuestas></Propuestas>;
}
function ConsultarSolicitud() {
  return <Solicitudes></Solicitudes>;
}
function GestionUsuarios() {
  return <Usuarios></Usuarios>;
}
function Inicio() {
  return <InicioInformacion></InicioInformacion>;
}
function IniciarSesion() {
  return <Login />;
}
function RegistrarseUps() {
  return <EnvioRegistroUps />;
}
function ConsultarInscripcion() {
  return <SolicitudInscripcion />;
}
function Servicios() {
  return <ServicioSocial />;
}
function Proyecto() {
  return <SolicitudProyecto />;
}

