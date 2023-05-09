import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Game from './pages/Game.jsx'
import ControlsPage from './pages/ControlsPage'
import ErrorPage from './pages/ErrorPage'


import GameProvider from './providers/GameProvider.jsx'

import './index.css'

const router = createBrowserRouter([
    {
        path: "/",
        element: <ControlsPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/game",
        element: <Game />,
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <GameProvider>
        <RouterProvider router={router} />
      </GameProvider>
  </React.StrictMode>,
)