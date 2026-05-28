import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getMovieById, updateMovie } from '../services/movieService';
import '../styles/movie.css';

const movieSchema = z.object({
    title: z.string().min(1, 'Tiêu đề là bắt buộc.'),
    originalTitle: z.string().min(1, 'Tên gốc là bắt buộc.'),
    description: z.string().min(1, 'Mô tả là bắt buộc.'),
    thumbnailUrl: z.string().url('Thumbnail phải là một đường dẫn hợp lệ.'),
    videoUrl: z.string().url('URL video phải là một đường dẫn hợp lệ.'),
    releaseYear: z.coerce.number().int().gte(1900, 'Năm phát hành không hợp lệ.'),
    duration: z.coerce.number().positive('Thời lượng phải lớn hơn 0.'),
    totalEpisodes: z.coerce.number().int().positive('Số tập phải lớn hơn 0.'),
    type: z.enum(['single', 'series'], 'Loại phim phải là Single hoặc Series.'),
    isPublic: z.boolean(),
});

const defaultValues = {
    title: '',
    originalTitle: '',
    description: '',
    thumbnailUrl: '',
    videoUrl: '',
    releaseYear: new Date().getFullYear(),
    duration: 0,
    totalEpisodes: 1,
    type: 'single',
    isPublic: true,
};

export function MovieEdit() {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const [loading, setLoading] = useState(true);
    const [serverError, setServerError] = useState('');
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(movieSchema),
        defaultValues,
    });

    const thumbnailUrl = watch('thumbnailUrl');
    const videoUrl = watch('videoUrl');

    useEffect(() => {
        if (!movieId) {
            navigate('/admin/movies');
            return;
        }

        (async () => {
            try {
                const response = await getMovieById(movieId);
                const movie = response.data.data;
                reset({
                    title: movie.title || '',
                    originalTitle: movie.originalTitle || '',
                    description: movie.description || '',
                    thumbnailUrl: movie.thumbnail || movie.thumbnailUrl || '',
                    videoUrl: movie.url || movie.videoUrl || '',
                    releaseYear: movie.releaseYear || new Date().getFullYear(),
                    duration: movie.duration || 0,
                    totalEpisodes: movie.totalEpisodes || 1,
                    type: movie.type || 'single',
                    isPublic: movie.isPublic ?? true,
                });
            } catch (error) {
                setServerError('Không tải được thông tin phim. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        })();
    }, [movieId, navigate, reset]);

    const onSubmit = async (data) => {
        setServerError('');
        try {
            await updateMovie(movieId, {
                title: data.title,
                originalTitle: data.originalTitle,
                description: data.description,
                thumbnail: data.thumbnailUrl,
                url: data.videoUrl,
                releaseYear: data.releaseYear,
                duration: data.duration,
                totalEpisodes: data.totalEpisodes,
                type: data.type,
                isPublic: data.isPublic,
            });
            alert('Cập nhật phim thành công!');
            navigate('/admin/movies');
        } catch (error) {
            setServerError('Cập nhật thất bại. Vui lòng kiểm tra lại và thử lại.');
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="movie-page">
                <div className="movie-page-header">
                    <div>
                        <h2>Đang tải phim...</h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="movie-page">
            <div className="movie-page-header">
                <div>
                    <h2>Chỉnh sửa phim</h2>
                    <p>Chỉnh sửa thông tin phim và xem trước ảnh thumbnail cùng video ngay khi nhập đường dẫn.</p>
                </div>
            </div>

            <div className="movie-form-wrapper">
                <form className="movie-form-grid" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="form-field">
                        <label htmlFor="title">Tiêu đề</label>
                        <input id="title" {...register('title')} />
                        {errors.title && <div className="form-error">{errors.title.message}</div>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="originalTitle">Tên gốc</label>
                        <input id="originalTitle" {...register('originalTitle')} />
                        {errors.originalTitle && <div className="form-error">{errors.originalTitle.message}</div>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="thumbnailUrl">Thumbnail URL</label>
                        <input id="thumbnailUrl" {...register('thumbnailUrl')} placeholder="https://..."  disabled/>
                        {errors.thumbnailUrl && <div className="form-error">{errors.thumbnailUrl.message}</div>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="videoUrl">Video URL</label>
                        <input id="videoUrl" {...register('videoUrl')} placeholder="https://..." disabled />
                        {errors.videoUrl && <div className="form-error">{errors.videoUrl.message}</div>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="description">Mô tả</label>
                        <textarea id="description" {...register('description')} rows="4" />
                        {errors.description && <div className="form-error">{errors.description.message}</div>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="releaseYear">Năm phát hành</label>
                        <input id="releaseYear" type="number" {...register('releaseYear')} />
                        {errors.releaseYear && <div className="form-error">{errors.releaseYear.message}</div>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="duration">Thời lượng (phút)</label>
                        <input id="duration" type="number" {...register('duration')} />
                        {errors.duration && <div className="form-error">{errors.duration.message}</div>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="totalEpisodes">Tổng số tập</label>
                        <input id="totalEpisodes" type="number" {...register('totalEpisodes')} />
                        {errors.totalEpisodes && <div className="form-error">{errors.totalEpisodes.message}</div>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="type">Loại phim</label>
                        <select id="type" {...register('type')}>
                            <option value="single">Single</option>
                            <option value="series">Series</option>
                        </select>
                        {errors.type && <div className="form-error">{errors.type.message}</div>}
                    </div>

                    <div className="form-field checkbox-field">
                        <label htmlFor="isPublic">Công khai</label>
                        <input id="isPublic" type="checkbox" {...register('isPublic')} />
                    </div>

                    <div className="form-field" style={{ gridColumn: '1 / -1' }}>
                        <div className="media-preview">
                            <strong>Xem trước thumbnail</strong>
                            {thumbnailUrl ? (
                                <img src={thumbnailUrl} alt="Thumbnail preview" onError={(e) => e.currentTarget.setAttribute('alt', 'Thumbnail không hợp lệ')} />
                            ) : (
                                <div className="preview-placeholder">Nhập URL ảnh để xem trước thumbnail.</div>
                            )}
                        </div>
                    </div>

                    <div className="form-field" style={{ gridColumn: '1 / -1' }}>
                        <div className="media-preview">
                            <strong>Xem trước video</strong>
                            {videoUrl ? (
                                <video controls src={videoUrl} />
                            ) : (
                                <div className="preview-placeholder">Nhập URL video để xem trước.</div>
                            )}
                        </div>
                    </div>

                    {serverError && <div className="form-error" style={{ gridColumn: '1 / -1' }}>{serverError}</div>}

                    <div className="form-actions" style={{ gridColumn: '1 / -1' }}>
                        <button type="button" className="pagination-action" onClick={() => navigate('/admin/movies')}>
                            Hủy
                        </button>
                        <button type="submit" className="page-button active">
                            Lưu phim
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
