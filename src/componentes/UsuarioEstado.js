import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SelectEstadoUsuario from '../componentes/SelectEstadoUsuario'
import { usuarioEstadoOperador, usuarioId, usuarioEstadoExtension } from '../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { msgSalienteAlmacena } from '../redux/actions';
import { armoMensajeSaliente } from '../utils/Helpers';

export default function UsuarioEstado() {
    const dispatch = useDispatch()
    const usuario_estado_operador = useSelector(usuarioEstadoOperador);
    const usuario_estado_extension = useSelector(usuarioEstadoExtension);
    const [estado, setEstado] = useState('')
    const usuario_id = useSelector(usuarioId);
    
    let usuarioColor = "default";
    let extensionColor = "default";
    let chatColor = "default";

    const estadoUsuarioSelecciona = (event) => {
        event.preventDefault();
        const mensaje = armoMensajeSaliente(2002, usuario_id, event.target.value)
        dispatch(msgSalienteAlmacena(mensaje))
    };

    useEffect(() => {
        setEstado(usuario_estado_operador)
    }, [usuario_estado_operador]);

    switch (estado) {
        case 1:
            usuarioColor = "success"
            break
        default:
            usuarioColor = "warning"
            break
    }

    switch (usuario_estado_extension) {
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
                        <SelectEstadoUsuario valor1={estado} handleChange={estadoUsuarioSelecciona} />
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