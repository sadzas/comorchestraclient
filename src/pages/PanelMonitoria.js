import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { realtimeUsuarios } from '../redux/selectors';
import { useState, useEffect } from 'react';
import SegunderoActividad from '../componentes/SegunderoActividad'
import SegunderoEstado from '../componentes/SegunderoEstado'
import HabilidadesRT from '../componentes/HabilidadesRT'
import EstadoRT from '../componentes/EstadoRT'

const columns = [
    {
        field: 'usuario_usuario',
        headerName: 'Usuario',
        width: 100,
    },
    {
        field: 'Nombre',
        headerName: 'Nombre',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 200,
        valueGetter: (params) =>
            `${params.row.usuario_apellido || ''} ${params.row.usuario_nombre || ''}`,
    },
    {
        field: 'id_usuario',
        headerName: 'Habilidades',
        width: 100,
        renderCell: (params) => (
            <HabilidadesRT valor1={params} />
        ),
    },
    {
        field: 'estado',
        headerName: 'Estado',
        width: 80,
        renderCell: (params) => (
            <EstadoRT valor1={params} />
        ),
    },
    {
        field: 'tiempo_estado',
        headerName: 'Tiempo Estado',
        width: 120,
        renderCell: (params) => (
            <SegunderoEstado valor1={params} />
        ),
    },
    {
        field: 'actividad',
        headerName: 'Actividad',
        width: 80,
        renderCell: (params) => (
            <EstadoRT valor1={params} />
        ),
    },
    {
        field: 'tiempo_actividad',
        headerName: 'Tiempo Actividad',
        width: 120,
        renderCell: (params) => (
            <SegunderoActividad valor1={params} />
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