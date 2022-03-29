import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import SelectSector from '../componentes/SelectSector';
import { useDispatch, useSelector } from 'react-redux';
import { msgSalienteAlmacena } from '../redux/actions';
import { armoMensajeSaliente } from '../utils/Helpers';
import { usuarioId, menuColas } from '../redux/selectors';
import { useState, useEffect } from 'react';
import SelectCola from '../componentes/SelectCola'
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#999',
    },
  },
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ColaEditar() {
  const dispatch = useDispatch()
  const [sector, setSector] = useState('');
  const [colas, setColas] = useState('');
  const [colaSeleccionada, setColaSeleccionada] = useState('');
  const [colaNueva, setColaNueva] = useState([]);
  const usuario_id = useSelector(usuarioId)
  const menu_colas = useSelector(menuColas)

  useEffect(() => {
    setColas(
      menu_colas
    );
  }, [menu_colas]);

  const cola_numero = [];
  const cola_estrategia = [
    { id: 1, estrategia_nombre: 'Lineal' },
    { id: 2, estrategia_nombre: 'Lineal con Memoria' },
    { id: 3, estrategia_nombre: 'Distribuida' },
  ]
  const cola_ringueo = []
  const cola_espera = []
  const cola_autopausa = []

  for (let j = 5; j < 50; j += 5) {
    cola_ringueo.push(j);
  }

  for (let i = 5; i < 500; i += 5) {
    cola_espera.push(i);
  }

  for (let h = 5; h < 120; h += 5) {
    cola_autopausa.push(h);
  }

  const manejaCambios = (event) => {
    setColaNueva({
      ...colaNueva,
      [event.target.name]: event.target.value
    });
  }

  const colaSelecciona = (event) => {
    setColaSeleccionada(event.target.value)
    setColaNueva(colas[event.target.value])
    setSector(colas[event.target.value].id_sector)
  };

  const sectorSelecciona = (event) => {
    setSector(event.target.value)
  };

  const enviarInformacion = (event) => {
    event.preventDefault();

    let datosCola = []
    datosCola.push(colaSeleccionada)
    datosCola.push(colaNueva.id_estrategia)
    datosCola.push(colaNueva.cola_ringueo)
    datosCola.push(colaNueva.cola_espera)
    datosCola.push(colaNueva.cola_autopausa)
    
    console.log(3002, usuario_id, sector, "", "", "", colaNueva.cola_nombre, "", "", "", "", datosCola)

    const mensaje = armoMensajeSaliente(3002, usuario_id, sector, "", "", "", colaNueva.cola_nombre, "", "", "", "", datosCola)
    dispatch(msgSalienteAlmacena(mensaje))

    setSector('')
    setColaNueva([]);
    setColaSeleccionada('')
  };

  return (
    <Grid container spacing={20}>
      <Grid item xs={12} lg={12}>
        <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column', height: 'auto', }} >
          <Box component="form" onSubmit={enviarInformacion} sx={{ '& > :not(style)': { m: 1, width: '100%' }, }}>

            <Typography variant="h5" component="h2" align="center" display="block" color="#666">
              EDITAR COLA
            </Typography>

            <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
              <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                  Seleccione Cola de atención.
                </AppBar>
              </ThemeProvider>
            </Box>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={1} >
              <Grid item xs={6}>
                <Box sx={{ '& > :not(style)': { width: '100%' }, }} noValidate autoComplete="off" required >
                  <SelectCola valor1={colaSeleccionada} handleChange={colaSelecciona} />
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
              <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                  Datos de la Cola
                </AppBar>
              </ThemeProvider>
            </Box>

            <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={3}>
              <Grid item xs={6}>

                <Box sx={{ '& > :not(style)': { width: '100%' }, }} noValidate autoComplete="off" required>
                  <TextField id="cola_nombre" name="cola_nombre" label="Nombre" value={colaNueva.cola_nombre ? colaNueva.cola_nombre : ''} onChange={manejaCambios} variant="outlined" />
                </Box>

                <Box sx={{ '& > :not(style)': { width: '100%' }, }} paddingTop={2} noValidate autoComplete="off" required>
                  <FormControl fullWidth>
                    <InputLabel id="select-estrategia-label">Estrategia Cola</InputLabel>
                    <Select labelId="select-estrategia-label" id="id_estrategia" name="id_estrategia" value={colaNueva.id_estrategia ? colaNueva.id_estrategia : ''} onChange={manejaCambios} label="Estrategia Cola">
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      {cola_estrategia.map((c) => (
                        <MenuItem key={c.id} value={c.id}>{c.estrategia_nombre}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ '& > :not(style)': { width: '100%' }, }} paddingTop={2} noValidate autoComplete="off" required>
                  <FormControl fullWidth>
                    <InputLabel id="select-ringueo-label">Ringueos Cola</InputLabel>
                    <Select labelId="select-ringueo-label" id="cola_ringueo" name="cola_ringueo" value={colaNueva.cola_ringueo ? colaNueva.cola_ringueo : ''} onChange={manejaCambios} label="Ringueos Cola">
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      {cola_ringueo.map((id) => (
                        <MenuItem key={id} value={id}>{id}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ '& > :not(style)': { width: '100%' }, }} paddingTop={2} noValidate autoComplete="off" required>
                  <FormControl fullWidth>
                    <InputLabel id="select-espera-label">Espera Cola</InputLabel>
                    <Select labelId="select-espera-label" id="cola_espera" name="cola_espera" value={colaNueva.cola_espera ? colaNueva.cola_espera : ''} onChange={manejaCambios} label="Espera Cola">
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      {cola_espera.map((id) => (
                        <MenuItem key={id} value={id}>{id}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ '& > :not(style)': { width: '100%' }, }} paddingTop={2} noValidate autoComplete="off" required>
                  <FormControl fullWidth>
                    <InputLabel id="select-autopausa-label">Autopausa Cola</InputLabel>
                    <Select labelId="select-autopausa-label" id="cola_autopausa" name="cola_autopausa" value={colaNueva.cola_autopausa ? colaNueva.cola_autopausa : ''} onChange={manejaCambios} label="Autopausa Cola">
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      {cola_autopausa.map((id) => (
                        <MenuItem key={id} value={id}>{id}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
              <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                  Sector de la Cola
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

            <Box paddingTop={5}>
              <LoadingButton type="submit" color="secondary" loadingPosition="start" startIcon={<SaveIcon />} variant="contained">
                Guardar
              </LoadingButton>
            </Box>

          </Box>
        </Paper>
      </Grid>
    </Grid >

  )
}