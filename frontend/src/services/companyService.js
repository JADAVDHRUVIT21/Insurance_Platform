import axios from "axios";

const API = "http://127.0.0.1:5000/api/companies";

const token = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getCompanies = async () => {
  const res = await axios.get(`${API}/`);
  return res.data;
};

export const createCompany = async (company) => {
  const res = await axios.post(`${API}/`, company, token());
  return res.data;
};

export const updateCompany = async (id, company) => {
  const res = await axios.put(`${API}/${id}`, company, token());
  return res.data;
};

export const deleteCompany = async (id) => {
  const res = await axios.delete(`${API}/${id}`, token());
  return res.data;
};