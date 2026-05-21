import { useState } from 'react'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import './styles/colors.css'
import './styles/layout.css'
import { AdminLogin } from './pages/AdminLogin'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { ToastContainer } from 'react-toastify'

function App() {
  const [activeNav, setActiveNav] = useState('dashboard')

  return <><RouterProvider router={router} />  <ToastContainer /></>
}

export default App
