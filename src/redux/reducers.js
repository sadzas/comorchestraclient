import {
    REDUX_WEBSOCKET_CONNECT,
    REDUX_WEBSOCKET_OPEN,
    REDUX_WEBSOCKET_MESSAGE,
    REDUX_WEBSOCKET_SEND,
    REDUX_WEBSOCKET_DISCONNECT,
    REDUX_WEBSOCKET_CLOSED,
    REDUX_WEBSOCKET_ERROR,
    REDUX_WEBSOCKET_ESTADO,
    REDUX_MSG_SALIENTE,
    REDUX_MSG_ENTRANTE,
    REDUX_FLAG_TITULO,
    REDUX_FLAG_ESTADO,
    REDUX_FLAG_MENSAJE,
    REDUX_USUARIO_DATOS_PERSONALES,
    REDUX_USUARIO_OPERACION,
    REDUX_USUARIO_SUPERVISION,
    REDUX_USUARIO_ADMINISTRACION,
    REDUX_USUARIO_ESTADOS,
    REDUX_USUARIO_ESTADO_OPERADOR,
    REDUX_USUARIO_ESTADO_EXTENSION,
    REDUX_USUARIO_ESTADO_CHAT,
    REDUX_MENU_DEPARTAMENTOS,
    REDUX_MENU_SECTORES,
    REDUX_MENU_SECTORES_HABILIDADES,
    REDUX_MENU_SECTORES_ESTADOS,
    REDUX_MENU_PERMISOS,
    REDUX_MENU_USUARIOS,
    REDUX_MENU_HABILIDADES,
    REDUX_MENU_HABILIDADES_GRUPOS,
    REDUX_MENU_ESTADOS,
    REDUX_MENU_ESTADOS_USUARIO,
    REDUX_MENU_ESTADOS_GRUPOS,
    REDUX_MENU_COLAS,

    REALTIME_USUARIOS

} from "./actionTypes";

/*
MANEJO DE ACCIONES EN LOS REDUCERS

El reducer es una función pura que toma el estado anterior y una acción, y devuelve en nuevo estado.

(previousState, action) => newState

Se llama reducer porque es el tipo de función que pasarías a Array.prototype.reduce(reducer, ?initialValue). 
Es muy importante que los reducer se mantengan puros. Cosas que nunca deberías hacer dentron de un reducer:

- Modificar sus argumentos;
- Realizar tareas con efectos secundarios como llamas a un API o transiciones de rutas.
- Llamar una función no pura, por ejemplo Date.now() o Math.random().
*/

export const reducer = (state, action) => {

    switch (action.type) {
        case REDUX_WEBSOCKET_CONNECT:
            return {
                ...state, wsEstadoSesion: 0
            }

        case REDUX_WEBSOCKET_DISCONNECT:
            return {
                ...state, wsEstadoSesion: 0
            }

        case REDUX_WEBSOCKET_ERROR:
            return {
                ...state, wsEstadoSesion: 0
            }

        case REDUX_WEBSOCKET_OPEN:
            return {
                ...state, wsEstadoSesion: 1
            }

        case REDUX_WEBSOCKET_SEND:
            return {
                ...state
            }

        case REDUX_WEBSOCKET_MESSAGE:
            return {
                ...state
            }

        case REDUX_WEBSOCKET_ESTADO:
            return {
                ...state, wsEstadoSesion: 2
            }

        case REDUX_WEBSOCKET_CLOSED:
            return {
                ...state, wsEstadoSesion: 2 // Debe tener estado 1 o algun otro estado para que el operador refresque la pantalla.
            }

        case REDUX_MSG_SALIENTE:
            return {
                ...state, mensaje_saliente: action.mensaje
            }

        case REDUX_MSG_ENTRANTE:
            return {
                ...state, mensaje_entrante: action.mensaje
            }

        case REDUX_FLAG_ESTADO:
            return {
                ...state, alertaGeneral_flag: action.mensaje
            }

        case REDUX_FLAG_TITULO:
            return {
                ...state, alertaGeneral_titulo: action.mensaje
            }

        case REDUX_FLAG_MENSAJE:
            return {
                ...state, alertaGeneral_mensaje: action.mensaje
            }

        case REDUX_USUARIO_DATOS_PERSONALES:
            return {
                ...state, usuario_id: action.mensaje.value1, usuario_perfil: action.mensaje.value4, usuario_nombre: action.mensaje.value6, usuario_apellido: action.mensaje.value7, usuario_usuario: action.mensaje.value8
            }

        case REDUX_USUARIO_OPERACION:
            return {
                ...state, usuario_permisos_operacion: action.mensaje
            }

        case REDUX_USUARIO_SUPERVISION:
            return {
                ...state, usuario_permisos_supervision: action.mensaje
            }

        case REDUX_USUARIO_ADMINISTRACION:
            return {
                ...state, usuario_permisos_administracion: action.mensaje
            }

        case REDUX_USUARIO_ESTADOS:
            return {
                ...state, usuario_estados: action.mensaje
            }

        case REDUX_USUARIO_ESTADO_OPERADOR:
            return {
                ...state, usuario_estado_operador: action.mensaje
            }

        case REDUX_USUARIO_ESTADO_EXTENSION:
            return {
                ...state, usuario_estado_extension: action.mensaje
            }

        case REDUX_USUARIO_ESTADO_CHAT:
            return {
                ...state, usuario_estado_chat: action.mensaje
            }
        case REDUX_MENU_DEPARTAMENTOS:
            return {
                ...state, menu_departamentos: action.mensaje
            }
        case REDUX_MENU_SECTORES:
            return {
                ...state, menu_sectores: action.mensaje
            }
        case REDUX_MENU_SECTORES_HABILIDADES:
            return {
                ...state, menu_sectores_habilidades: action.mensaje
            }
        case REDUX_MENU_SECTORES_ESTADOS:
            return {
                ...state, menu_sectores_estados: action.mensaje
            }
        case REDUX_MENU_PERMISOS:
            return {
                ...state, menu_permisos: action.mensaje
            }
        case REDUX_MENU_USUARIOS:
            return {
                ...state, menu_usuarios: action.mensaje
            }
        case REDUX_MENU_HABILIDADES:
            return {
                ...state, menu_habilidades: action.mensaje
            }
        case REDUX_MENU_HABILIDADES_GRUPOS:
            return {
                ...state, menu_habilidades_grupos: action.mensaje
            }
        case REDUX_MENU_ESTADOS:
            return {
                ...state, menu_estados: action.mensaje
            }
        case REDUX_MENU_ESTADOS_USUARIO:
            return {
                ...state, menu_estados_usuario: action.mensaje
            }
        case REDUX_MENU_ESTADOS_GRUPOS:
            return {
                ...state, menu_estados_grupos: action.mensaje
            }
        case REDUX_MENU_COLAS:
            return {
                ...state, menu_colas: action.mensaje
            }
        
            
        case REALTIME_USUARIOS:
            return {
                ...state, realtime_usuarios: action.mensaje
            }
        default:
            return state
    }
}