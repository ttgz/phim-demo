import axios, { Axios } from "axios";
import api from "../axios";
 
const BASE_URL = import.meta.env.VITE_API_URL;
export const loginAdmin = (data) => {
    return axios.post(`${BASE_URL}/admin/auth/login`, data);
}

export const getMe = () => {
    return api.get('/admin/auth/me');
}