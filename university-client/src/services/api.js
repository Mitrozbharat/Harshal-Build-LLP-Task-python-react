import axios from "axios";

// Axios instance with baseURL = /api
const api = axios.create({
    baseURL: "/api", // proxy will forward this to http://localhost:8000
});

export default api;
