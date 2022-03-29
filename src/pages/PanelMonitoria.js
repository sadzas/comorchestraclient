import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { realtimeUsuarios } from '../redux/selectors';
import { useState, useEffect } from 'react';
import Segundero from '../componentes/Segundero'

const columns = [
    {
        field: 'id_usuario',
        headerName: 'id_usuario',
        width: 100,
    },
    {
        field: 'usuario_nombre',
        headerName: 'usuario_nombre',
        width: 100,
    },
    {
        field: 'usuario_apellido',
        headerName: 'usuario_apellido',
        width: 100,
    },
    {
        field: 'usuario_estado_impacto',
        headerName: 'usuario_estado_impacto',
        width: 200,
        renderCell: (params) => (
            <Segundero valor1={params} />
        ),
    },
];

export default function PanelMonitoria() {
    const [realtime, setRealtime] = useState([]);
    const operadores_realtime = useSelector(realtimeUsuarios)

    useEffect(() => {
        setRealtime(operadores_realtime)
    }, [operadores_realtime]);
    
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={realtime}
                columns={columns}
                rowHeight={38}
                disableSelectionOnClick
                getRowId={(row) => row.id_usuario}
            />
        </div>

    );
}