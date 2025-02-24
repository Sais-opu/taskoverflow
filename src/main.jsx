import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './Provider/authProvider.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './Register/Register.jsx'
import Login from './Login/Login.jsx'
import Tester from './Tester/Tester.jsx'

const router = createBrowserRouter([
  
  {
    path: '/',
    element: <Register></Register>
  },
  {
    path: '/l',
    element: <Login></Login>
  },
  {
    path: '/task',
    element: <Tester></Tester>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
