import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

export default function Segundero(props) {
    var operador = []
    const [tiempo, setTiempo] = useState('');
    const [tipo, setTipo] = useState('success')

    function loop(id, impact) {
        
        operador[id] = setInterval(function () {
            console.log("el valor id es: ",operador[id])
            
            const currentDate = new Date();
            let seconds = Math.floor(currentDate.getTime()) - impact;

            if (seconds > 600) {
                setTipo('error')
            } else {
                setTipo('secondary')
            }
            console.log("el id es: ",operador[id])

            let h = String("0" + Math.floor(seconds / 3600)).slice(-2);
            let m = String("0" + Math.floor(seconds % 3600 / 60)).slice(-2);
            let s = String("0" + Math.floor(seconds % 3600 % 60)).slice(-2);

            let time = h + ":" + m + ":" + s;

            setTiempo(time);
            clearInterval(operador[id])
        }, 1000);
        
    }

    loop(props.valor1.row.id_usuario,props.valor1.row.usuario_estado_impacto)

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