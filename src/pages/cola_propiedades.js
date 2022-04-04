import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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

export default function ColaEditar() {
  const dispatch = useDispatch()
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

  const cola_estrategia = [
    { id: 1, estrategia_nombre: 'Lineal' },
    { id: 2, estrategia_nombre: 'Lineal con Memoria' },
    { id: 3, estrategia_nombre: 'Distribuida' },
  ]
  const cola_ringueo = []
  const cola_espera = []
  const cola_autopausa = []
  const cola_prioridad = []

  for (let j = 5; j < 50; j += 5) {
    cola_ringueo.push(j);
  }

  for (let i = 5; i < 500; i += 5) {
    cola_espera.push(i);
  }

  for (let h = 5; h < 120; h += 5) {
    cola_autopausa.push(h);
  }

  for (let k = 1; k < 99; k++) {
    cola_prioridad.push(k);
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
  };

  const enviarInformacion = (event) => {
    event.preventDefault();

    let datosCola = []
    datosCola.push(colaSeleccionada)
    datosCola.push(colaNueva.id_estrategia)
    datosCola.push(colaNueva.cola_ringueo)
    datosCola.push(colaNueva.cola_espera)
    datosCola.push(colaNueva.cola_autopausa)
    datosCola.push(colaNueva.cola_prioridad)

    const mensaje = armoMensajeSaliente(3003, usuario_id, "", "", "", "", "", "", "", "", "", datosCola)
    dispatch(msgSalienteAlmacena(mensaje))

    setColaNueva([]);
    setColaSeleccionada('')
  };

  return (
    <Grid container spacing={20}>
      <Grid item xs={12} lg={12}>
        <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column', height: 'auto', }} >
          <Box component="form" onSubmit={enviarInformacion} sx={{ '& > :not(style)': { m: 1, width: '100%' }, }}>

            <Typography variant="h5" component="h2" align="center" display="block" color="#666">
              PROPIEDADES DE COLA
            </Typography>

            <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
              <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                  Seleccione la Cola de atención.
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

                <Box sx={{ '& > :not(style)': { width: '100%' }, }} paddingTop={2} noValidate autoComplete="off" required>
                  <FormControl fullWidth>
                    <InputLabel id="select-prioridad-label">Prioridad Cola</InputLabel>
                    <Select labelId="select-prioridad-label" id="cola_prioridad" name="cola_prioridad" value={colaNueva.cola_prioridad ? colaNueva.cola_prioridad : ''} onChange={manejaCambios} label="Prioridad Cola">
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      {cola_prioridad.map((id) => (
                        <MenuItem key={id} value={id}>{id}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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