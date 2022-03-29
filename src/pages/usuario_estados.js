import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SelectEstados from '../componentes/SelectEstados'
import SelectSector from '../componentes/SelectSector'
import SelectUsuarioSector from '../componentes/SelectUsuarioSector'
import { useDispatch, useSelector } from 'react-redux';
import { armoMensajeSaliente } from '../utils/Helpers';
import { msgSalienteAlmacena } from '../redux/actions';
import { usuarioId, menuUsuarios } from '../redux/selectors';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#999',
    },
  },
});

export default function UsuarioEstados() {
  const dispatch = useDispatch()
  const [usuario, setUsuario] = useState('');
  const [estados, setEstados] = useState([]);
  const [sector, setSector] = useState('');
  const usuario_id = useSelector(usuarioId)
  const menu_usuarios = useSelector(menuUsuarios)
  let blockEstados = false

  const sectorSelecciona = (event) => {
    setSector(event.target.value)
  };

  const usuarioSelecciona = (event) => {
    setUsuario(event.target.value)

    setEstados(
      menu_usuarios[event.target.value].usuario_estados
    )
  };

  const estadoSelecciona = (event) => {
    const {
      target: { value },
    } = event;
    setEstados(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const enviarInformacion = (event) => {
    event.preventDefault();

    const mensaje = armoMensajeSaliente(4003, usuario_id, usuario, "", "", "", "", "", "", "", "", estados)
    dispatch(msgSalienteAlmacena(mensaje))
  };

  return (
    <Grid container spacing={20}>
      <Grid item xs={12} lg={12}>
        <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column', height: 'auto', }} >
          <Box component="form" onSubmit={enviarInformacion} sx={{ '& > :not(style)': { m: 1, width: '100%' }, }}>

            <Typography variant="h5" component="h2" align="center" display="block" color="#666">
              ESTADOS DE USUARIO
            </Typography>

            <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
              <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                  Seleccione el Sector del Usuario
                </AppBar>
              </ThemeProvider>
            </Box>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={1} >
              <Grid item xs={6}>
                <Box sx={{ '& > :not(style)': { width: '100%' }, }} noValidate autoComplete="off" required>
                  <SelectSector valor={sector} handleChange={sectorSelecciona} />
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
              <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                  Seleccione el Usuario
                </AppBar>
              </ThemeProvider>
            </Box>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={1} >
              <Grid item xs={6}>
                <Box sx={{ '& > :not(style)': { width: '100%' }, }} noValidate autoComplete="off" required >
                  <SelectUsuarioSector valor1={sector} valor2={usuario} handleChange={usuarioSelecciona} />
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
              <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                  Estados
                </AppBar>
              </ThemeProvider>
            </Box>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={1}>
              <Grid item xs={12}>
                <Box sx={{ '& > :not(style)': { width: '100%' }, }} noValidate autoComplete="off" required>
                  <SelectEstados ver={blockEstados} valor1={sector} valor2={estados} handleChange={estadoSelecciona} />
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