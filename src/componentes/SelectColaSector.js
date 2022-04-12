import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { menuColas } from '../redux/selectors';
import { useState, useEffect } from 'react';

export default function SelectCola(props) {
    const menu_colas = useSelector(menuColas)
    const [colas, setColas] = useState(menu_colas);

    useEffect(() => {
        setColas(
            menu_colas
        );
    }, [menu_colas]);

    let imprime_colas = []
    Object.entries(colas).forEach(([key, v]) => {
        if (v.id_sector === props.valor1) {
            imprime_colas.push({ id: key, value: v.cola_nombre });
        }
    });

    return (
        <div>
            <FormControl sx={{ width: 600 }} >
                <InputLabel id="select-cola-label">Cola</InputLabel>
                <Select
                    labelId="select-cola"
                    id="select-cola"
                    value={props.valor2}
                    label="Cola"
                    onChange={props.handleChange}
                >
                    {imprime_colas.map((cola) => (
                        <MenuItem key={cola.id} value={cola.id}>{cola.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}