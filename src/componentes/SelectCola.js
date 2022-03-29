import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { menuColas } from '../redux/selectors';
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

export default function SelectCola(props) {
    const menu_colas = useSelector(menuColas)
    const [lcolas, setLcolas] = useState(menu_colas);

    useEffect(() => {
        setLcolas(
            menu_colas
        );
    }, [menu_colas]);

    let colas = []
    Object.entries(lcolas).forEach(([key, v]) => {
        colas.push({ id: key, value: v.cola_nombre });
    });

    return (
        <div>
            <FormControl sx={{ width: 600 }} >
                <InputLabel id="select-cola-label">Cola</InputLabel>
                <Select
                    labelId="select-cola"
                    id="select-cola"
                    value={props.valor1}
                    label="Cola"
                    onChange={props.handleChange}
                >
                    {colas.map((cola) => (
                        <MenuItem key={cola.id} value={cola.id}>{cola.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}