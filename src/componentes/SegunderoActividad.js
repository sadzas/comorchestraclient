import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

export default function SegunderoActividad(props) {
    let operador = []
    let fecha = 0
    let id_almacena = props.valor1.row.id_usuario + 'actividad'
    let estado_impacto = props.valor1.row.usuario_estado_impacto
    const [tiempo, setTiempo] = useState('');
    const [tipo, setTipo] = useState('success')

    function convierteTimeStamp(tiempoImpacto) {
        const currentDate = new Date();
        fecha = Math.floor(currentDate.getTime() / 1000) - tiempoImpacto;
        let h = String("0" + Math.floor(fecha / 3600)).slice(-2);
        let m = String("0" + Math.floor(fecha % 3600 / 60)).slice(-2);
        let s = String("0" + Math.floor(fecha % 3600 % 60)).slice(-2);

        let retorno = h + ":" + m + ":" + s;
        return retorno;
    }

    function limpiaContador(id) {
        clearInterval(localStorage.getItem(id));
    }

    function iniciaContador(id, tiempoImpacto) {
        operador = setInterval(function () {
            setTiempo(convierteTimeStamp(tiempoImpacto));
        }, 1000);

        localStorage.setItem(id, operador)
    }

    useEffect(() => {
        limpiaContador(id_almacena)
        iniciaContador(id_almacena, estado_impacto)

        if (fecha > 600) {
            setTipo('error')
        } else {
            setTipo('success')
        }

        return () => {
            limpiaContador(id_almacena)
        }
    }, [estado_impacto]);


    return (
        <div>
            <Button variant="outlined" color={tipo}>
                {tiempo}
            </Button>
        </div>
    );
}