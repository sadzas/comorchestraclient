import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import SelectEstados from '../componentes/SelectEstados'
import SelectUsuariosSector from '../componentes/SelectUsuariosSector'
import SelectSector from '../componentes/SelectSector'
import { useDispatch, useSelector } from 'react-redux';
import { armoMensajeSaliente } from '../utils/Helpers';
import { msgSalienteAlmacena } from '../redux/actions';
import { usuarioId, menuUsuarios } from '../redux/selectors';
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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function EstadoAsignar() {
  const dispatch = useDispatch()
  const [usuarios, setUsuarios] = useState([]);
  const [sector, setSector] = useState('');
  const [estados, setEstados] = useState([]);
  const usuario_id = useSelector(usuarioId)
  const menu_usuarios = useSelector(menuUsuarios)
  let blockEstados = false

  const sectorSelecciona = (event) => {
    setSector(event.target.value)
    setUsuarios([]);
  };

  const usuarioSelecciona = (event) => {
    const {
      target: { value },
    } = event;
    setUsuarios(
      typeof value === 'string' ? value.split(',') : value,
    );
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
    const data = new FormData(event.currentTarget);

    const mensaje = armoMensajeSaliente(4603, usuario_id, "", "", "", "", "", "", "", "", "", usuarios, estados)
    dispatch(msgSalienteAlmacena(mensaje))
  };

  return (
    <Grid container spacing={20}>
      <Grid item xs={12} lg={12}>
        <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column', height: 'auto', }} >
          <Box component="form" onSubmit={enviarInformacion} sx={{ '& > :not(style)': { m: 1, width: '100%' }, }}>

            <Typography variant="h5" component="h2" align="center" display="block" color="#666">
              ASIGNAR ESTADOS
            </Typography>

            <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
              <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                  Seleccionar el Sector del operador
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
                  Seleccionar el Operador
                </AppBar>
              </ThemeProvider>
            </Box>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={1} >
              <Grid item xs={6}>
                <Box sx={{ '& > :not(style)': { width: '100%' }, }} noValidate autoComplete="off" required >
                  <SelectUsuariosSector valor1={sector} valor2={usuarios} handleChange={usuarioSelecciona} />
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ '& > :not(style)': { width: '100%' }, }} >
              <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                  Seleccionar los estados permitidos
                </AppBar>
              </ThemeProvider>
            </Box>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingBottom={1}>
              <Grid item xs={12}>
                <Box sx={{ '& > :not(style)': { width: '80%' }, }} noValidate autoComplete="off" required>
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
    </Grid >

  )
}