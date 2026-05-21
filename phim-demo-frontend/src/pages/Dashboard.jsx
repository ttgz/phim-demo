import '../styles/dashboard.css';

export function Dashboard() {
  const stats = [
    {
      title: 'Tổng Phim',
      value: '128',
      icon: '🎬',
      change: '+12%',
      color: '#ef4444',
    },
    {
      title: 'Người Dùng Hoạt Động',
      value: '3,456',
      icon: '👥',
      change: '+23%',
      color: '#3b82f6',
    },
    {
      title: 'Lượt Xem',
      value: '45.2K',
      icon: '👁️',
      change: '+18%',
      color: '#10b981',
    },
    {
      title: 'Đánh Giá Trung Bình',
      value: '4.8/5',
      icon: '⭐',
      change: '+2%',
      color: '#f59e0b',
    },
  ];

  const recentMovies = [
    {
      id: 1,
      title: 'Avengers: Endgame',
      director: 'Anthony Russo',
      views: '15.2K',
      status: 'Công Khai',
    },
    {
      id: 2,
      title: 'Dune',
      director: 'Denis Villeneuve',
      views: '12.8K',
      status: 'Công Khai',
    },
    {
      id: 3,
      title: 'The Batman',
      director: 'Matt Reeves',
      views: '9.4K',
      status: 'Công Khai',
    },
    {
      id: 4,
      title: 'Oppenheimer',
      director: 'Christopher Nolan',
      views: '8.7K',
      status: 'Công Khai',
    },
    {
      id: 5,
      title: 'Godzilla Minus One',
      director: 'Takashi Yamazaki',
      views: '7.2K',
      status: 'Công Khai',
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Chào mừng quay lại! Đây là tổng quan về hệ thống.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-change" style={{ color: stat.color }}>
                {stat.change} từ tháng trước
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h3>Lượt Xem Theo Tuần</h3>
          <div className="chart-placeholder">
            <div className="chart-bar" style={{ height: '30%' }}></div>
            <div className="chart-bar" style={{ height: '45%' }}></div>
            <div className="chart-bar" style={{ height: '35%' }}></div>
            <div className="chart-bar" style={{ height: '60%' }}></div>
            <div className="chart-bar" style={{ height: '55%' }}></div>
            <div className="chart-bar" style={{ height: '70%' }}></div>
            <div className="chart-bar" style={{ height: '65%' }}></div>
          </div>
          <div className="chart-labels">
            <span>T2</span>
            <span>T3</span>
            <span>T4</span>
            <span>T5</span>
            <span>T6</span>
            <span>T7</span>
            <span>CN</span>
          </div>
        </div>

        <div className="chart-container">
          <h3>Tỷ Lệ Người Dùng Mới</h3>
          <div className="pie-chart">
            <div className="pie-slice" style={{ background: 'conic-gradient(#ef4444 0deg 144deg, #3b82f6 144deg 216deg, #10b981 216deg 360deg)' }}></div>
          </div>
          <div className="pie-legend">
            <div><span style={{ color: '#ef4444' }}>●</span> Tháng này: 45%</div>
            <div><span style={{ color: '#3b82f6' }}>●</span> Tháng trước: 30%</div>
            <div><span style={{ color: '#10b981' }}>●</span> Quý trước: 25%</div>
          </div>
        </div>
      </div>

      <div className="recent-section">
        <h3>Phim Được Xem Nhiều Nhất</h3>
        <div className="table-container">
          <table className="movies-table">
            <thead>
              <tr>
                <th>Tên Phim</th>
                <th>Đạo Diễn</th>
                <th>Lượt Xem</th>
                <th>Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              {recentMovies.map((movie) => (
                <tr key={movie.id}>
                  <td className="movie-title">{movie.title}</td>
                  <td>{movie.director}</td>
                  <td>{movie.views}</td>
                  <td>
                    <span className="status-badge">{movie.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
