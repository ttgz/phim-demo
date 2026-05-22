import axios from "axios";
import { getRefreshToken } from "../../utils/token"

export const refreshAccessToken = () => {
    const refreshToken = getRefreshToken();
    return axios.post('http://localhost:8080/api/admin/auth/refresh', {refreshToken});
}