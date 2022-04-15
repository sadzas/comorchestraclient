import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { realtimeUsuarios } from '../redux/selectors';

export default function SegunderoEstado(props) {
    const operadores_realtime = useSelector(realtimeUsuarios)
    const [tiempoImpacto, setTiempoImpacto] = useState(props.valor1.row.usuario_estado_impacto);
    const [tiempoMostrar, setTiempoMostrar] = useState('');
    const [seCarga, setSeCarga] = useState(true);
    const [tipo, setTipo] = useState('success')

    let id_intervalo = []
    let fecha = 0
    let id_usuario = props.valor1.row.id_usuario + 'estado'

    function convierteTimeStamp(timestamp) {
        const currentDate = new Date();
        fecha = Math.floor(currentDate.getTime() / 1000) - timestamp;
        let h = String("0" + Math.floor(fecha / 3600)).slice(-2);
        let m = String("0" + Math.floor(fecha % 3600 / 60)).slice(-2);
        let s = String("0" + Math.floor(fecha % 3600 % 60)).slice(-2);

        let retorno = h + ":" + m + ":" + s;
        return retorno;
    }

    function limpiaContador(id) {
        clearInterval(sessionStorage.getItem(id));
    }

    function iniciaContador(id, tiempoImpacto) {

        clearInterval(operador[id+'estado'])
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
        localStorage.setItem(id+'estado', operador)
    }
    
    useEffect(() => {
        if (seCarga) {
            setTiempoImpacto(props.valor1.row.usuario_estado_impacto);

            id_intervalo = setInterval(function () {
                if (fecha > 600) {
                    setTipo('error')
                } else {
                    setTipo('success')
                }
                setTiempoMostrar(convierteTimeStamp(tiempoImpacto));
                sessionStorage.setItem(id_usuario, id_intervalo)
            }, 1000);

            return () => {
                limpiaContador(id_usuario)
                setSeCarga(false)
            }
        }
    }, [operadores_realtime]);

    useEffect(() => {
        setTiempoImpacto(props.valor1.row.usuario_estado_impacto);
        console.log("Nuevo tiempo de impacto: ",props.valor1.row.usuario_estado_impacto)
        
    }, [operadores_realtime]);

    return (
        <div>
            <Button variant="outlined" color={tipo}>
                {tiempoMostrar}
            </Button>
        </div>
    );
}