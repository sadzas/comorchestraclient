import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

export default function Segundero(props) {
    let operador = []
    const [tiempo, setTiempo] = useState('');
    const [tipo, setTipo] = useState('success')

    function convierteTimeStamp(tiempoImpacto) {
        const currentDate = new Date();
        let fecha = Math.floor(currentDate.getTime() / 1000) - tiempoImpacto;
        let h = String("0" + Math.floor(fecha / 3600)).slice(-2);
        let m = String("0" + Math.floor(fecha % 3600 / 60)).slice(-2);
        let s = String("0" + Math.floor(fecha % 3600 % 60)).slice(-2);

        let retorno = h + ":" + m + ":" + s;
        return retorno;
    }

    function limpiaContador(id) {
        const tt = localStorage.getItem(id+'actividad');
        clearInterval(tt)
    }

    function iniciaContador(id, tiempoImpacto) {

        clearInterval(operador[id+'actividad'])
        operador = setInterval(function () {


            /*
            if (seconds > 600) {
                setTipo('error')
            } else {
                setTipo('secondary')
            }
            */

            setTiempo(convierteTimeStamp(tiempoImpacto));
        }, 1000);
        localStorage.setItem(id+'actividad', operador)
    }

    limpiaContador(props.valor1.row.id_usuario)
    iniciaContador(props.valor1.row.id_usuario, props.valor1.row.usuario_estado_impacto)

    //console.log("Los valores que llegan son: ", props)
    //console.log("El id es: ", props.valor1.row.id)
    //console.log("El tiempo de impacto es: ", props.valor1.row.impact)

    //console.log("el valor es: ".tiempo)
    return (
        <div>
            <Button variant="outlined" color={tipo}>
                {tiempo}
            </Button>
        </div>
    );
}