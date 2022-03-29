import { connect } from '@giantmachines/redux-websocket'
import { store } from '../state/store';

export const WSConnect = () => {

    store.dispatch(connect('ws://127.0.0.1:6283'));
    return ('');
}

export default WSConnect