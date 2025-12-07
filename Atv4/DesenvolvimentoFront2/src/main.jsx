
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './tailwind.css';
import './index.sass';

import Login from './components/Login/Login';
import Registro from './pages/Registro';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import AdicionarUsuario from './pages/AdicionarUsuario';
import LayoutPadrao from './components/LayoutPadrao/LayoutPadrao';
import { ApiProvider } from './context/ApiContext';
import { AuthProvider } from './context/AuthContext';

// Crie o roteador com a nova estrutura
const router = createBrowserRouter([

  {
    path: '/',
    element: <Login />,
  },
  // Rota de Registro continua igual
  {
    path: '/registro',
    element: <Registro />,
  },

  {
    element: <LayoutPadrao />, // Envolve as rotas filhas

    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/perfil/:userId',
        element: <Perfil />,
      },
      {
        path: '/adicionar',
        element: <AdicionarUsuario />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ApiProvider>
        <RouterProvider router={router} />
      </ApiProvider>
    </AuthProvider>
  </React.StrictMode>
);