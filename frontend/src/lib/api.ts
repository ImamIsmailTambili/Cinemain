import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3001/user",
    withCredentials: true, // penting untuk cookie JWT
});
