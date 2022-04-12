import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { menuHabilidades } from '../redux/selectors';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { menuUsuarios } from '../redux/selectors';
import Slider from '@mui/material/Slider';
import PropTypes from 'prop-types';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function EstadoRT(props) {
    const menu_usuarios = useSelector(menuUsuarios)
    const [lmenuUsuarios, setLmenuUsuarios] = useState(menu_usuarios);

    const menu_habilidades = useSelector(menuHabilidades)
    const [lmenuHabilidades, setLmenuHabilidades] = useState(menu_habilidades);
    
    const [habilidades, setHabilidades] = useState([]);
    
    const [open, setOpen] = useState(false);
    
    let idHabilidades = []
    let sliders = []

    useEffect(() => {
        setLmenuHabilidades(
            menu_habilidades
        );
    }, [menu_habilidades]);

    useEffect(() => {
        setLmenuUsuarios(
            menu_usuarios
        );
    }, [menu_usuarios]);

    const handleClickOpen = () => {
        setOpen(true);
        // Cargo todas las habilidades del usuario
        setHabilidades(lmenuUsuarios[props.valor1.row.id_usuario].usuario_habilidades_valor)
    };
    const handleClose = () => {
        setOpen(false);
    };

    Object.entries(habilidades).forEach(([key, v]) => {
        idHabilidades.push(Math.floor(key))
    });

    Object.entries(lmenuHabilidades).forEach(([key, v]) => {
        if (idHabilidades.includes(Math.floor(key))) {
            sliders.push(
                <div key={key}>
                    <Typography gutterBottom>{v}</Typography>
                    <Slider
                        key={key}
                        aria-label="custom thumb label"
                        value={habilidades[key] ? habilidades[key] : 0}
                        valueLabelDisplay="on"
                        disabled
                    />
                </div>
            )
        }
    });

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Ver
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Habilidades de {lmenuUsuarios[props.valor1.row.id_usuario].usuario_apellido} {lmenuUsuarios[props.valor1.row.id_usuario].usuario_nombre}
                </BootstrapDialogTitle>
                <DialogContent dividers>

                    {sliders}
                    
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cerrar
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}