import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { menuEstados, menuUsuarios } from '../redux/selectors';

const theme = createTheme({
    palette: {
        amarillo: {
            main: '#B7950B',
            contrastText: '#fff',
        },

    },
});

export default function EstadoRT(props) {
    const menu_estados = useSelector(menuEstados)
    const menu_usuarios = useSelector(menuUsuarios)
    const [tipo, setTipo] = useState('success')
    const [estadoNombre, setEstadoNombre] = useState('')

    let id_usuario = props.valor1.row.id_usuario
    let id_estado = menu_usuarios[id_usuario].operador_estado_general

    useEffect(() => {
        setEstadoNombre(menu_estados[id_estado])
        if (id_estado == 1) {
            setTipo('success')
        } else {
            setTipo('amarillo')
        }
    }, [menu_estados, menu_usuarios]);

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Button variant="contained" size="small" color={tipo}>
                    {estadoNombre}
                </Button>
            </ThemeProvider>
        </div>
    );
}