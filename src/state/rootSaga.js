import {all} from 'redux-saga/effects'
import { watcher } from './sagas/watcher'

//FUNCION GENERADORA QUE DEFINE LOS WATCHERS CON LOS QUE VA A TRABAJAR SAGA
export function *rootSaga() {
    yield all([watcher()])
}