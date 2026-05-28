import axios from "axios";
import api from "../services/axios";
import { toast } from "react-toastify";
export const getMovies = (page = 1, size = 10) => {
    return api.get('/admin/movies', {
        params: {
            page, size
        }
    });
}

export const createMovie = (data) => {
    return api.post('/admin/movies', data);
}

export const getResignedUrl = (fileName, contentType) => {
    return api.post('/admin/uploads/video', null, {
        params: {
            fileName,
            contentType
        }
    });
}

export const uploadMovie = (uploadUrl, video, type, onProgress) => {
    return axios.put(uploadUrl, video, {
        headers: { 'Content-Type': type },
        onUploadProgress(progressEvent) {

            if (!progressEvent.total) return;

            const percent = Math.round(
                (progressEvent.loaded * 100) /
                progressEvent.total
            );

            if (onProgress) {
                onProgress(percent);
            }
        }
    });
}

export const uploadThumbnail = (image) => {
    return api.post('/admin/uploads/thumbnail', image)
}
export const updateVideoUrlToMovie = (movieId, fileUrl, thumbnailUrl) => {
    return api.put(`/admin/movies/${movieId}`, { url: fileUrl, thumbnail: thumbnailUrl });
}

export const getMovieById = (movieId) => {
    return api.get(`/admin/movies/${movieId}`);
}

export const updateMovie = (movieId, data) => {
    return api.put(`/admin/movies/${movieId}`, data);
}