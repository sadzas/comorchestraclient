import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { menuHabilidades, menuSectoresHabilidades } from '../redux/selectors';
import Slider, { SliderThumb } from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

export default function SelectHabilidades(props) {
    const menu_habilidades = useSelector(menuHabilidades)
    const menu_sectores_habilidades = useSelector(menuSectoresHabilidades)
    const [lhabilidades, setLhabilidades] = useState(menu_habilidades);
    const [lshabilidades, setLshabilidades] = useState(menu_sectores_habilidades);

    let sliders = []

    useEffect(() => {
        setLhabilidades(
            menu_habilidades
        );
    }, [menu_habilidades]);

    useEffect(() => {
        setLshabilidades(
            menu_sectores_habilidades
        );
    }, [menu_sectores_habilidades]);

    Object.entries(lhabilidades).forEach(([key, v]) => {
        if (lshabilidades[props.valor1] !== undefined) {
            if (lshabilidades[props.valor1].includes(Math.floor(key))) {
                sliders.push(
                    <div key={key}>
                        <Typography gutterBottom>{v}</Typography>
                        <Slider
                            key={key}
                            valueLabelDisplay="auto"
                            aria-label="custom thumb label"
                            value={props.valor2[key] ? props.valor2[key] : 0}
                            onChange={props.handleChange(key)}
                        />
                    </div>
                )
            }
        }
    });

    return (
        <div>
            {sliders}
        </div>
    );
}