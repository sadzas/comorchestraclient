import { takeLatest } from "@redux-saga/core/effects";
import { REDUX_WEBSOCKET_MESSAGE, REDUX_MSG_SALIENTE } from "../../redux/actionTypes";
import { send } from '@giantmachines/redux-websocket'
import { store } from '../store';
import {
    msgEntranteAlmacena,
    msgEntranteEstado,

    usuarioDatosPersonales,
    usuarioPermisosOperacion,
    usuarioPermisosSupervision,
    usuarioPermisosAdministracion,

    usuarioEstados,
    alertaCambiaFlagEstado,
    alertaCambiaFlagTitulo,
    alertaCambiaFlagMensaje,
    operadorEstadoGeneral,
    operadorCargaEstadoExtension,
    menuDepartamentos,
    menuSectores,
    menuSectoresHabilidades,
    menuSectoresEstados,
    menuPermisos,
    menuUsuarios,
    menuHabilidades,
    menuHabilidadesGrupos,
    menuEstados,
    menuEstadosUsuario,
    menuEstadosGrupos,
    menuColas,
    usuarioMenuColaPropiedades,

    realtimeUsuarios
} from '../../redux/actions'

//FUNCIÓN GENERADORA QUE SE QUEDA A LA ESCUCHA DE LA ACCIÓN CORRESPONDIENTE (WATCHER)
export function* watcher() {
    //FUNCIÓN GENERADORA QUE SE EJECUTA CUANDO EL WATCHER DETECTA UNA ACCION DISPACHADA
    //HACIA EL REDUCER QUE COINCIDE CON EL PRIMER PARÁMETRO DEL takeLatest ó takeEvery (WORKER)

    yield takeLatest(REDUX_WEBSOCKET_MESSAGE, getMessage)
    yield takeLatest(REDUX_MSG_SALIENTE, sendMessage)
}

function getMessage(mensaje) {
    let msg = JSON.parse(mensaje.payload.message)
    console.log("El mensaje entrante es: ", msg)
    switch (msg.code) {
        case 2201:
            //store.dispatch(msgEntranteAlmacena(msg))
            store.dispatch(alertaCambiaFlagTitulo(msg.value6))
            store.dispatch(alertaCambiaFlagMensaje(msg.value7))
            store.dispatch(alertaCambiaFlagEstado(true))
            break
        // 2101: Se loguea un Usuario
        case 2101:
            store.dispatch(msgEntranteAlmacena(msg))
            store.dispatch(usuarioDatosPersonales(msg))
            store.dispatch(usuarioPermisosOperacion(msg.value11))
            store.dispatch(usuarioPermisosSupervision(msg.value12))
            store.dispatch(usuarioPermisosAdministracion(msg.value13))
            store.dispatch(usuarioEstados(msg.value14))
            store.dispatch(operadorEstadoGeneral(msg.value2))

            store.dispatch(msgEntranteEstado())
            break
        // 2102: Cambia estado general del operador
        case 2102:
            //store.dispatch(msgEntranteAlmacena(msg))
            store.dispatch(operadorEstadoGeneral(msg.value2))
            break
        // 2111: El usuario es Admin / Supervisor. Se envian datos del menu
        case 2111:
            store.dispatch(msgEntranteAlmacena(msg))
            store.dispatch(menuColas(msg.value21))
            store.dispatch(menuUsuarios(msg.value22))
            store.dispatch(menuSectores(msg.value23))
            store.dispatch(menuEstados(msg.value24))
            store.dispatch(menuHabilidades(msg.value25))
            store.dispatch(menuPermisos(msg.value28))
            store.dispatch(menuSectoresHabilidades(msg.value29))
            store.dispatch(menuSectoresEstados(msg.value30))
            store.dispatch(menuHabilidadesGrupos(msg.value31))
            store.dispatch(menuEstadosGrupos(msg.value32))
            store.dispatch(menuDepartamentos(msg.value33))
            break
        case 2212:
            store.dispatch(msgEntranteAlmacena(msg))
            store.dispatch(menuColas(msg.value21))
            store.dispatch(menuUsuarios(msg.value22))
            store.dispatch(menuSectores(msg.value23))
            store.dispatch(menuEstados(msg.value24))
            store.dispatch(menuHabilidades(msg.value25))
            store.dispatch(menuSectoresHabilidades(msg.value29))
            store.dispatch(menuSectoresEstados(msg.value30))
            store.dispatch(menuHabilidadesGrupos(msg.value31))
            store.dispatch(menuEstadosGrupos(msg.value32))
            break
        case 3012:
            store.dispatch(msgEntranteAlmacena(msg))
            store.dispatch(menuColas(msg.value21))
            break
        case 3103:
            store.dispatch(menuColas(msg.value21))
            //store.dispatch(menuHabilidades(msg.value22))
            break
        case 3104:
            store.dispatch(usuarioMenuColaPropiedades(msg.value26))
            break
        case 3501:
            store.dispatch(menuSectores(msg.value23))
            break
        case 4003:
            store.dispatch(usuarioEstados(msg.value14))
            break
        // 4101: Se envian los datos de: Gerencia => Departamento => Sector de acuerdo al perfil obtenido.
        case 4101:
            store.dispatch(menuSectores(msg.value20))
            store.dispatch(menuPermisos(msg.value21))
            break
        case 4103:
            store.dispatch(menuUsuarios(msg.value20))
            store.dispatch(menuPermisos(msg.value21))
            break
        case 4104:
            //store.dispatch(menuOperadores(msg.value20))
            //store.dispatch(menuHabilidades(msg.value21))
            break
        case 4105:
            store.dispatch(menuUsuarios(msg.value20))
            store.dispatch(menuEstados(msg.value21))
            break
        case 4106:
            //store.dispatch(menuHabilidadesUsuario(msg.value21))
            break
        case 4107:
            //store.dispatch(menuPermisosUsuario(msg.value11))
            break
        case 4108:
            store.dispatch(menuEstadosUsuario(msg.value11))
            break
        case 4401:
            store.dispatch(menuHabilidades(msg.value25))
            store.dispatch(menuSectoresHabilidades(msg.value29))
            break
        case 4402:
            store.dispatch(menuHabilidadesGrupos(msg.value31))
            break
        case 4601:
            store.dispatch(menuEstados(msg.value24))
            break
        case 4602:
            store.dispatch(menuEstadosGrupos(msg.value32))
            break
        case 4603:
            break
        case 5001:
            store.dispatch(alertaCambiaFlagTitulo(msg.value6))
            store.dispatch(alertaCambiaFlagMensaje(msg.value7))
            store.dispatch(alertaCambiaFlagEstado(true))
            break;
        // 5101: Se envia el cambio de estado de la Extension.
        case 5101:
            //store.dispatch(msgEntranteAlmacena(msg))
            store.dispatch(operadorCargaEstadoExtension(msg.value7))
            break
        case 5555:
            //store.dispatch(msgEntranteAlmacena(msg))
            store.dispatch(realtimeUsuarios(msg.usuariosRT))
            break
        default:
            return 'foo'
    }
    //console.log("El mensaje recibido: ",JSON.parse(mensaje.payload.message))
    //console.log("El codigo recibido: ",JSON.parse(mensaje.payload.message).code)
}

function sendMessage(action) {
    // Accedo al store para obtener el WS y envio el mensaje (wsmensaje)
    store.dispatch(send({ '': action.mensaje }));
}
