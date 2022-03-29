import { send } from '@giantmachines/redux-websocket'
import { store } from '../state/store';

export const WSSend = () => {
    
    console.log("Envio el mensaje al server",{ my: 'message' })
    store.dispatch(send({ my: 'message' }));
    return ('');
}

export default WSSend