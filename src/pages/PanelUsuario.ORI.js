import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Pestanas from '../componentes/Pestanas';
import ChatGeneral from '../componentes/ChatGeneral';
import UsuarioEstado from '../componentes/UsuarioEstado';

export default function PanelUsuario() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 100, }}>
                    <UsuarioEstado />
                </Paper>
            </Grid>
            <Grid item xs={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 440, }} >
                    <Pestanas />
                </Paper>
            </Grid>
            <Grid item xs={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 250, }}>
                    <ChatGeneral />
                </Paper>
            </Grid>
        </Grid>
    )
}