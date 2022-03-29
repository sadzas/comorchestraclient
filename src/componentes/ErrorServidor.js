import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function ErrorServidor() {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                El servidor de MATE <strong>NO ESTA OPERATIVO</strong>
            </Alert>
        </Stack>
    );
}