import axios from "axios";

const API = `${import.meta.env.VITE_BASE_URL}/doctors`;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

export const getDoctors = async () => {
  const res = await axios.get(`${API}/`);
  return res.data;
};

export const getDoctor = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

export const createDoctor = async (doctor) => {
  const res = await axios.post(
    `${API}/`,
    doctor,
    authHeader()
  );

  return res.data;
};

export const updateDoctor = async (
  id,
  doctor
) => {
  const res = await axios.put(
    `${API}/${id}`,
    doctor,
    authHeader()
  );

  return res.data;
};

export const deleteDoctor = async (id) => {
  const res = await axios.delete(
    `${API}/${id}`,
    authHeader()
  );

  return res.data;
};