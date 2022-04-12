import { applyMiddleware, compose, createStore } from "redux";
import reduxWebsocket from '@giantmachines/redux-websocket';
import { logger, logger2 } from "../state/middlewares";
import { reducer } from "../redux/reducers";
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from "../state/rootSaga";

const devTools =
    window['__REDUX_DEVTOOLS_EXTENSION__'] ?
        window['__REDUX_DEVTOOLS_EXTENSION__']() : f => f

const sagaMiddleware = createSagaMiddleware()

// Create the middleware instance.
const reduxWebsocketMiddleware = reduxWebsocket();

export const store = createStore(
    reducer,
    {
        usuario_id: 0,
        usuario_perfil: 0,
        usuario_usuario: "",
        usuario_nombre: "",
        usuario_apellido: "",
        usuario_estados: [],

        usuario_permisos_operacion: [1, 2, 3],
        usuario_permisos_supervision: [4, 5, 6],
        usuario_permisos_administracion: [7, 8, 9],

        wsEstadoSesion: 0,
        mensaje_saliente: "",
        mensaje_entrante: "",
        alertaGeneral_flag: false,
        alertaGeneral_titulo: "",
        alertaGeneral_mensaje: "",

        menu_colas: [],
        menu_colas_estrategias: {
            1: "Lineal",
            2: "Lineal con Memoria",
            3: "Distribuido"
        },
        menu_estados: [],
        menu_estados_grupos: [],
        menu_habilidades: [],
        menu_habilidades_grupos: [],
        menu_usuarios: [],
        menu_permisos: [],
        menu_sectores: [],
        menu_departamentos: [],
        menu_sectores_habilidades: [],
        menu_sectores_estados: [],
        realtime_usuarios: [],
        /*
        realtime_usuarios: [
            {
                "id_usuario": "1",
                "usuario_nombre": "Doe",
                "usuario_apellido": "John",
                "usuario_estado_impacto": "1647018107",
            },
            {
                "id_usuario": "2",
                "usuario_nombre": "Doe",
                "usuario_apellido": "John",
                "usuario_estado_impacto": "1647118107",
            },
            {
                "id_usuario": "3",
                "usuario_nombre": "Doe",
                "usuario_apellido": "John",
                "usuario_estado_impacto": "1647218107",
            },
            {
                "id_usuario": "4",
                "usuario_nombre": "Doe",
                "usuario_apellido": "John",
                "usuario_estado_impacto": "1647018107",
            },
            {
                "id_usuario": "5",
                "usuario_nombre": "Doe",
                "usuario_apellido": "John",
                "usuario_estado_impacto": "1647818107",
            },
            {
                "id_usuario": "6",
                "usuario_nombre": "Doe",
                "usuario_apellido": "John",
                "usuario_estado_impacto": "1647918107",
            },
            {
                "id_usuario": "7",
                "usuario_nombre": "Doe",
                "usuario_apellido": "John",
                "usuario_estado_impacto": "1647018107",
            },
            {
                "id_usuario": "8",
                "usuario_nombre": "Doe",
                "usuario_apellido": "John",
                "usuario_estado_impacto": "1647718107",
            },
            {
                "id_usuario": "9",
                "usuario_nombre": "Doe",
                "usuario_apellido": "John",
                "usuario_estado_impacto": "1647018107",
            },
            {
                "id_usuario": "10",
                "usuario_nombre": "Doe",
                "usuario_apellido": "John",
                "usuario_estado_impacto": "1647018107",
            }
        ],
        */
        realtime_listado_colas: [],

        operador_estado_general: "",
        operador_estado_extension: "",
        operador_estado_chat_general: "",
        operador_extension_US: "201",
        operador_extension_UA: "sip:201@comorchestra.mooo.com",
        operador_extension_PW: "qWeRtY00",
        operador_extension_SV: "wss://comorchestra.mooo.com:8089/ws"
    },

    compose(
        applyMiddleware(logger, logger2, reduxWebsocketMiddleware, sagaMiddleware),
        devTools
    )
)

sagaMiddleware.run(rootSaga)
/*
[
    {
        "id": "1",
        "lastname": "Doe",
        "name": "John",
        "impact": "1647018107",
    },
    {
        "id": "2",
        "lastname": "Doe",
        "name": "John",
        "impact": "1647118107",
    },
    {
        "id": "3",
        "lastname": "Doe",
        "name": "John",
        "impact": "1647218107",
    },
    {
        "id": "4",
        "lastname": "Doe",
        "name": "John",
        "impact": "1647018107",
    },
    {
        "id": "5",
        "lastname": "Doe",
        "name": "John",
        "impact": "1647818107",
    },
    {
        "id": "6",
        "lastname": "Doe",
        "name": "John",
        "impact": "1647918107",
    },
    {
        "id": "7",
        "lastname": "Doe",
        "name": "John",
        "impact": "1647018107",
    },
    {
        "id": "8",
        "lastname": "Doe",
        "name": "John",
        "impact": "1647718107",
    },
    {
        "id": "9",
        "lastname": "Doe",
        "name": "John",
        "impact": "1647018107",
    },
    {
        "id": "10",
        "lastname": "Doe",
        "name": "John",
        "impact": "1647018107",
    }
],
*/