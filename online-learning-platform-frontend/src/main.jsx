import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { routes } from './routes/Routes.jsx'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './Providers/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={routes} />
      <ToastContainer />
    </AuthProvider>
  </StrictMode>,
)
