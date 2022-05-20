import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { menuEstados, usuarioEstados } from '../redux/selectors';

export default function SelectEstadoUsuario(props) {
    const menu_estados = useSelector(menuEstados)
    const usuario_estados = useSelector(usuarioEstados)
    let imprime_estados = []
    
    Object.entries(menu_estados).forEach(([key, v]) => {
        if (usuario_estados.includes(Math.floor(key))) {
            imprime_estados.push({ id: key, value: v.estado_nombre });
        }
    });

    return (
        <div>
            <FormControl sx={{ m: 1, flexGrow: 1, display: 'flex' }} size="small" >
                <InputLabel id="select-estado-usuario-label">Estado</InputLabel>
                <Select
                    labelId="select-estado-usuario"
                    id="select-estado-usuario"
                    value={props.valor1}
                    label="Estado"
                    onChange={props.handleChange}
                    >
                    {imprime_estados.map((estado) => (
                        <MenuItem key={estado.id} value={parseInt(estado.id)}>
                            <ListItemText primary={estado.value} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}