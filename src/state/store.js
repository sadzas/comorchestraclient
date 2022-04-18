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

        usuario_listaPermisosOperacion: [1, 2, 3],
        usuario_listaPermisosSupervision: [4, 5, 6],
        usuario_listaPermisosAdministracion: [7, 8, 9],

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
        realtime_listado_colas: [],

        usuario_estadoOperador: "",
        usuario_estadoExtension: "",
        usuario_estadoChat: "",

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