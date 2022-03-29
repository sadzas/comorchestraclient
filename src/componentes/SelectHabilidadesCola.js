import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { menuHabilidades } from '../redux/selectors';

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

    let habilidades = []
    Object.entries(menu_habilidades).forEach(([key, v]) => {
        habilidades.push({ id: key, value: v });
    });

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
                    {habilidades.map((habilidad) => (
                        <MenuItem key={habilidad.id} value={parseInt(habilidad.id)} >{habilidad.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}