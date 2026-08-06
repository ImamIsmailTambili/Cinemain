import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true, // penting untuk cookie JWT
});
