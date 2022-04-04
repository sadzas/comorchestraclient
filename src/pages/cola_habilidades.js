import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SelectHabilidadesCola from '../componentes/SelectHabilidadesCola'
import SelectColaSector from '../componentes/SelectColaSector'
import SelectSector from '../componentes/SelectSector'
import { armoMensajeSaliente } from '../utils/Helpers';
import { msgSalienteAlmacena } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { usuarioId, menuColas } from '../redux/selectors';
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

export default function ColaHabilidades() {
  const dispatch = useDispatch()
  const [cola, setCola] = useState('');
  const [sector, setSector] = useState('');
  const [habilidades, setHabilidades] = useState([]);
  const usuario_id = useSelector(usuarioId)
  const menu_colas = useSelector(menuColas)

  const sectorSelecciona = (event) => {
    setSector(event.target.value)
    setHabilidades([])
  };

  const colaSelecciona = (event) => {
    setCola(event.target.value)
    setHabilidades(
      menu_colas[event.target.value].cola_habilidades
    )
  };

  const habilidadSelecciona = (event) => {
    const {
      target: { value },
    } = event;
    setHabilidades(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const enviarInformacion = (event) => {
    event.preventDefault();

    const mensaje = armoMensajeSaliente(3004, usuario_id, cola, "", "", "", "", "", "", "", "", habilidades)
    dispatch(msgSalienteAlmacena(mensaje))
  };

  return (
    <Grid container spacing={20}>
      <Grid item xs={12} lg={12}>
        <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column', height: 'auto', }} >
          <Box component="form" onSubmit={enviarInformacion} sx={{ '& > :not(style)': { m: 1, width: '100%' }, }}>

            <Typography variant="h5" component="h2" align="center" display="block" color="#666">
              HABILIDADES DE COLA
            </Typography>

            <ThemeProvider theme={darkTheme}>
              <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                Sector de la Cola
              </AppBar>
            </ThemeProvider>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={1} >
              <Grid item xs={6}>
                <Box sx={{ '& > :not(style)': { width: '100%' }, }} noValidate autoComplete="off" required>
                  <SelectSector valor1={sector} handleChange={sectorSelecciona} />
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
              <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                  Cola
                </AppBar>
              </ThemeProvider>
            </Box>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={1} >
              <Grid item xs={6}>
                <Box sx={{ '& > :not(style)': { width: '100%' }, }} noValidate autoComplete="off" required >
                  <SelectColaSector valor1={sector} valor2={cola} handleChange={colaSelecciona} />
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
              <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                  Habilidades
                </AppBar>
              </ThemeProvider>
            </Box>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={1}>
              <Grid item xs={12}>
                <Box sx={{ '& > :not(style)': { width: '80%' }, }} noValidate autoComplete="off" required>
                  <SelectHabilidadesCola valor1={sector} valor2={habilidades} handleChange={habilidadSelecciona} />
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