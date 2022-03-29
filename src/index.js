import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { WSConnect } from './componentes/wsconnect'
import App from './App';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
        <WSConnect />
      </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);