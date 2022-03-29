import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { menuColasEstrategias } from '../redux/selectors';
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
    const menu_colas_estrategias = useSelector(menuColasEstrategias)
    const [lcolas, setLcolas] = useState(menu_colas_estrategias);

    useEffect(() => {
        setLcolas(
            menu_colas_estrategias
        );
    }, [menu_colas_estrategias]);

    let colas = []
    Object.entries(lcolas).forEach(([key, v]) => {
        colas.push({ id: key, value: v });
    });

    return (
        <div>
            <FormControl variant="standard" sx={{ minWidth: '100%' }}>
                <InputLabel id="select-cola-estrategia-label">Estrategia</InputLabel>
                <Select
                    labelId="select-cola-estragia"
                    id="select-cola-estrategia"
                    value={props.valor1 ? props.valor1 : 0}
                    label="Estrategia"
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