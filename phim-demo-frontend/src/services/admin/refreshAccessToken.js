import axios from "axios";
import { getRefreshToken } from "../../utils/token"


const BASE_URL = import.meta.env.VITE_API_URL;
export const refreshAccessToken = () => {
    const refreshToken = getRefreshToken();
    return axios.post(` ${BASE_URL}/admin/auth/refresh`, {refreshToken});
}