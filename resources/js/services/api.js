import axios from "axios";
import { getToken } from "./auth";

const baseURL =
    window.location.href.indexOf("localhost") !== "-1"
        ? "http://localhost:8000/api"
        : "http://atlantico-fullstack-challenge.herokuapp.com/api";

const api = axios.create({ baseURL });

api.interceptors.request.use(async (config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
