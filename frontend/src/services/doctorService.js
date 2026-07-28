import axios from "axios";

const API = "http://127.0.0.1:5000/api/doctors";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getDoctors = async () => {

  const res = await axios.get(API);

  return res.data;

};

export const getDoctor = async (id) => {

  const res = await axios.get(
    API + "/" + id
  );

  return res.data;

};

export const createDoctor = async (doctor) => {

  const res = await axios.post(
    API + "/",
    doctor,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return res.data;

};

export const updateDoctor = async (
  id,
  doctor
) => {

  const res = await axios.put(
    API + "/" + id,
    doctor,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return res.data;

};

export const deleteDoctor = async (
  id
) => {

  const res = await axios.delete(
    API + "/" + id,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return res.data;

};