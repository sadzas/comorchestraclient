import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { menuHabilidadesGrupos } from '../redux/selectors';
import { useState, useEffect } from 'react';

/**
 * Componente que recibe 2 valores:
 * props.valor1 => El sector seleccionado
 * props.valor2 => El grupo seleccionado
 * 
 * @param {*} props 
 * @returns 
 */
export default function SelectGrupoHabilidadesSector(props) {
    
    const menu_habilidades_grupos = useSelector(menuHabilidadesGrupos)
    const [grupos, setGrupos] = useState(menu_habilidades_grupos);

    useEffect(() => {
        setGrupos(
            menu_habilidades_grupos
        );
    }, [menu_habilidades_grupos]);
    
    let igrupos = []
    Object.entries(grupos).forEach(([key, v]) => {
        if (v.id_sector === props.valor1) {
            igrupos.push({ id: key, value: v.grupo_habilidad_nombre});
        }
    });

    return (
        <div>
            <FormControl sx={{ width: 600 }} >
                <InputLabel id="select-grupo-habilidad-label">Grupo</InputLabel>
                <Select
                    labelId="select-grupo-habilidad"
                    id="select-usuario-habilidad"
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