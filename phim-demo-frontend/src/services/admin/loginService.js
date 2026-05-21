import axios, { Axios } from "axios";
 

export const loginAdmin = (data) => {
    return axios.post('http://localhost:8080/api/admin/auth/login', data);
}

