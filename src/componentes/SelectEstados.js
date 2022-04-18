import * as React from 'react';
import { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { menuEstados, menuSectoresEstados } from '../redux/selectors';

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

export default function SelectEstados(props) {
    const menu_estados = useSelector(menuEstados)
    const menu_sectores_estados = useSelector(menuSectoresEstados)
    const [estados, setEstados] = useState(menu_estados);
    const [secEstados, setSecEstados] = useState(menu_sectores_estados);
    let imprime_estados = []

    useEffect(() => {
        setEstados(
            menu_estados
        );
    }, [menu_estados]);

    useEffect(() => {
        setSecEstados(
            menu_sectores_estados
        );
    }, [menu_sectores_estados]);
    
    Object.entries(estados).forEach(([key, v]) => {
        if (secEstados[props.valor1] !== undefined) {
            if (secEstados[props.valor1].includes(Math.floor(key)) && Math.floor(key) != 1) {
                imprime_estados.push({ id: key, value: v });
            }
        }
    });

    return (
        <div>
            <FormControl sx={{ width: 600 }} disabled={props.ver} >
                <InputLabel id="select-estado-label">Estados</InputLabel>
                <Select
                    labelId="select-estado"
                    id="select-estado"
                    multiple
                    value={props.valor2}
                    onChange={props.handleChange}
                    input={<OutlinedInput label="Estados" />}
                    MenuProps={MenuProps}
                >
                    {imprime_estados.map((estado) => (
                        <MenuItem key={estado.id} value={parseInt(estado.id)} >{estado.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}