import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { menuSectores } from '../redux/selectors';
import { useState, useEffect } from 'react';

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

export default function SelectSector(props) {
    const menu_sectores = useSelector(menuSectores)
    const [lsectores, setLsectores] = useState(menu_sectores);

    useEffect(() => {
        setLsectores(
            menu_sectores
        );
    }, [menu_sectores]);

    let sectores = []
    Object.entries(lsectores).forEach(([key, v]) => {
        sectores.push({ id: key, value: v });
    });

    return (
        <div>
            <FormControl sx={{ width: 600 }} >
                <InputLabel id="select-sector-label">Sector</InputLabel>
                <Select
                    labelId="select-sector"
                    id="select-sector"
                    value={props.valor1}
                    label="Sector"
                    onChange={props.handleChange}
                    >
                    {sectores.map((sector) => (
                        <MenuItem key={sector.id} value={parseInt(sector.id)}>
                            <ListItemText primary={sector.value} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}