import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { menuUsuarios } from '../redux/selectors';
import { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

/**
 * Componente que recibe 2 valores:
 * props.valor1 => El sector seleccionado
 * props.valor2 => Los usuarios seleccionados
 * 
 * @param {*} props 
 * @returns 
 */
export default function SelectUsuariosSector(props) {
    
    const menu_usuarios = useSelector(menuUsuarios)
    const [lusuarios, setLusuarios] = useState(menu_usuarios);

    useEffect(() => {
        setLusuarios(
            menu_usuarios
        );
    }, [menu_usuarios]);
    
    let usuarios = []
    Object.entries(lusuarios).forEach(([key, v]) => {
        if (v.usuario_sectores.includes(props.valor1)) {
            usuarios.push({ id: key, value: v.usuario_apellido + " " + v.usuario_nombre + " | " + v.usuario_usuario});
        }
    });

    return (
        <div>
            <FormControl sx={{ width: 600 }} >
                <InputLabel id="select-usuario-label">Usuarios</InputLabel>
                <Select
                    labelId="select-usuario"
                    id="select-usuario"
                    multiple
                    value={props.valor2}
                    input={<OutlinedInput label="Usuarios" />}
                    onChange={props.handleChange}
                    MenuProps={MenuProps}
                >
                    {usuarios.map((usuario) => (
                        <MenuItem key={usuario.id} value={parseInt(usuario.id)}>{usuario.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}