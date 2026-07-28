import axios from "axios";

const API = "http://127.0.0.1:5000/api/medicines";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getMedicines = async () => {

  const res = await axios.get(API);

  return res.data;

};

export const getMedicine = async (id) => {

  const res = await axios.get(
    API + "/" + id
  );

  return res.data;

};

export const createMedicine = async (medicine) => {

  const res = await axios.post(
    API + "/",
    medicine,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return res.data;

};

export const updateMedicine = async (
  id,
  medicine
) => {

  const res = await axios.put(
    API + "/" + id,
    medicine,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return res.data;

};

export const deleteMedicine = async (
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