import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
import { menuSectores } from '../redux/selectors';

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

export default function SelectSectores(props) {
    const menu_sectores = useSelector(menuSectores)

    let sectores = []
    Object.entries(menu_sectores).forEach(([key, v]) => {
        sectores.push({ id: key, value: v });
    });

    return (
        <div>
            <FormControl sx={{ width: 600 }} disabled={props.ver} >
                <InputLabel id="select-sectores-label">Sectores</InputLabel>
                <Select
                    labelId="select-sectores"
                    id="select-sectores"
                    multiple
                    value={props.valor1}
                    onChange={props.handleChange}
                    input={<OutlinedInput label="Sectores" />}
                    renderValue={(selected) =>
                        selected.map((obj) => sectores[obj - 1].value).join(", ")
                    }

                    MenuProps={MenuProps}
                >
                    {sectores.map((sector) => (
                        <MenuItem key={sector.id} value={parseInt(sector.id)}>{sector.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}