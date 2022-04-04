import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SelectHabilidades from '../componentes/SelectHabilidades'
import TextField from '@mui/material/TextField';
import SelectSector from '../componentes/SelectSector'
import { useDispatch, useSelector } from 'react-redux';
import { armoMensajeSaliente } from '../utils/Helpers';
import { msgSalienteAlmacena } from '../redux/actions';
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

export default function HabilidadAgrupar() {
  const dispatch = useDispatch()
  const [sector, setSector] = useState('');
  const [grupoNombre, setGrupoNombre] = useState('');
  const [habilidades, setHabilidades] = useState([]);
  const usuario_id = useSelector(usuarioId)
  let blockHabilidades = false

  const sectorSelecciona = (event) => {
    setSector(event.target.value)
  };

  const habilidadSelecciona = name => (event) => {
    const {
      target: { value },
    } = event;
    setHabilidades({ ...habilidades, [name]: value })
  };

  const manejaCambios = (event) => {
    setGrupoNombre(event.target.value)
  }

  const enviarInformacion = (event) => {
    event.preventDefault();

    let envia_habilidades_valor = []
    Object.entries(habilidades).forEach(([key, v]) => {
      envia_habilidades_valor.push(Math.floor(key), v)
    });

    const mensaje = armoMensajeSaliente(4402, usuario_id, sector, "", "", "", grupoNombre, "", "", "", "", envia_habilidades_valor)
    dispatch(msgSalienteAlmacena(mensaje))

    setSector('')
    setGrupoNombre('')
    setHabilidades([])
  };

  return (
    <Grid container spacing={20}>
      <Grid item xs={12} lg={12}>
        <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column', height: 'auto', }} >
          <Box component="form" onSubmit={enviarInformacion} sx={{ '& > :not(style)': { m: 1, width: '100%' }, }}>

            <Typography variant="h5" component="h2" align="center" display="block" color="#666">
              AGRUPAR HABILIDADES
            </Typography>

            <Box sx={{ '& > :not(style)': { width: '100%' }, }}>
              <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                  Sector del Grupo
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
                  Nombre del Grupo
                </AppBar>
              </ThemeProvider>
            </Box>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={1}>
              <Grid item xs={6}>
                <Box sx={{ '& > :not(style)': { width: '100%' }, }} noValidate autoComplete="off" required>
                  <TextField id="grupo_nombre" name="grupo_nombre" label="Nombre" value={grupoNombre} variant="outlined" onChange={manejaCambios} />
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
                  <SelectHabilidades ver={blockHabilidades} valor1={sector} valor2={habilidades} handleChange={habilidadSelecciona} />
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