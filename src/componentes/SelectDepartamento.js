import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { menuDepartamentos } from '../redux/selectors';
import { useState, useEffect } from 'react';

export default function SelectDepartamento(props) {
    const menu_departamentos = useSelector(menuDepartamentos)
    const [departamentos, setDepartamentos] = useState(menu_departamentos);
    let imprime_departamentos = []

    useEffect(() => {
        setDepartamentos(
            menu_departamentos
        );
    }, [menu_departamentos]);
    
    Object.entries(departamentos).forEach(([key, v]) => {
        imprime_departamentos.push({ id: key, value: v });
    });

    return (
        <div>
            <FormControl sx={{ width: 600 }} >
                <InputLabel id="select-departamento-label">Departamento</InputLabel>
                <Select
                    labelId="select-departamento"
                    id="select-departamento"
                    value={props.valor1}
                    label="Departamento"
                    onChange={props.handleChange}
                    >
                    {imprime_departamentos.map((departamento) => (
                        <MenuItem key={departamento.id} value={parseInt(departamento.id)}>
                            <ListItemText primary={departamento.value} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}