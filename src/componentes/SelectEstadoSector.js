import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { menuEstados, menuSectoresEstados } from '../redux/selectors';
import { useState, useEffect } from 'react';

export default function SelectSector(props) {
    const menu_estados = useSelector(menuEstados)
    const menu_sectores_estados = useSelector(menuSectoresEstados)
    const [estados, setEstados] = useState(menu_estados);
    const [sectoresEstados, setSectoresEstados] = useState(menu_sectores_estados);

    useEffect(() => {
        setEstados(
            menu_estados
        );
    }, [menu_estados, menu_sectores_estados]);

    let imprime_estados = []
    Object.entries(estados).forEach(([key, v]) => {
        if (sectoresEstados[props.valor1] !== undefined) {
            if (sectoresEstados[props.valor1].includes(parseInt(key)) && Math.floor(key) != 1) {
                imprime_estados.push({ id: key, value: v.estado_nombre });
            }
        }   
    });

    return (
        <div>
            <FormControl sx={{ width: 600 }} >
                <InputLabel id="select-estado-label">Estado</InputLabel>
                <Select
                    labelId="select-estado"
                    id="select-estado"
                    value={props.valor2}
                    label="Sector"
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