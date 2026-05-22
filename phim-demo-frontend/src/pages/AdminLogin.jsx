import { useState } from 'react';
import '../styles/login.css';
import { loginSuccess } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../services/axios';
import { loginAdmin } from '../services/admin/loginService';
import { store } from '../app/store';
import { toast } from 'react-toastify';
import { setRefreshToken } from '../utils/token';

export function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    // try {
    //   event.preventDefault()
    //   const response = await loginAdmin({ username, password });
    //   const data = response.data;
    //   if (data.success) {
    //     dispatch(loginSuccess({
    //       accessToken: data.data.accessToken,
    //       user: "Admin"
    //     }));
    //     navigate('/admin');
    //     toast.success("Đăng nhập thành công!");
    //   }

    // } catch (e) {
    //   toast.warning(e.response.data.message);
    // }
    event.preventDefault();

    try {

      const response = await toast.promise(

        loginAdmin({
          username,
          password
        }),

        {
          pending: "Đang đăng nhập...",
          success: "Đăng nhập thành công",
          error: "Đăng nhập thất bại"
        }

      );

      const data = response.data;

      dispatch(loginSuccess({
        accessToken: data.data.accessToken,
        user: "Admin"
      }));
      setRefreshToken(data.data.refreshToken);

      navigate('/admin');

    } catch (e) {

      toast.warning(e.response.data.message);
    }

  }
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🎬 CinemaHub</h1>
          <p>Quản Lý Phim</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="username"
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật Khẩu</label>
            <input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
          </button>
        </form>

        <div className="login-footer">
          <p>© 2026 CinemaHub - Hệ Thống Quản Lý Phim</p>
        </div>
      </div>
    </div>
  );
}
