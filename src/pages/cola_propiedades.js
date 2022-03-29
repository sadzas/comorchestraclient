import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SelectCola from '../componentes/SelectCola'
import SelectColaEstrategia from '../componentes/SelectColaEstrategia'
import { useDispatch } from 'react-redux';
import { armoMensajeSaliente } from '../utils/Helpers';
import { msgSalienteAlmacena } from '../redux/actions';
import { useSelector } from 'react-redux';
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

export default function ColaPropiedades() {
  const dispatch = useDispatch()
  const [cola, setCola] = useState('')
  const [estrategia, setEstrategia] = useState('')
  const [colaPropiedades, setColaPropiedades] = useState([{}])
  const menu_colas = useSelector(menuColas)
  const usuario_id = useSelector(usuarioId)

  const colaSelecciona = (event) => {
    setCola(event.target.value)
    setColaPropiedades(menu_colas[event.target.value])
    setEstrategia(menu_colas[event.target.value].id_estrategia)
  };

  const estrategiaSelecciona = (event) => {
    setEstrategia(event.target.value)
  };

  const handleChange = (event) => {
    setColaPropiedades({
      ...colaPropiedades,
      [event.target.id]: event.target.value
    });
  }

  const enviarInformacion = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let cola_retorno = new Array();
    cola_retorno.push(estrategia)
    cola_retorno.push(data.get('cola_ringueo'))
    cola_retorno.push(data.get('cola_espera'))
    cola_retorno.push(data.get('cola_autopausa'))
    cola_retorno.push(data.get('cola_prioridad'))

    const mensaje = armoMensajeSaliente(3003, usuario_id, cola, "", "", "", "", "", "", "", "", cola_retorno)
    dispatch(msgSalienteAlmacena(mensaje))
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
                  Seleccione Cola
                </AppBar>
              </ThemeProvider>
            </Box>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={1} >
              <Grid item xs={6}>
                <Box sx={{ '& > :not(style)': { width: '100%' }, }} noValidate autoComplete="off" required >
                  <SelectCola valor1={cola} handleChange={colaSelecciona} />
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
              <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                  Propiedades
                </AppBar>
              </ThemeProvider>
            </Box>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={3}>
              <Grid item xs={6}>
                <Box sx={{ '& > :not(style)': { m: 1, width: '100%' }, }} noValidate required>
                  <SelectColaEstrategia valor1={estrategia} handleChange={estrategiaSelecciona} />
                  <TextField id="cola_ringueo" name="cola_ringueo" label="Tiempo Ringueo" variant="standard" size="small" type="number" value={colaPropiedades.cola_ringueo ? colaPropiedades.cola_ringueo : ''} onChange={handleChange} />
                  <TextField id="cola_espera" name="cola_espera" label="Tiempo Total" variant="standard" size="small" type="number" value={colaPropiedades.cola_espera ? colaPropiedades.cola_espera : ''} onChange={handleChange} />
                  <TextField id="cola_autopausa" name="cola_autopausa" label="Tiempo AutoPausa" variant="standard" size="small" type="number" value={colaPropiedades.cola_autopausa ? colaPropiedades.cola_autopausa : ''} onChange={handleChange} />
                  <TextField id="cola_prioridad" name="cola_prioridad" label="Prioridad" variant="standard" size="small" type="number" value={colaPropiedades.cola_prioridad ? colaPropiedades.cola_prioridad : ''} onChange={handleChange} />
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