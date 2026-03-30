
import axios from "axios";

const AUTH_URL = "http://localhost:8084/auth";

export const login = async (data) => {
    const res = await axios.post(`${AUTH_URL}/login`, data);

    // store token
    localStorage.setItem("token", res.data.token);

    return res.data;
};