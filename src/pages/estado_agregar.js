import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SelectSector from '../componentes/SelectSector';
import { useDispatch, useSelector } from 'react-redux';
import { msgSalienteAlmacena } from '../redux/actions';
import { armoMensajeSaliente } from '../utils/Helpers';
import { usuarioId } from '../redux/selectors';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#999',
    },
  },
});

export default function EstadoAgregar() {
  const dispatch = useDispatch()

  const [sector, setSector] = useState('');
  const [estadoNombre, setEstadoNombre] = useState('')
  const [estadoP, setEstadoP] = useState(false);
  const [estadoD, setEstadoD] = useState(false);

  const usuario_id = useSelector(usuarioId)

  const sectorSelecciona = (event) => {
    setSector(event.target.value)
  };

  const manejaCambios = (event) => {
    setEstadoNombre(event.target.value)
  }

  const handleChangeEstadoP = (event) => {
    setEstadoP(event.target.checked);
  };

  const handleChangeEstadoD = (event) => {
    setEstadoD(event.target.checked);
  };

  const enviarInformacion = (event) => {
    event.preventDefault();

    console.log(4601,usuario_id,sector,Number(estadoP),Number(estadoD),"",estadoNombre)
    const mensaje = armoMensajeSaliente(4601,usuario_id,sector,Number(estadoP),Number(estadoD),"",estadoNombre)
    dispatch(msgSalienteAlmacena(mensaje))
  };

  return (
    <Grid container spacing={20}>
      <Grid item xs={12} lg={12}>
        <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column', height: 'auto', }} >
          <Box component="form" onSubmit={enviarInformacion} sx={{ '& > :not(style)': { m: 1, width: '100%' }, }}>

            <Box sx={{ '& > :not(style)': { width: '100%' }, }}>
              <Typography variant="h5" component="h2" align="center" display="block" color="#666">
                AGREGAR ESTADO
              </Typography>
            </Box>

            <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
              <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                  Seleccionar sector del estado.
                </AppBar>
              </ThemeProvider>
            </Box>
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
                  Datos del estado
                </AppBar>
              </ThemeProvider>
            </Box>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={3}>
              <Grid item xs={6}>
                <Box sx={{ '& > :not(style)': { width: '100%' }, }} noValidate autoComplete="off" required>
                  <TextField id="estado_nombre" name="estado_nombre" label="Nombre del estado" value={estadoNombre} variant="outlined" onChange={manejaCambios} />
                  <FormControlLabel id="estadoP" name="estadoP" checked={estadoP} onChange={handleChangeEstadoP} control={<Switch />} label="Estado Productivo" />
                  <FormControlLabel id="estadoD" name="estadoD" checked={estadoD} onChange={handleChangeEstadoD} control={<Switch />} label="Dedicado Usuario Final" />
                </Box>
              </Grid>
            </Grid>

            <Box paddingTop={5}>
              <LoadingButton type="submit" color="secondary" loadingPosition="start" startIcon={<SaveIcon />} variant="contained">
                Save
              </LoadingButton>
            </Box>

          </Box>
        </Paper>
      </Grid>
    </Grid>

  )
}