import { useEffect, useState } from 'react'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import './styles/colors.css'
import './styles/layout.css'
import { AdminLogin } from './pages/AdminLogin'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { toast, ToastContainer } from 'react-toastify'
import { getMe } from './services/admin/loginService'
import { useDispatch, useSelector } from 'react-redux'
import { setAccessToken, setAuthen } from './features/auth/authSlice'
import { store } from './app/store'
import { refreshAccessToken } from './services/admin/refreshAccessToken'

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    (async () => {
      const toastId = toast.loading("Đang tải trang...");
      try {
        const response = await refreshAccessToken();
        dispatch(setAccessToken(response.data.data.accessToken));
        toast.update(toastId, {
          render: "Truy cập thành công",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });

      } catch (e) {
        toast.update(toastId, {
          render: "Truy cập thành công",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        setReady(true);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  return <> {ready ? (
    <RouterProvider router={router} />
  ) : null}  <ToastContainer /></>
}

export default App
