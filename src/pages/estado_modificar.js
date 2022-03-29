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
import { usuarioId } from '../redux/selectors';
import { useState, useEffect } from 'react';
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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function UsuarioNuevo() {
  const dispatch = useDispatch()
  const [sector, setSector] = useState('');
  const usuario_id = useSelector(usuarioId)
  let blockSector = false

  useEffect(() => {
    // Luego del render se pide obtener informacion de sectores y permisos
    const mensaje = armoMensajeSaliente(4001, "", usuario_id)
    dispatch(msgSalienteAlmacena(mensaje))
  });

  const sectorSelecciona = (event) => {
    setSector(event.target.value)
  };

  return (
    <Grid container spacing={20}>
      <Grid item xs={12} lg={12}>
        <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column', height: 1040, }} >
          <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '100%' }, }}>
            <Typography variant="h5" component="h2" align="center" display="block" color="#666">
              AGREGAR ESTADO
            </Typography>
          </Box>
          <Box component="form" sx={{ '& > :not(style)': { width: '100%' }, }} >
            <ThemeProvider theme={darkTheme}>
              <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                Datos del estado
              </AppBar>
            </ThemeProvider>
          </Box>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} paddingBottom={3}>
            <Grid item xs={6}>
              <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '100%' }, }} noValidate autoComplete="off" required>
                <TextField id="nombre" label="Nombre" variant="standard" size="small" width="100%" />
                <FormControlLabel control={<Switch defaultChecked />} label="Estado Productivo" />
                <FormControlLabel control={<Switch defaultChecked />} label="Dedicado Usuario Final" />
              </Box>
            </Grid>
          </Grid>
          <Box component="form" sx={{ '& > :not(style)': { width: '100%' }, }} >
            <ThemeProvider theme={darkTheme}>
              <AppBar position="static" color="primary" sx={{ paddingLeft: '50px', color: '#fff' }}>
                Sector del estado
              </AppBar>
            </ThemeProvider>
          </Box>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 6, sm: 2, md: 3 }} paddingTop={1} paddingBottom={1} >
            <Grid item xs={6}>
              <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '100%' }, }} noValidate autoComplete="off" required>
                <SelectSector value={sector} handleChange={sectorSelecciona} />
              </Box>
            </Grid>
          </Grid>
          <Box>
              <LoadingButton type="submit" color="secondary" loadingPosition="start" startIcon={<SaveIcon />} variant="contained">
                Save
              </LoadingButton>
            </Box>
        </Paper>
      </Grid>
    </Grid>

  )
}