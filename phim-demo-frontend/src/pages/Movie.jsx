import { useEffect, useMemo, useState } from 'react';
import '../styles/movie.css';
import { deleteMovie, getMovies } from '../services/movieService';
import { useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';
import { toast } from 'react-toastify';


export function Movie() {
    const [searchText, setSearchText] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterPublic, setFilterPublic] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalMovie, setTotalMovie] = useState(0);
    const [numberOfElements, setNumberOfElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getMovies(currentPage, 10);

                if (response.data.success) {
                    setMovies(response.data.data.content);
                    setCurrentPage(response.data.data.number + 1);
                    setTotalMovie(response.data.data.totalElements);
                    setNumberOfElements(response.data.data.numberOfElements);
                    setTotalPages(response.data.data.totalPages);
                }

            } catch (e) {

            }
        })();

    }, [currentPage]);



    const createMovie = () => {
        navigate('/admin/movies/create');
    }

    const handleEdit = (movie) => {
        navigate(`${movie.id}/edit`)
    };

    const handleDelete = (movie) => {
        alertify.confirm("Xác nhận xóa", "Bạn có chắc chắn muốn xóa phim này? Không thể hoàn tác sau khi xóa!!", async () => {
            try {
                const res = await deleteMovie(movie.id);
                if (res.data.success) {
                    setMovies((movies) => {
                        return movies.filter((item) => item.id !== movie.id);
                    });
                    toast.success("Xóa thành công");
                }

            } catch (e) {

            }


        }, () => {

        });
    };

    const rowsPerPage = 5;

    const filteredMovies = useMemo(() => {
        return movies.filter((movie) => {
            const searchValue = searchText.trim().toLowerCase();
            const matchesSearch =
                !searchValue ||
                movie.title.toLowerCase().includes(searchValue) ||
                movie.originalTitle.toLowerCase().includes(searchValue) ||
                movie.id.toString().includes(searchValue) ||
                movie.releaseYear.toString().includes(searchValue);

            const matchesType = filterType === 'all' || movie.type === filterType;
            const matchesPublic =
                filterPublic === 'all' ||
                (filterPublic === 'public' ? movie.isPublic : !movie.isPublic);

            return matchesSearch && matchesType && matchesPublic;
        });
    }, [movies, searchText, filterType, filterPublic]);





    const paginatedMovies = useMemo(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        return filteredMovies.slice(startIndex, startIndex + rowsPerPage);
    }, [filteredMovies, currentPage, rowsPerPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="movie-page">
            <div className="movie-page-header">
                <div>
                    <h2>Quản lý phim</h2>
                    <p>Hiển thị danh sách phim với tìm kiếm và bộ lọc cơ bản.</p>
                </div>
                <div className="movie-header-right">
                    <button className="create-button" onClick={createMovie}>Tạo phim</button>
                </div>
            </div>

            <div className="movie-filter-row">
                <label className="movie-filter-item">
                    <span>Tìm kiếm</span>
                    <input
                        type="text"
                        placeholder="Tên phim, id, năm phát hành..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </label>
                <label className="movie-filter-item">
                    <span>Loại phim</span>
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option value="all">Tất cả</option>
                        <option value="single">Single</option>
                        <option value="series">Series</option>
                    </select>
                </label>
                <label className="movie-filter-item">
                    <span>Trạng thái</span>
                    <select value={filterPublic} onChange={(e) => setFilterPublic(e.target.value)}>
                        <option value="all">Tất cả</option>
                        <option value="public">Công khai</option>
                        <option value="private">Riêng tư</option>
                    </select>
                </label>
            </div>

            <div className="movie-summary">
                <div>
                    <span className="movie-summary-count">{filteredMovies.length}</span> phim phù hợp
                </div>
                <div className="movie-summary-note">Bạn có thể tìm nhanh theo tên, id, năm phát hành hoặc lọc theo loại và trạng thái.</div>
            </div>

            <div className="movie-table-wrapper">
                <table className="movie-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tiêu đề</th>
                            <th>Năm</th>
                            <th>Loại</th>
                            <th>Trạng thái</th>
                            <th>Lượt xem</th>
                            <th>Ngày tạo</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="no-results">
                                    Không tìm thấy phim nào phù hợp.
                                </td>
                            </tr>
                        ) : (
                            movies.map((movie) => (
                                <tr key={movie.id}>
                                    <td>{movie.id}</td>
                                    <td>
                                        <div className="movie-title-column">
                                            <strong>{movie.title}</strong>
                                            <span>{movie.originalTitle}</span>
                                        </div>
                                    </td>
                                    <td>{movie.releaseYear}</td>
                                    <td>{movie.type === 'single' ? 'Single' : 'Series'}</td>
                                    <td>
                                        <span className={`status-badge ${movie.isPublic ? 'status-public' : 'status-private'}`}>
                                            {movie.isPublic ? 'Công khai' : 'Riêng tư'}
                                        </span>
                                    </td>
                                    <td>{movie.views}</td>
                                    <td>{new Date(movie.createdAt).toLocaleDateString('vi-VN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}</td>
                                    <td className="movie-actions-cell">
                                        <button className="action-button edit-button" onClick={() => handleEdit(movie)}>
                                            Sửa
                                        </button>
                                        <button className="action-button delete-button" onClick={() => handleDelete(movie)}>
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="movie-pagination">
                <div className="movie-pagination-info">
                    Hiển thị {numberOfElements} trên {totalMovie} phim
                </div>
                <div className="movie-pagination-buttons">
                    <button
                        className="pagination-action"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Trước
                    </button>

                    <button

                        className="page-button active"
                        onClick={() => handlePageChange(currentPage)}
                    >
                        {currentPage}
                    </button>

                    <button
                        className="pagination-action"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Tiếp
                    </button>
                </div>
            </div>
        </div>
    );
}
