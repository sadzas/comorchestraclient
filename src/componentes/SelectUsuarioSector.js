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
 * Componente que recibe 2 valores:
 * props.valor1 => El sector seleccionado
 * props.valor2 => El usuario seleccionado
 * 
 * @param {*} props 
 * @returns 
 */
export default function SelectUsuarioSector(props) {
    
    const menu_usuarios = useSelector(menuUsuarios)
    const [usuarios, setUsuarios] = useState(menu_usuarios);
    let imprime_usuarios = []

    useEffect(() => {
        setUsuarios(
            menu_usuarios
        );
    }, [menu_usuarios]);
        
    Object.entries(usuarios).forEach(([key, v]) => {
        if (v.usuario_listaSectores.includes(props.valor1)) {
            imprime_usuarios.push({ id: key, value: v.usuario_apellido + " " + v.usuario_nombre + " | " + v.usuario_usuario});
        }
    });

    return (
        <div>
            <FormControl sx={{ width: 600 }} >
                <InputLabel id="select-usuario-label">Usuario</InputLabel>
                <Select
                    labelId="select-usuario"
                    id="select-usuario"
                    value={props.valor2}
                    label="Operador"
                    onChange={props.handleChange}
                >
                    {imprime_usuarios.map((usuario) => (
                        <MenuItem key={usuario.id} value={parseInt(usuario.id)}>
                            <ListItemText primary={usuario.value} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}