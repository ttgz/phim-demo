import { useState } from 'react';
import '../styles/login.css';

export function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setLoading(true);

  //   try {
  //     // TODO: Replace with actual API call
  //     const response = await fetch('/api/admin/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Đăng nhập thất bại');
  //     }

  //     const data = await response.json();
  //     localStorage.setItem('adminToken', data.token);
  //     localStorage.setItem('adminUser', JSON.stringify(data.user));
  //     onLogin(data.user);
  //   } catch (err) {
  //     setError(err.message || 'Lỗi đăng nhập');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🎬 CinemaHub</h1>
          <p>Quản Lý Phim</p>
        </div>

        <form  className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <p>© 2024 CinemaHub - Hệ Thống Quản Lý Phim</p>
        </div>
      </div>
    </div>
  );
}
