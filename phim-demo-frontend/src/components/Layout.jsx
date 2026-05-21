import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

export function Header({ user, isAuthenticated }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout);
    navigate('/admin/login');
  }

  return (
    <div className="header">
      <h1>🎬 Quản Lý Phim</h1>
      <div className="header-actions">
        <div className="user-profile">
          <div className="user-avatar">{user?.name || 'A'}</div>
          <span>{user?.name || 'Admin'}</span>
          <button onClick={handleLogout} className="logout-btn">
            Đăng Xuất
          </button>
        </div>
      </div>
    </div>
  );
}

export function Sidebar({ activeNav, onNavChange }) {
  const menuItems = [
    {
      id: '/',
      label: 'Dashboard',
      icon: '📊',
    },
    {
      id: '/movies',
      label: 'Danh Sách Phim',
      icon: '🎥',
    },
    {
      id: '/categories',
      label: 'Thể Loại',
      icon: '🏷️',
    },
    {
      id: '/users',
      label: 'Người Dùng',
      icon: '👥',
    },
    {
      id: '/stats',
      label: 'Thống Kê',
      icon: '📈',
    },
    {
      id: '/settings',
      label: 'Cài Đặt',
      icon: '⚙️',
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>CinemaHub</h2>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-section-title">Menu</div>
          {menuItems.map((item) => (
            <NavLink key={item.id} to={item.id} className={`nav-link ${activeNav === item.id ? 'active' : ''}`}>
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
            // <a
            //   key={item.id}
            //   className={`nav-link ${activeNav === item.id ? 'active' : ''}`}
            //   onClick={() => onNavChange(item.id)}
            // >
            //   <span className="nav-icon">{item.icon}</span>
            //   <span>{item.label}</span>
            // </a>
          ))}
        </div>
      </nav>
      <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.875rem', textAlign: 'center' }}>
        v1.0.0
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <div className="footer">
      © 2024 CinemaHub - Quản Lý Phim Chuyên Nghiệp
    </div>
  );
}

export function Layout({ children, activeNav, onNavChange, onLogout }) {


  const user = useSelector((state) => {
    state.auth.user;
  });

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);




  return (
    <div className="layout">
      <Sidebar activeNav={activeNav} onNavChange={onNavChange} />
      <div className="main-content">
        <Header user={user} isAuthenticated={isAuthenticated} />
        <div className="content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
