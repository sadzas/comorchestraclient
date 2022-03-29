export const logger = store => next => action => {
    console.warn('Middleware','Esta efectuando la accion: ', action, Date.now())
    next(action)
}

export const logger2 = store => next => action => {
    console.warn('Logger2','Store', store, new Date().toLocaleString())
    next(action)
}