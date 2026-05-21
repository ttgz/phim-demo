import { useNavigate } from "react-router-dom";
import "../styles/NotFound.css";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1 className="error-title">Oops! Trang không tồn tại</h1>
        <p className="error-description">
          Xin lỗi, trang bạn đang tìm kiếm không thể được tìm thấy.
        </p>

        <div className="error-illustration">
          <div className="movie-icon">🎬</div>
        </div>

        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
};
