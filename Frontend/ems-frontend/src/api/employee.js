import { empClient } from './api';

export const getEmployees = async () => {
  return empClient.get('');
};

export const getEmployeeById = async (id) => {
  return empClient.get(`/${id}`);
};

export const createEmployee = async (employeeData) => {
  return empClient.post('', employeeData);
};

export const updateEmployee = async (id, employeeData) => {
  return empClient.put(`/${id}`, employeeData);
};

export const deleteEmployee = async (id) => {
  return empClient.delete(`/${id}`);
};
