import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { menuEstados, menuSectoresEstados } from '../redux/selectors';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

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

function getStyles(seleccion, personName, theme) {
    const b = personName.map(function (i) { return Number(i); });
    return {
        fontWeight:
            b.includes(parseInt(seleccion))
                ? 600
                : 100,
    };
}

export default function SelectEstados(props) {
    const theme = useTheme();
    const menu_estados = useSelector(menuEstados)
    const menu_sectores_estados = useSelector(menuSectoresEstados)
    const [estados, setEstados] = useState(menu_estados);
    const [secEstados, setSecEstados] = useState(menu_sectores_estados);
    let estados_imprime = []

    useEffect(() => {
        setEstados(
            menu_estados
        );
        setSecEstados(
            menu_sectores_estados
        );
    }, [menu_estados, menu_sectores_estados]);

    Object.entries(estados).forEach(([key, v]) => {
        if (secEstados[props.valor1] !== undefined) {
            if (secEstados[props.valor1].includes(Math.floor(key)) && Math.floor(key) != 1) {
                estados_imprime.push({ id: key, value: v.estado_nombre });
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
                    {estados_imprime.map((estado) => (
                        <MenuItem key={estado.id} value={estado.id} style={getStyles(estado.id, props.valor2, theme)}>{estado.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}