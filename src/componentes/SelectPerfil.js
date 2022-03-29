import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectPerfil(props) {
    
    return (
        <FormControl fullWidth >
            <InputLabel id="select-perfil-label">Perfil</InputLabel>
            <Select
                labelId="select-perfil-label"
                id="select-perfil"
                value={props.valor1}
                label="Perfil"
                onChange={props.handleChange}
            >
                <MenuItem value={0}></MenuItem>
                <MenuItem value={1}>Adminstrador</MenuItem>
                <MenuItem value={2}>Supervisor</MenuItem>
                <MenuItem value={3}>Operador</MenuItem>
            </Select>
        </FormControl>
    );
}