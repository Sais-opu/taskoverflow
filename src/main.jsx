import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './Provider/authProvider.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './components/Error.jsx'
import Home from './components/Home/Home.jsx'
import ManageTask from './components/AllTask/ManageTask.jsx'
import Login from './Login/Login.jsx'
import Register from './Register/Register.jsx'
import ToDo from './components/AllTask/ToDo/ToDo.jsx'
import Done from './components/AllTask/Done/Done.jsx'
import InProgress from './components/AllTask/InProgress.jsx/InProgress.jsx'
import { ToastContainer } from 'react-toastify'
ToastContainer
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/alltask",
        element: <ManageTask></ManageTask>,
      },
      {
        path: "/todo",
        element: <ToDo></ToDo>,
      },
      {
        path: "/inprogress",
        element: <InProgress></InProgress>,
      },
      {
        path: "/done",
        element: <Done></Done>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="bounce"
      />
    </AuthProvider>
  </StrictMode>,
)
