import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SelectSectores from '../componentes/SelectSectores';
import SelectSector from '../componentes/SelectSector';
import SelectPerfil from '../componentes/SelectPerfil'
import SelectPermisos from '../componentes/SelectPermisos'
import { useDispatch, useSelector } from 'react-redux';
import { msgSalienteAlmacena } from '../redux/actions';
import { armoMensajeSaliente } from '../utils/Helpers';
import { usuarioId } from '../redux/selectors';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#999',
    },
  },
});

export default function UsuarioAgregar() {
  const dispatch = useDispatch()
  const [perfil, setPerfil] = useState('');
  const [sectores, setSectores] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [usuarioNuevo, setUsuarioNuevo] = useState([]);
  const [blockSectores, setBlocksectores] = useState(true)
  const [blockPermisos, setBlockpermisos] = useState(true)
  const usuario_id = useSelector(usuarioId)

  const perfilSelecciona = (event) => {
    setPerfil(event.target.value)
    if (event.target.value === 1) {
      setPermisos([])
      setSectores([])
      setBlocksectores(true)
      setBlockpermisos(true)
    }
    if (event.target.value === 2) {
      setPermisos([])
      setSectores([])
      setBlocksectores(false)
      setBlockpermisos(false)
    }
    if (event.target.value === 3) {
      setPermisos([])
      setSectores([])
      setBlocksectores(false)
      setBlockpermisos(true)
    }
  };

  const manejaCambios = (event) => {
    setUsuarioNuevo({
      ...usuarioNuevo,
      [event.target.name]: event.target.value
    });
  }

  const sectorSelecciona = (event) => {
    const {
      target: { value },
    } = event;

    setSectores(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const permisoSelecciona = (event) => {
    const {
      target: { value },
    } = event;

    setPermisos(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const enviarInformacion = (event) => {
    event.preventDefault();
    let tempArraySector = []
    if (perfil === 3) {
      tempArraySector.push(sectores)
    } else {
      tempArraySector = sectores
    }

    const mensaje = armoMensajeSaliente(2201, usuario_id, perfil, "", "", "", usuarioNuevo.usuario_nombre, usuarioNuevo.usuario_apellido, usuarioNuevo.usuario_correo, usuarioNuevo.usuario_usuario, "", tempArraySector, permisos)
    dispatch(msgSalienteAlmacena(mensaje))
    
    setPerfil('')
    setSectores([])
    setPermisos([])
    setUsuarioNuevo([])
  };

  if (perfil === 3) {
    return (
      <Grid container spacing={20}>
        <Grid item xs={12} lg={12}>
          <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column', height: 'auto', }} >
            <Box component="form" onSubmit={enviarInformacion} sx={{ '& > :not(style)': { m: 1, width: '100%' }, }}>

              <Typography variant="h5" component="h2" align="center" display="block" color="#666">
                AGREGAR USUARIO
              </Typography>

              <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
                <ThemeProvider theme={darkTheme}>
                  <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                    Datos de Usuario
                  </AppBar>
                </ThemeProvider>
              </Box>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={2}>
                <Grid item xs={6}>
                  <Box sx={{ '& > :not(style)': { width: '100%' }, }} noValidate autoComplete="off" required>
                    <TextField id="usuario_nombre" name="usuario_nombre" label="Nombre" value={usuarioNuevo.usuario_nombre ? usuarioNuevo.usuario_nombre : ''} onChange={manejaCambios} variant="outlined" />
                  </Box>
                  <Box sx={{ '& > :not(style)': { width: '100%' }, }} paddingTop={2} noValidate autoComplete="off" required>
                    <TextField id="usuario_apellido" name="usuario_apellido" label="Apellido" value={usuarioNuevo.usuario_apellido ? usuarioNuevo.usuario_apellido : ''} onChange={manejaCambios} variant="outlined" />
                  </Box>
                  <Box sx={{ '& > :not(style)': { width: '100%' }, }} paddingTop={2} noValidate autoComplete="off" required>
                    <TextField id="usuario_correo" name="usuario_correo" label="Correo" value={usuarioNuevo.usuario_correo ? usuarioNuevo.usuario_correo : ''} onChange={manejaCambios} variant="outlined" type="email" />
                  </Box>
                  <Box sx={{ '& > :not(style)': { width: '100%' }, }} paddingTop={2} noValidate autoComplete="off" required>
                    <TextField id="usuario_usuario" name="usuario_usuario" label="Usuario" value={usuarioNuevo.usuario_usuario ? usuarioNuevo.usuario_usuario : ''} onChange={manejaCambios} variant="outlined" />
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
                <ThemeProvider theme={darkTheme}>
                  <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                    Perfil del Usuario
                  </AppBar>
                </ThemeProvider>
              </Box>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={1} >
                <Grid item xs={6}>
                  <Box sx={{ '& > :not(style)': { width: '100%' }, }} noValidate autoComplete="off" required>
                    <SelectPerfil valor1={perfil} handleChange={perfilSelecciona} />
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
                <ThemeProvider theme={darkTheme}>
                  <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                    Sectores del Usuario
                  </AppBar>
                </ThemeProvider>
              </Box>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={1} >
                <Grid item xs={6}>
                  <Box sx={{ '& > :not(style)': { width: '100%' }, }} noValidate autoComplete="off" required>
                    <SelectSector ver={blockSectores} valor1={sectores} handleChange={sectorSelecciona} />
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
                <ThemeProvider theme={darkTheme}>
                  <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                    Permisos
                  </AppBar>
                </ThemeProvider>
              </Box>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={1}>
                <Grid item xs={6}>
                  <Box sx={{ '& > :not(style)': { width: '100%' }, }} noValidate autoComplete="off" required>
                    <SelectPermisos ver={blockPermisos} valor1={permisos} handleChange={permisoSelecciona} />
                  </Box>
                </Grid>
              </Grid>

              <Box paddingTop={5}>
                <LoadingButton type="submit" color="secondary" loadingPosition="start" startIcon={<SaveIcon />} variant="contained">
                  Guardar
                </LoadingButton>
              </Box>

            </Box>
          </Paper>
        </Grid>
      </Grid>

    )
  } else {

    return (
      <Grid container spacing={20}>
        <Grid item xs={12} lg={12}>
          <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column', height: 'auto', }} >
            <Box component="form" onSubmit={enviarInformacion} sx={{ '& > :not(style)': { m: 1, width: '100%' }, }}>

              <Typography variant="h5" component="h2" align="center" display="block" color="#666">
                AGREGAR USUARIO
              </Typography>

              <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
                <ThemeProvider theme={darkTheme}>
                  <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                    Datos de Usuario
                  </AppBar>
                </ThemeProvider>
              </Box>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={2}>
                <Grid item xs={6}>
                  <Box sx={{ '& > :not(style)': { width: '100%' }, }} noValidate autoComplete="off" required>
                    <TextField id="usuario_nombre" name="usuario_nombre" label="Nombre" value={usuarioNuevo.usuario_nombre ? usuarioNuevo.usuario_nombre : ''} onChange={manejaCambios} variant="outlined" />
                  </Box>
                  <Box sx={{ '& > :not(style)': { width: '100%' }, }} paddingTop={2} noValidate autoComplete="off" required>
                    <TextField id="usuario_apellido" name="usuario_apellido" label="Apellido" value={usuarioNuevo.usuario_apellido ? usuarioNuevo.usuario_apellido : ''} onChange={manejaCambios} variant="outlined" />
                  </Box>
                  <Box sx={{ '& > :not(style)': { width: '100%' }, }} paddingTop={2} noValidate autoComplete="off" required>
                    <TextField id="usuario_correo" name="usuario_correo" label="Correo" value={usuarioNuevo.usuario_correo ? usuarioNuevo.usuario_correo : ''} onChange={manejaCambios} variant="outlined" type="email" />
                  </Box>
                  <Box sx={{ '& > :not(style)': { width: '100%' }, }} paddingTop={2} noValidate autoComplete="off" required>
                    <TextField id="usuario_usuario" name="usuario_usuario" label="Usuario" value={usuarioNuevo.usuario_usuario ? usuarioNuevo.usuario_usuario : ''}  onChange={manejaCambios} variant="outlined" />
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
                <ThemeProvider theme={darkTheme}>
                  <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                    Perfil del Usuario
                  </AppBar>
                </ThemeProvider>
              </Box>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={1} >
                <Grid item xs={6}>
                  <Box sx={{ '& > :not(style)': { width: '100%' }, }} noValidate autoComplete="off" required>
                    <SelectPerfil valor1={perfil} handleChange={perfilSelecciona} />
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
                <ThemeProvider theme={darkTheme}>
                  <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                    Sectores del Usuario
                  </AppBar>
                </ThemeProvider>
              </Box>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={1} >
                <Grid item xs={6}>
                  <Box sx={{ '& > :not(style)': { width: '100%' }, }} noValidate autoComplete="off" required>
                    <SelectSectores ver={blockSectores} valor1={sectores} handleChange={sectorSelecciona} />
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
                <ThemeProvider theme={darkTheme}>
                  <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                    Permisos
                  </AppBar>
                </ThemeProvider>
              </Box>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={1}>
                <Grid item xs={6}>
                  <Box sx={{ '& > :not(style)': { width: '100%' }, }} noValidate autoComplete="off" required>
                    <SelectPermisos ver={blockPermisos} valor1={permisos} handleChange={permisoSelecciona} />
                  </Box>
                </Grid>
              </Grid>

              <Box paddingTop={5}>
                <LoadingButton type="submit" color="secondary" loadingPosition="start" startIcon={<SaveIcon />} variant="contained">
                  Guardar
                </LoadingButton>
              </Box>

            </Box>
          </Paper>
        </Grid>
      </Grid>

    )
  }
}