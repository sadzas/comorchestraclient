import {
  REDUX_MSG_SALIENTE,
  REDUX_MSG_ENTRANTE,
  REDUX_FLAG_ESTADO,
  REDUX_FLAG_TITULO,
  REDUX_FLAG_MENSAJE,
  REDUX_WEBSOCKET_ESTADO,

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
  REDUX_USUARIO_MENU_COLA_PROPIEDADES,

  REALTIME_USUARIOS

} from "./actionTypes";

/*

Las acciones son un bloque de información que envia datos desde tu aplicación a tu store. 
Son la única fuente de información para el store. 
Las envias al store usando store.dispatch().

function incremento(paso) { (paso es el valor que le llega a la funcion)
  return {
    type: INCREMENT,
    paso
  }
}

Esto las hace más portables y fáciles de probar. Para efectivamente iniciar un despacho, pasa el resultado a la función dispatch():

dispatch(incremento(paso))

---------------------------------------------------------------------

Alternativamente, puedes crear un creador de acciones conectados que despache automaticamente:

const boundIncremento = (paso) => dispatch(Incremento(paso))

Ahora puedes llamarlas directamente:

boundIncremento(paso)

*/

export const msgSalienteAlmacena = (mensaje) => {
  return {
    type: REDUX_MSG_SALIENTE,
    mensaje
  }
}

export const msgEntranteAlmacena = (mensaje) => {
  return {
    type: REDUX_MSG_ENTRANTE,
    mensaje
  }
}

export const msgEntranteEstado = () => {
  return {
    type: REDUX_WEBSOCKET_ESTADO
  }
}

export const usuarioDatosPersonales = (mensaje) => {
  return {
    type: REDUX_USUARIO_DATOS_PERSONALES,
    mensaje
  }
}

export const usuarioPermisosOperacion = (mensaje) => {
  return {
    type: REDUX_USUARIO_OPERACION,
    mensaje
  }
}

export const usuarioPermisosSupervision = (mensaje) => {
  return {
    type: REDUX_USUARIO_SUPERVISION,
    mensaje
  }
}

export const usuarioPermisosAdministracion = (mensaje) => {
  return {
    type: REDUX_USUARIO_ADMINISTRACION,
    mensaje
  }
}

export const usuarioEstados = (mensaje) => {
  return {
    type: REDUX_USUARIO_ESTADOS,
    mensaje
  }
}

export const usuarioEstadoOperador = (mensaje) => {
  return {
    type: REDUX_USUARIO_ESTADO_OPERADOR,
    mensaje
  }
}

export const usuarioEstadoExtension = (mensaje) => {
  return {
    type: REDUX_USUARIO_ESTADO_EXTENSION,
    mensaje
  }
}

export const usuarioEstadoChat = (mensaje) => {
  return {
    type: REDUX_USUARIO_ESTADO_CHAT,
    mensaje
  }
}

export const alertaCambiaFlagEstado = (mensaje) => {
  return {
    type: REDUX_FLAG_ESTADO,
    mensaje
  }
}
export const alertaCambiaFlagTitulo = (mensaje) => {
  return {
    type: REDUX_FLAG_TITULO,
    mensaje
  }
}
export const alertaCambiaFlagMensaje = (mensaje) => {
  return {
    type: REDUX_FLAG_MENSAJE,
    mensaje
  }
}


export const usuarioMenuColaPropiedades = (mensaje) => {
  return {
    type: REDUX_USUARIO_MENU_COLA_PROPIEDADES,
    mensaje
  }
}


export const menuColas = (mensaje) => {
  return {
    type: REDUX_MENU_COLAS,
    mensaje
  }
}
export const menuEstados = (mensaje) => {
  return {
    type: REDUX_MENU_ESTADOS,
    mensaje
  }
}
export const menuEstadosGrupos = (mensaje) => {
  return {
    type: REDUX_MENU_ESTADOS_GRUPOS,
    mensaje
  }
}
export const menuHabilidades = (mensaje) => {
  return {
    type: REDUX_MENU_HABILIDADES,
    mensaje
  }
}
export const menuHabilidadesGrupos = (mensaje) => {
  return {
    type: REDUX_MENU_HABILIDADES_GRUPOS,
    mensaje
  }
}
export const menuUsuarios = (mensaje) => {
  return {
    type: REDUX_MENU_USUARIOS,
    mensaje
  }
}
export const menuPermisos = (mensaje) => {
  return {
    type: REDUX_MENU_PERMISOS,
    mensaje
  }
}
export const menuDepartamentos = (mensaje) => {
  return {
    type: REDUX_MENU_DEPARTAMENTOS,
    mensaje
  }
}
export const menuSectores = (mensaje) => {
  return {
    type: REDUX_MENU_SECTORES,
    mensaje
  }
}
export const menuSectoresHabilidades = (mensaje) => {
  return {
    type: REDUX_MENU_SECTORES_HABILIDADES,
    mensaje
  }
}
export const menuSectoresEstados = (mensaje) => {
  return {
    type: REDUX_MENU_SECTORES_ESTADOS,
    mensaje
  }
}
export const menuEstadosUsuario = (mensaje) => {
  return {
    type: REDUX_MENU_ESTADOS_USUARIO,
    mensaje
  }
}

export const realtimeUsuarios = (mensaje) => {
  return {
    type: REALTIME_USUARIOS,
    mensaje
  }
}


