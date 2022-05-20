import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { menuUsuarios } from '../redux/selectors';
import { useState, useEffect } from 'react';

/**
 * Componente que recibe 1 valor:
 * props.valor1 => El usuario seleccionado
 * 
 * @param {*} props 
 * @returns 
 */
export default function SelectUsuario(props) {
    const menu_usuarios = useSelector(menuUsuarios)
    const [usuarios, setUsuarios] = useState(menu_usuarios);
    let usuarios_imprime = []

    useEffect(() => {
        setUsuarios(
            menu_usuarios
        );
    }, [menu_usuarios]);
    
    Object.entries(usuarios).forEach(([key, v]) => {
        usuarios_imprime.push({ id: key, value: v.usuario_apellido + " " + v.usuario_nombre + " | " + v.usuario_usuario});
    });

    return (
        <div>
            <FormControl sx={{ width: 600 }} >
                <InputLabel id="select-usuario-label">Usuario</InputLabel>
                <Select
                    labelId="select-usuario"
                    id="select-usuario"
                    value={props.valor1}
                    label="Operador"
                    onChange={props.handleChange}
                >
                    {usuarios_imprime.map((usuario) => (
                        <MenuItem key={usuario.id} value={parseInt(usuario.id)}>
                            <ListItemText primary={usuario.value} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}