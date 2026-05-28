import axios from "axios";
import { store } from "../app/store";
import { getRefreshToken, removeRefreshToken } from "../utils/token";
import { logout, setAccessToken } from "../features/auth/authSlice";


const BASE_URL = import.meta.env.VITE_API_URL
const api = axios.create({
    baseURL: BASE_URL
});


api.interceptors.request.use(
  (config) => {

    // lấy access token từ redux
    const accessToken =
      store.getState().auth.accessToken;

    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }
    return config;
  },

  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        const refreshToken =
          getRefreshToken();

        // gọi refresh token
        const response = await axios.post(
          BASE_URL+ "/admin/auth/refresh",
          {
            refreshToken,
          }
        );

        const newAccessToken =
          response.data.data.accessToken;

        // lưu access token mới vào redux
        store.dispatch(
          setAccessToken(newAccessToken)
        );

        // gắn token mới vào request cũ
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;
        // gọi lại request cũ
        return api(originalRequest);

      } catch (refreshError) {

        store.dispatch(logout());

        removeRefreshToken();

        window.location.href = "/admin/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;