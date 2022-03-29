import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { menuPermisos } from '../redux/selectors';

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

export default function SelectPermisos(props) {
    const menu_permisos = useSelector(menuPermisos)

    let permisos = []
    Object.entries(menu_permisos).forEach(([key, v]) => {
        permisos.push({ id: key, value: v });
    });

    return (
        <div>
            <FormControl sx={{ width: 600 }} disabled={props.ver} >
                <InputLabel id="select-permisos-label">Permisos</InputLabel>
                <Select
                    labelId="select-permisos"
                    id="select-permisos"
                    multiple
                    value={props.valor1}
                    onChange={props.handleChange}
                    input={<OutlinedInput label="Permisos" />}
                    MenuProps={MenuProps}
                >
                    {permisos.map((perm) => (
                        <MenuItem key={perm.id} value={parseInt(perm.id)} >{perm.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}