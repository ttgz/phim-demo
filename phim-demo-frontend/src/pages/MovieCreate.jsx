import '../styles/movie.css';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createMovie, getResignedUrl, updateVideoUrlToMovie, uploadMovie, uploadThumbnail } from '../services/movieService';
import { toast } from 'react-toastify';

const movieSchema = z.object({
    title: z.string().min(1, 'Tiêu đề là bắt buộc.'),
    originalTitle: z.string().min(1, 'Tên gốc là bắt buộc.'),
    description: z.string().min(1, 'Mô tả là bắt buộc.'),
    thumbnail: z.instanceof(File, { message: 'Ảnh thumbnail là bắt buộc.' }).refine(
        (file) => file.type.startsWith('image/'),
        'Thumbnail phải là ảnh.'
    ),
    url: z.instanceof(File, { message: 'File video là bắt buộc.' }).refine(
        (file) => file.type.startsWith('video/'),
        'URL phải là file video.'
    ),
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
    releaseYear: 2026,
    duration: 125,
    totalEpisodes: 1,
    type: 'single',
    isPublic: true,
};

export function MovieCreate() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(movieSchema),
        defaultValues,
    });


    const onSubmit = async (data) => {
        const payload = {
            ...data,
            thumbnail: "example.com",
            url: '',
        };

        try {

            const toastId = toast.loading(
                "Đang tải video..."
            );
            const response = await createMovie(payload);
            const movieId = response.data.data.id;

            const formData = new FormData();
            formData.append("image", data.thumbnail);
            const thumbnailUrlResponse = await uploadThumbnail(formData);
            const thumbnailUrl = thumbnailUrlResponse.data.fileUrl;
            const thumbnailKey= thumbnailUrlResponse.data.key;

            const video = data.url;
            const fileName = data.url.name;
            const contentType = data.url.type;
            const resignedUrlResponse = await getResignedUrl(fileName, contentType);
            const uploadUrl = resignedUrlResponse.data.uploadUrl;
            const fileUrl = resignedUrlResponse.data.fileUrl;
            const urlKey = resignedUrlResponse.data.key;
            const uploadMovieReponse = await uploadMovie(uploadUrl, video, contentType, (percent) => {

                toast.update(toastId, {
                    render:
                        `Đang tải video... ${percent}%`,
                    isLoading: true,
                });

            });

            const updateUrlToVideo = await updateVideoUrlToMovie(movieId, fileUrl, thumbnailUrl, urlKey, thumbnailKey);

            toast.update(toastId, {
                render: "Upload thành công",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            navigate(`/admin/movies/${movieId}/edit`);
        } catch (e) {
            toast.update(toastId, {
                render: "Upload thất bại",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        } finally {

        }

    };

    return (
        <div className="movie-page">
            <div className="movie-page-header">
                <div>
                    <h2>Tạo phim mới</h2>
                    <p>Nhập đầy đủ thông tin phim và lưu để thêm phim mới vào hệ thống.</p>
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
                        <label htmlFor="thumbnail">Thumbnail (ảnh)</label>
                        <Controller
                            name="thumbnail"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <input
                                        id="thumbnail"
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => field.onChange(event.target.files?.[0])}
                                        className="file-input"
                                    />
                                    {field.value?.name && <div className="file-info">{field.value.name}</div>}
                                </>
                            )}
                        />
                        {errors.thumbnail && <div className="form-error">{errors.thumbnail.message}</div>}
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

                    <div className="form-field">
                        <label htmlFor="url">Video (URL)</label>
                        <Controller
                            name="url"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <input
                                        id="url"
                                        type="file"
                                        accept="video/*"
                                        onChange={(event) => field.onChange(event.target.files?.[0])}
                                        className="file-input"
                                    />
                                    {field.value?.name && <div className="file-info">{field.value.name}</div>}
                                </>
                            )}
                        />
                        {errors.url && <div className="form-error">{errors.url.message}</div>}
                    </div>
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
