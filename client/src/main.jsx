import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import store from './store.js'
import { Provider } from "react-redux"
import SocketContext from './utils/SocketContext.js'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import App from './App.jsx'
import Room from './components/Room.jsx'
import { io } from 'socket.io-client'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/:room",
        element: <Room />,
    }
    
])

const socket = io("http://localhost:3000/")

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <SocketContext.Provider value={socket}>
            <RouterProvider router={router}/>
        </SocketContext.Provider>
    </Provider>
    
)
