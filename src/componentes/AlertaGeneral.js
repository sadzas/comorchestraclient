import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { alertaGeneralFlag, alertaGeneralTitulo, alertaGeneralMensaje } from '../redux/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { alertaCambiaFlagEstado } from '../redux/actions'

export default function AlertDialog() {
  const dispatch = useDispatch()
  const alertaflag = useSelector(alertaGeneralFlag);
  const alertatitulo = useSelector(alertaGeneralTitulo);
  const alertamensaje = useSelector(alertaGeneralMensaje);
  let open = false;
  
  if (alertaflag) {
      open = true;
  }
  
  const handleClose = () => {
    dispatch(alertaCambiaFlagEstado(false))
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
        <DialogTitle id="alert-dialog-title">
          {alertatitulo}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertamensaje}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}