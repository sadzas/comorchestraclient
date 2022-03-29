import React from 'react';
import { MemoryRouter } from "react-router-dom";
import AlertaGeneral from './componentes/AlertaGeneral';
import Login from './componentes/Login';
import Board from './pages/Board';
import ErrorServidor from './componentes/ErrorServidor';
import { wsEstadoSesion } from './redux/selectors';
import { useSelector } from 'react-redux';
import './App.css';

export default function App() {

  const estadoSesion = useSelector(wsEstadoSesion);
  let login;

  switch (estadoSesion) {
    case 0:
      login = <ErrorServidor />
      break
    case 1:
      login = <Login />
      break
    case 2:
      login = <Board />
      break
    default:
      return 'Loser';
  }

  return (
    <div className="App">
      <MemoryRouter>
        {login}
      </MemoryRouter>
      <AlertaGeneral />
    </div>
  );
}