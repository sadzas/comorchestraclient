import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { menuEstadosGrupos } from '../redux/selectors';
import { useState, useEffect } from 'react';

/**
 * Componente que recibe 2 valores:
 * props.valor1 => El sector seleccionado
 * props.valor2 => El grupo seleccionado
 * 
 * @param {*} props 
 * @returns 
 */
export default function SelectGrupoEstadosSector(props) {
    
    const menu_estados_grupos = useSelector(menuEstadosGrupos)
    const [grupos, setGrupos] = useState(menu_estados_grupos);

    useEffect(() => {
        setGrupos(
            menu_estados_grupos
        );
    }, [menu_estados_grupos]);
    
    let igrupos = []
    Object.entries(grupos).forEach(([key, v]) => {
        if (v.id_sector === props.valor1) {
            igrupos.push({ id: key, value: v.grupo_estado_nombre});
        }
    });

    return (
        <div>
            <FormControl sx={{ width: 600 }} >
                <InputLabel id="select-grupo-estado-label">Grupo</InputLabel>
                <Select
                    labelId="select-grupo-estado"
                    id="select-usuario-estado"
                    value={props.valor2}
                    label="Grupo"
                    onChange={props.handleChange}
                >
                    {igrupos.map((igrupo) => (
                        <MenuItem key={igrupo.id} value={parseInt(igrupo.id)}>
                            <ListItemText primary={igrupo.value} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}