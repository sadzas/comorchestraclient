import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SelectEstadoUsuario from '../componentes/SelectEstadoUsuario'
import { operadorEstadoGeneral, usuarioId, operadorEstadoExtension } from '../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { msgSalienteAlmacena } from '../redux/actions';
import { armoMensajeSaliente } from '../utils/Helpers';
import { useState, useEffect } from 'react';


export default function UsuarioEstado() {
    const dispatch = useDispatch()
    const operador_estado_general = useSelector(operadorEstadoGeneral);
    const [estado, setEstado] = useState(operador_estado_general);
    const usuario_id = useSelector(usuarioId);
    const operador_estado_extension = useSelector(operadorEstadoExtension);
    let usuarioColor = "default";
    let extensionColor = "default";
    let chatColor = "default";

    const estadoUsuarioSelecciona = (event) => {
        event.preventDefault();
        setEstado(event.target.value)
        const mensaje = armoMensajeSaliente(2002, usuario_id, event.target.value)
        dispatch(msgSalienteAlmacena(mensaje))
    };

    switch (estado) {
        case 1:
            usuarioColor = "success"
            break
        default:
            usuarioColor = "warning"
            break
    }

    switch (operador_estado_extension) {
        case "1":
            extensionColor = "success"
            break
        default:
            extensionColor = "warning"
            break
    }
    
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} alignItems="center" >
                    <Grid item xs={4} alignItems="center">
                        <SelectEstadoUsuario value={estado} handleChange={estadoUsuarioSelecciona} />
                    </Grid>
                    <Grid item xs={6} alignItems="center">
                        <Grid container spacing={1} columns={12} >
                            <Grid item xs={3} >
                                <Chip color={usuarioColor} label="Operador" avatar={<Avatar>O</Avatar>} />
                            </Grid>
                            <Grid item xs={3}>
                                <Chip color={extensionColor} label="Extension" avatar={<Avatar>E</Avatar>} />
                            </Grid>
                            <Grid item xs={3}>
                                <Chip color={chatColor} label="Chat" avatar={<Avatar>C</Avatar>} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

        </div>
    );
}