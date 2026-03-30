
import axios from "axios";

const EMP_URL = "http://localhost:8085/employees";

// helper to get token
const getAuthHeader = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// GET ALL
export const getEmployees = async () => {
    return axios.get(EMP_URL, getAuthHeader());
};

// CREATE
export const createEmployee = async (data) => {
    return axios.post(EMP_URL, data, getAuthHeader());
};

// UPDATE
export const updateEmployee = async (id, data) => {
    return axios.put(`${EMP_URL}/${id}`, data, getAuthHeader());
};

// DELETE
export const deleteEmployee = async (id) => {
    return axios.delete(`${EMP_URL}/${id}`, getAuthHeader());
};