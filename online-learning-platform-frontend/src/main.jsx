import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { routes } from './routes/Routes.jsx'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './Providers/AuthProvider.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Modal from 'react-modal'

const queryClient = new QueryClient()

Modal.setAppElement('#root')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
      <ToastContainer />
    </AuthProvider>
  </StrictMode>,
)
