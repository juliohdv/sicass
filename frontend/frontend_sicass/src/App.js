import React, { useEffect,} from "react";
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles,  withStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import {Form}  from  'react-bootstrap';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Button, TextField } from "@material-ui/core";
import { itemsVisitante } from "./componentes/itemsVisitante";
import { itemsEstudiante } from "./componentes/itemsEstudiante";
import { itemsFacultad } from "./componentes/itemsFacultad";
import { itemsEscuela } from "./componentes/itemsEscuela";
import { itemsAdmin } from "./componentes/itemsAdmin";
import LogoSicass from "./componentes/LogoSicass";
import EnvioRegistro from "./componentes/EnvioRegistro";
import EnvioPropuesta from "./componentes/EnvioPropuesta";
import EnvioSolicitud from "./componentes/EnvioSolicitud";
import Roles from "./componentes/administrador/Roles";
import Solicitudes from "./componentes/Solicitudes";
import Login from "./componentes/login";
import Propuestas from "./componentes/Propuestas";
import Usuarios from "./componentes/administrador/Usuarios";
import InicioInformacion from "./componentes/InicioInformacion";
import EnvioRegistroUps from "./componentes/estudiante/EnvioRegistroUps";
import SolicitudInscripcion from "./componentes/estudiante/SolicitudInscripcion";
import ServicioSocial from "./componentes/estudiante/ServicioSocial";
import SolicitudProyecto from "./componentes/estudiante/SolicitudProyecto";
import SolicitudesEstudiantes from "./componentes/SolicitudesEstudiantes";
import Docentes  from "./componentes/docente/Docente";
import AsignarEE from "./componentes/docente/AsignarEE";
import { LockOpen } from "@material-ui/icons";
import { Formik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import RegistrarActividad from "./componentes/estudiante/RegistrarActividad";
import SolicitarSS from "./componentes/SolicitudRegistroSS";
import SolicitudUPS from "./componentes/SolicitudRegistroUPS";
import GestionServicioSocial from "./componentes/GestionServicioSocial";
import AsignarPropuesta from "./componentes/AsignarPropuesta";


//LOGIN
/*function leerCookie(nombre){
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
}*/
    
//FIN LOGIN

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
  const [csrfToken, setCsrfToken] = React.useState("")
  const [session, setSession] = React.useState(false)
  const [autenticado, setAutenticado] = React.useState(false)
  const [credenciales, setCredenciales] = React.useState({usuario:'', password:''})
  const [tipoUsuario, setTipoUsuario] = React.useState()
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  function isResponseOK(response){
    if(response.status >=200 && response.status >= 299){
      return response.json()
    }else{
      throw Error(response.statusText)
    }
  }
  function createCookie(key, valor){
    const cookie = escape(key) + "=" + escape(valor) + ";secure;"
    document.cookie = cookie; 
  }
  const handleCSRF = () => {
    fetch("https://juliohdv.pythonanywhere.com/login/csrf/",{
      credentials: "include",
    })
    .then((res)=>{
      let csrfToken = res.headers.get("X-CSRFToken")
      setCsrfToken(csrfToken)
      console.log("csrfToken: "+csrfToken)
    })
  }
  const handleSession = () =>{
    fetch("https://juliohdv.pythonanywhere.com/login/session/",{
      credentials: "include",
    })
    .then((res) => res.json())
    .then((data) =>{
      console.log(data)
      if(data.isAuthenticated){
        setSession(true)
        setAutenticado(true)
      }else{
        setSession(false)
        setAutenticado(false)
        handleCSRF()
      }
    }).catch((err) =>{
      console.log(err)
    })
  }
  const handleDrawerClose = () => {
    setOpen(false);
  };
 
  useEffect(() => { //Equivalente a componentDidMount() solicitamos las session
    handleSession()
  }, [])
  const TextFieldLogin = withStyles({
    root: {
      caretColor: 'white',
      '& .MuiInputBase-input':{
        color: 'white',
      },
      '& label': {
        color: 'white',
      },
      '& label.Mui-focused': {
        color: 'white',
      },
      '& label.Mui-hover': {
        color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
        },
      },
    },
  })(TextField);
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
            if(autenticado){ //Si esta autenticado , dibuja el form logout
              return(
                <Formik
                initialValues={{
                  usuario:"",
                  password:"",
                }}
                onSubmit={async(values) =>{ //AQUI SE HACE EL LOGOUT
                  fetch("https://juliohdv.pythonanywhere.com/login/logout/",{
                    credentials: 'include',
                  })
                  .then(data =>{
                    setAutenticado(false)
                    setCredenciales({usuario:"",password:""})
                    setTipoUsuario("")
                    Swal.fire({
                      position: "center",
                      icon: "info",
                      title: "¡Hasta Luego!",
                      showConfirmButton: false,
                      timer: 2500,
                      willClose: () =>{
                        window.location.href = "/sicass_app/"
                      }
                    });
                  }).catch(error => {
                    console.log(error)
                    setAutenticado(false)
                    setCredenciales({usuario:"",password:""})
                    setTipoUsuario("")
                  })
                }}
              >
                {({handleSubmit,}) =>(
                  <Form className={classes.root} onSubmit={handleSubmit}>
                  <Typography
                variant ="overline"
                color="inherit"
                align="center"
                display="block">
                Bienvenid@: {credenciales.usuario}{"  "} 
                    <Button 
                    variant="contained" 
                    color="default" 
                    startIcon={<LockOpen />}
                    type="submit"
                    >
                      Cerrar Sesión
                    </Button>
                </Typography>
              </Form>
                )}
              </Formik>
               
              );

            }else{
              return( 
              <Formik
                initialValues={{
                  usuario:"",
                  password:"",
                }}
                onSubmit={async(values) =>{ //AQUI SE HACE EL LOGIN
                  await new Promise((resolve) => setTimeout(resolve,500))
                  axios
                    .post("https://juliohdv.pythonanywhere.com/login/login/",{
                      username: values.usuario, password: values.password
                    },{
                      headers:{'Content-Type':'application/json', 'X-CSRFToken': csrfToken}
                    })
                  .then(response =>{
                    setAutenticado(true)
                    setCredenciales({usuario:values.usuario,password:values.password})
                    setTipoUsuario(response.data.tipo_usuario)
                    createCookie("usuario",response.data.username)
                    createCookie("tipo_usuario", response.data.tipo_usuario)
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: response.data.detail + " " + response.data.username,
                      showConfirmButton: false,
                      timer: 2500,
                    });
                  }).catch(error => {
                    
                    setAutenticado(false)
                    setCredenciales({usuario:"",password:""})
                    setTipoUsuario("")
                    Swal.fire({
                      position: "center",
                      icon: "error",
                      title: "No hay conexion con la base de datos, intente en otro momento",
                      showConfirmButton: false,
                      timer: 2500,
                    });
                  })
                }}
              >
                {({values, handleSubmit, handleChange }) =>(
                  <Form className={classes.root} onSubmit={handleSubmit}>
                  <TextFieldLogin  
                  name="usuario"
                  label="Usuario"  
                  variant="outlined"  
                  size="small" 
                  value={values.usuario}
                  onChange={handleChange}/>
                  
                  <TextFieldLogin 
                  id="password" 
                  name="password"
                  type ="password" 
                  label="Password" 
                  variant="outlined" 
                  size="small" 
                  value={values.password}
                  onChange={handleChange}/>
                  <Button 
                  variant="primary" 
                  type="submit" 
                  variant="contained" 
                  color="default" 
                  startIcon={<LockOpen />}
                  size="small" 
                  >
                    Iniciar Sesión
                  </Button>
              </Form>
                )}
              </Formik>
            )}
        })()}
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
          switch(tipoUsuario) {
            case 1: return <List>{itemsEstudiante}</List>;
            case 2: return <List>{itemsFacultad}</List>;
            case 3: return <List>{itemsEscuela}</List>;
            case 4: return <List>{itemsAdmin}</List>;
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
                { !autenticado ? <Redirect to="/" /> : <GestionarRoles />}
              </Route>
              <Route path="/ConsultarSolicitud">
                <ConsultarSolicitud />
              </Route>
              <Route path="/Login">
                <IniciarSesion />
              </Route>
              <Route path="/GestionarUsuarios">
                {!autenticado ? <Redirect to="/" /> : <GestionUsuarios />}
              </Route>
              <Route path="/ConsultarPropuesta">
                <ConsultarPropuesta />
              </Route>
              <Route path="/RegistroUps">
              {!autenticado ? <Redirect to="/" /> : <RegistrarseUps /> }
              </Route>
              <Route path="/SolicitudInscripcion">
              {!autenticado ? <Redirect to="/" /> : <ConsultarInscripcion /> }
              </Route>
              <Route path="/ServicioSocial">
              {!autenticado ? <Redirect to="/" /> : <Servicios /> }
              </Route>
              <Route path="/SolicitudProyecto">
              {!autenticado ? <Redirect to="/" /> : <Proyecto /> }
              </Route>
              <Route path="/ConsultarSolicitudesEstudiantes">
                {!autenticado ? <Redirect to="/" /> : <ConsultarSolicitudesEstudiantes />}
              </Route>
              <Route path="/Docentes">
                {!autenticado ? <Redirect to="/" /> : <Docente />}
              </Route>
              <Route path="/AsignarEE">
                {!autenticado ? <Redirect to="/"/> : <AsignarEncargadoEscuela/>}
              </Route>
              <Route path="/Actividades">
                {!autenticado ? <Redirect to="/" /> : <Actividades />}
              </Route>
              <Route path="/SolicitudRegistroSS">
              {!autenticado ? <Redirect to="/" /> : <SolicitudRegistroSS />}
              </Route>
              <Route path="/SolicitudRegistroUPS">
              {!autenticado ? <Redirect to="/" /> :<SolicitudRegistroUPS />}
              </Route>
              <Route path="/AsignarPropuesta">
              {!autenticado ? <Redirect to="/" /> :<PropuestasAceptadas />}
              </Route>
              <Route path="/PropuestasAceptadas">
                <PropuestasAceptadas />
              </Route>
              <Route path="/GestionServicioSocial">
                <GestionSS />
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
function ConsultarSolicitudesEstudiantes() {
  return <SolicitudesEstudiantes />;
}
function Docente(){
  return <Docentes/>;
}
function AsignarEncargadoEscuela(){
  return <AsignarEE/>
}
function Actividades(){
  return <RegistrarActividad/>
}
function SolicitudRegistroSS(){
  return <SolicitarSS/>;
}
function SolicitudRegistroUPS(){
  return <SolicitudUPS/>;
}

function GestionSS() {
  return <GestionServicioSocial />;
}

function PropuestasAceptadas(){
  return <AsignarPropuesta/>;
}

