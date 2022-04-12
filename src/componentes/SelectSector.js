import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { menuSectores } from '../redux/selectors';
import { useState, useEffect } from 'react';

export default function SelectSector(props) {
    const menu_sectores = useSelector(menuSectores)
    const [sectores, setSectores] = useState(menu_sectores);

    useEffect(() => {
        setSectores(
            menu_sectores
        );
    }, [menu_sectores]);

    let imprime_sectores = []
    Object.entries(sectores).forEach(([key, v]) => {
        imprime_sectores.push({ id: key, value: v });
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
                    {imprime_sectores.map((sector) => (
                        <MenuItem key={sector.id} value={parseInt(sector.id)}>
                            <ListItemText primary={sector.value} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}