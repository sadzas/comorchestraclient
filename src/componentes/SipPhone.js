import {
  Invitation,
  Inviter,
  InviterOptions,
  Referral,
  Registerer,
  RegistererOptions,
  Session,
  SessionState,
  UserAgent,
  UserAgentState,
  UserAgentOptions,
  UserAgentDelegate,
  InvitationAcceptOptions,
  Emmiter
} from "sip.js";
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { operadorCargaEstadoExtension } from '../redux/actions';
import { alertaCambiaFlagEstado, alertaCambiaFlagMensaje, alertaCambiaFlagTitulo } from '../redux/actions'
import { usuarioUsuario, operadorEstadoExtension, operadorExtensionUS, operadorExtensionUA, operadorExtensionPW, operadorExtensionSV } from '../redux/selectors';
import { msgSalienteAlmacena } from '../redux/actions';
import { armoMensajeSaliente } from '../utils/Helpers';

const useStyles = makeStyles({
  boton: {
    background: '#333',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 40,
    width: '40px',
    padding: '0 30px',
  },
  botonc: {
    background: '#333',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 40,
    width: '40px',
    padding: '0 30px',
  },
  margenInferior: {
    margin: '0 0 30px 0',
  },
  margenSuperiorS: {
    margin: '15px 0 0 0',
  },
  margenSuperiorM: {
    margin: '30px 0 0 0',
  },
  fondoNegro: {
    backgroundColor: '#000',
  },
  fondoGris: {
    backgroundColor: '#fff',
  },
});

export default function SipPhone() {

  const dispatch = useDispatch()
  const [display, setDisplay] = useState("")
  const operador_estado_extension = useSelector(operadorEstadoExtension);
  const usuario_usuario = useSelector(usuarioUsuario);
  const operador_extension_US = useSelector(operadorExtensionUS);
  const operador_extension_UA = useSelector(operadorExtensionUA);
  const operador_extension_PW = useSelector(operadorExtensionPW);
  const operador_extension_SV = useSelector(operadorExtensionSV);

  let botonDisabled = false

  const transportOptions = {
    //server: "wss://comorchestra.mooo.com:8089/ws",
    server: operador_extension_SV,
    //keepAliveInterval: 1,
    //keepAliveDebounce: 1,
    //connectionTimeout: 1,
    traceSip: false,
  };

  //const uri = UserAgent.makeURI("sip:201@comorchestra.mooo.com");
  const uri = UserAgent.makeURI(operador_extension_UA);

  const userAgentOptions = {
    //authorizationUsername: '201',
    authorizationUsername: operador_extension_US,
    //authorizationPassword: 'qWeRtY00',
    authorizationPassword: operador_extension_PW,

    transportOptions,
    uri,
  };

  const handleRegistrar = () => {
    const userAgent = new UserAgent(userAgentOptions);

    userAgent.delegate = {
      onInvite(invitation) {
        console.log("llegueeeeeeeeeeeeeeeeeeeeeee", invitation)

        // An Invitation is a Session
        const sesionEntrante = new Session(invitation);

        // Setup incoming session delegate
        sesionEntrante.delegate = {
          // Handle incoming REFER request.
          onRefer(referral) {
            console.log("onrefer ==================================", referral)
            // ...
          }
        };

        sesionEntrante.stateChange.addListener((newState) => {
          console.log("dsadasdasdasdasdasdasdadadasd----------------", newState)
          switch (newState) {
            case "Establishing":
              console.log("El estado de las sesion es: ----------------", newState)
              break;
            case "Established":
              console.log("El estado de las sesion es: ----------------", newState)
              break;
            case "Terminated":
              console.log("El estado de las sesion es: ----------------", newState)
              break;
            default:
              break;
          }
        });

        // Handle incoming INVITE request.
        var constrainsDefault = {
          audio: true,
          video: false,
        };
        var options = {
          sessionDescriptionHandlerOptions: {
            constraints: constrainsDefault,
          },
        };
        invitation.accept(options);
      }
    }



    userAgent
      .start(() => {
        console.log("======== Inicia el userAgent.")
      })
      .then(() => {
        const registerer = new Registerer(userAgent);
        let state = "0"
        registerer.expires = "5";
        registerer.stateChange
          .addListener((newState) => {
            switch (newState) {
              case "Registered":
                //dispatch(operadorCargaEstadoExtension("1"))
                state = "1"
                console.log("======== SE REGISTRO");
                break;
              case "Unregistered":
                state = "2"
                //dispatch(operadorCargaEstadoExtension("2"))
                console.log("======== DESREGISTRADO");
                break;
              case "Terminated":
                state = "2"
                //dispatch(operadorCargaEstadoExtension("2"))
                console.log("======== TERMINADO");
                break;
            }
            const mensaje = armoMensajeSaliente(2003, "", usuario_usuario, state)
            dispatch(msgSalienteAlmacena(mensaje))
          });
        registerer.register()
          .then((request) => {
            console.log("La extension se encuentra registrada.");
          })
          .catch((error) => {
            let alertaTitulo = "Error de Extensión."
            let alertaMensaje = "cl-xt-0001 | Contacte al administrador e informe del código de error."
            dispatch(alertaCambiaFlagTitulo(alertaTitulo))
            dispatch(alertaCambiaFlagMensaje(alertaMensaje))
            dispatch(alertaCambiaFlagEstado(true))
          });
      })
      .catch((error) => {
        let alertaTitulo = "Error de Conexión."
        let alertaMensaje = "cl-wb-0001 | Contacte al administrador e informe del código de error."
        dispatch(alertaCambiaFlagTitulo(alertaTitulo))
        dispatch(alertaCambiaFlagMensaje(alertaMensaje))
        dispatch(alertaCambiaFlagEstado(true))
      })

    /**
     * Escucha el estado del WebSocket de la extension
     */
    userAgent.transport.stateChange
      .addListener((newState) => {
        switch (newState) {
          case "Connecting":
            console.log(".:WebSocket:. == Se está tratando de Conectar ==");
            break;
          case "Connected":
            console.log(".:WebSocket:. == Se encuentra Conectado ==");
            break;
          case "Disconnected":
            const mensaje = armoMensajeSaliente(2003, "", usuario_usuario, "2")
            dispatch(msgSalienteAlmacena(mensaje))
            console.log(".:WebSocket:. == Se encuentra Desconectado ==");
            break;
          default:
            console.log(".:WebSocket:. == Estado desconocido: ", newState, " ==")

        }
      })
  };

  const handleAceptar = () => {

    if (botonDisabled === true) {
      console.log("Se inicia una llamada")
      const userAgent = new UserAgent(userAgentOptions);
      userAgent
        .start(() => {
          console.log("Si ya está registrado, no debería hacer nada.")
        })
        .then(() => {
          // Set target destination (callee)
          const target = UserAgent.makeURI("sip:101@comorchestra.mooo.com");
          if (!target) {
            throw new Error("Failed to create target URI.");
          }

          // Create a user agent client to establish a session
          const inviter = new Inviter(userAgent, target, {
            sessionDescriptionHandlerOptions: {
              constraints: { audio: true, video: false }
            }
          });

          // Handle outgoing session state changes
          inviter.stateChange.addListener((newState) => {
            switch (newState) {
              case SessionState.Establishing:
                console.log("La llamada se está estableciendo")
                // Session is establishing
                break;
              case SessionState.Established:
                console.log("la llamada se establecio")
                // Session has been established
                break;
              case SessionState.Terminated:
                console.log("la llamada se termino")
                // Session has terminated
                break;
              default:
                break;
            }
          });

          // Send initial INVITE request
          inviter.invite()
            .then(() => {
              // INVITE sent
            })
            .catch((error) => {
              // INVITE did not send
            });

        })
        .catch((error) => {
          console.log("Error en la llamada: ", error)
        });
    }
  }

  const handleNumero = (numero) => {
    console.log("el umnero es: ", numero)
    setDisplay(display + numero)
  }

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const classes = useStyles();

  switch (operador_estado_extension) {
    case "1":
      botonDisabled = true
      break
    default:
      botonDisabled = false
      break
  }

  return (
    <Box sx={{ flexGrow: 3 }}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Item>
            <TextField className={classes.margenInferior} label="Destino" id="outlined-size-small" defaultValue={display} size="small" />
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button className={classes.boton} onClick={() => { handleNumero(1); }}>1</Button>
              <Button className={classes.boton} onClick={() => { handleNumero(2); }}>2</Button>
              <Button className={classes.boton} onClick={() => { handleNumero(3); }}>3</Button>
            </ButtonGroup>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button className={classes.boton} onClick={() => { handleNumero(4); }}>4</Button>
              <Button className={classes.boton} onClick={() => { handleNumero(5); }}>5</Button>
              <Button className={classes.boton} onClick={() => { handleNumero(6); }}>6</Button>
            </ButtonGroup>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button className={classes.boton} onClick={() => { handleNumero(7); }} >7</Button>
              <Button className={classes.boton} onClick={() => { handleNumero(8); }}>8</Button>
              <Button className={classes.boton} onClick={() => { handleNumero(9); }}>9</Button>
            </ButtonGroup>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button className={classes.boton} onClick={() => { handleNumero("*"); }}>*</Button>
              <Button className={classes.boton} onClick={() => { handleNumero(0); }}>0</Button>
              <Button className={classes.boton} onClick={() => { handleNumero("#"); }}>#</Button>
            </ButtonGroup>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ButtonGroup variant="contained" className={classes.margenSuperiorS} size="small" disableElevation>
                <Button color="error" sx={{ margin: '0 10px 0 0' }}>Cancelar</Button>
                <Button color="primary" onClick={() => { handleAceptar(); }}>Aceptar</Button>
              </ButtonGroup>
              <ButtonGroup variant="contained" className={classes.margenSuperiorS} size="small" disableElevation>
                <Button disabled={botonDisabled} onClick={() => { handleRegistrar(); }}>Registrar</Button>
              </ButtonGroup>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=4</Item>
        </Grid>
      </Grid>
    </Box>
    /*
    <Box sx={{ lexGrow: 1 }} className={classes.fondoNegro}>
      <Grid container spacing={2} className={classes.fondoGris}>
        <Item>
          <Grid item xs={12}>
            <TextField className={classes.margenInferior} label="Numero" id="outlined-size-small" defaultValue={display} size="small" />
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button className={classes.boton} onClick={() => { handleNumero(1); }}>1</Button>
              <Button className={classes.boton} onClick={() => { handleNumero(2); }}>2</Button>
              <Button className={classes.boton} onClick={() => { handleNumero(3); }}>3</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button className={classes.boton} onClick={() => { handleNumero(4); }}>4</Button>
              <Button className={classes.boton} onClick={() => { handleNumero(5); }}>5</Button>
              <Button className={classes.boton} onClick={() => { handleNumero(6); }}>6</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button className={classes.boton} onClick={() => { handleNumero(7); }} >7</Button>
              <Button className={classes.boton} onClick={() => { handleNumero(8); }}>8</Button>
              <Button className={classes.boton} onClick={() => { handleNumero(9); }}>9</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button className={classes.boton} onClick={() => { handleNumero("*"); }}>*</Button>
              <Button className={classes.boton} onClick={() => { handleNumero(0); }}>0</Button>
              <Button className={classes.boton} onClick={() => { handleNumero("#"); }}>#</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup className={classes.margenSuperiorS} size="small" disableElevation variant="contained">
              <Button color="error" sx={{ margin: '0 10px 0 0' }}>Cancelar</Button>
              <Button color="primary" onClick={() => { handleAceptar(); }}>Aceptar</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} className={classes.margenSuperiorS} >
            <Button variant="contained" disabled={botonDisabled} onClick={() => { handleRegistrar(); }}>Registrar</Button>
          </Grid>
        </Item>
      </Grid >
    </Box >
    */
  );
}