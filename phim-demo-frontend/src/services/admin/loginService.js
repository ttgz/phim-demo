import axios, { Axios } from "axios";
import api from "../axios";
 

export const loginAdmin = (data) => {
    return axios.post('http://localhost:8080/api/admin/auth/login', data);
}

export const getMe = () => {
    return api.get('/admin/auth/me');
}