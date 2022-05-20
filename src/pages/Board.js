import * as React from 'react';
import { Switch, Route } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MainListItems from '../componentes/ListItems';
import PanelUsuario from './PanelUsuario'
import PanelMonitoria from './PanelMonitoria'
import Orders from './Orders'
import UsuarioAgregar from './usuario_agregar'
import UsuarioEditar from './usuario_editar'
import SectorAgregar from './sector_agregar'
import ColaAgregar from './cola_agregar'
import ColaEditar from './cola_editar'
import ColaPropiedades from './cola_propiedades'
import ColaHabilidades from './cola_habilidades'
import HabilidadAgregar from './habilidad_agregar'
import HabilidadAgrupar from './habilidad_agrupar'
import HabilidadAsignar from './habilidad_asignar'
import UsuarioPermisos from './usuario_permisos'
import UsuarioHabilidades from './usuario_habilidades'
import UsuarioEstados from './usuario_estados'
import EstadoAgregar from './estado_agregar'
import EstadoAgrupar from './estado_agrupar'
import EstadoAsignar from './estado_asignar'
import EstadoEditar from './estado_editar'
import GrupoHabilidades from './grupo_habilidades'
import GrupoEstados from './grupo_estados'
import Grid from '@mui/material/Grid';
import { usuarioUsuario } from '../redux/selectors';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

export default function Board({ children }) {
  const usuario_usuario = useSelector(usuarioUsuario);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: '24px' /* keep right padding when drawer closed */ }} >
            <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer} sx={{ marginRight: '36px', ...(open && { display: 'none' }), }} >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              {usuario_usuario}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1], }} >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <MainListItems />
          {/*
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondListItems}</List>
          <Divider />
          <List>{thirdListItems}</List>
          <Divider />
          */}
        </Drawer>
        <Box component="main" sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={1}>
              {/*
              <Grid item xs={12} lg={12}>
                <Paper elevation={3} sx={{ p: 1, display: 'flex', flexDirection: 'column', height: 100, marginBottom: 2, }}>
                  <UsuarioEstado />
                </Paper>
              </Grid>
              */}
            </Grid>
            <Switch>
              {/*<Route exact path="/" component={PanelUsuario} />*/}
              <Route path="/usuario_agregar" component={UsuarioAgregar} />
              <Route path="/usuario_editar" component={UsuarioEditar} />
              <Route path="/sector_agregar" component={SectorAgregar} />
              <Route path="/cola_agregar" component={ColaAgregar} />
              <Route path="/cola_editar" component={ColaEditar} />
              <Route path="/habilidad_agregar" component={HabilidadAgregar} />
              <Route path="/habilidad_agrupar" component={HabilidadAgrupar} />
              <Route path="/habilidad_asignar" component={HabilidadAsignar} />
              <Route path="/usuario_permisos" component={UsuarioPermisos} />
              <Route path="/usuario_habilidades" component={UsuarioHabilidades} />
              <Route path="/usuario_estados" component={UsuarioEstados} />
              <Route path="/estado_agregar" component={EstadoAgregar} />
              <Route path="/estado_editar" component={EstadoEditar} />
              <Route path="/estado_agrupar" component={EstadoAgrupar} />
              <Route path="/estado_asignar" component={EstadoAsignar} />
              <Route path="/cola_propiedades" component={ColaPropiedades} />
              <Route path="/cola_habilidades" component={ColaHabilidades} />
              <Route path="/grupo_habilidades" component={GrupoHabilidades} />
              <Route path="/grupo_estados" component={GrupoEstados} />
              <Route path="/orders" component={Orders} />
              <Route path="/panelusuario" component={PanelUsuario} />
              <Route path="/panelmonitoria" component={PanelMonitoria} />
            </Switch>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}