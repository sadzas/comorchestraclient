import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { menuHabilidades, menuSectoresHabilidades } from '../redux/selectors';

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

export default function SelectHabilidadesCola(props) {

    const menu_habilidades = useSelector(menuHabilidades)
    const [habilidades, setHabilidades] = useState(menu_habilidades);
    const menu_sectores_habilidades = useSelector(menuSectoresHabilidades)
    const [sectoresHabilidades, setSectoresHabilidades] = useState(menu_sectores_habilidades);

    useEffect(() => {
        setHabilidades(
            menu_habilidades
        );
    }, [menu_habilidades]);

    useEffect(() => {
        setSectoresHabilidades(
            menu_sectores_habilidades
        );
    }, [menu_sectores_habilidades]);

    let imprime_habilidades = []
    if (typeof(sectoresHabilidades[props.valor1]) !== 'undefined') {
        Object.entries(habilidades).forEach(([key, v]) => {
            if (sectoresHabilidades[props.valor1].includes(parseInt(key))) {
                imprime_habilidades.push({ id: key, value: v });
            }
        });
    }

    return (
        <div>
            <FormControl sx={{ width: 600 }} >
                <InputLabel id="select-habilidades-label">Habilidades</InputLabel>
                <Select
                    labelId="select-habilidades"
                    id="select-habilidades"
                    multiple
                    value={props.valor2}
                    onChange={props.handleChange}
                    input={<OutlinedInput label="Habilidades" />}
                    MenuProps={MenuProps}
                >
                    {imprime_habilidades.map((habilidad) => (
                        <MenuItem key={habilidad.id} value={parseInt(habilidad.id)}>{habilidad.value}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}