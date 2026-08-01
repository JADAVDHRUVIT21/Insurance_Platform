import axios from "axios";

const API = `${import.meta.env.VITE_BASE_URL}/customers`;

const getToken = () => {
  return localStorage.getItem("token");
};

export const getCustomers = async () => {
  const res = await axios.get(API + "/");
  return res.data;
};

export const getCustomer = async (id) => {
  const res = await axios.get(API + "/" + id);
  return res.data;
};

export const createCustomer = async (customer) => {
  const res = await axios.post(
    API + "/",
    customer,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return res.data;
};

export const updateCustomer = async (
  id,
  customer
) => {

  const res = await axios.put(
    API + "/" + id,
    customer,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return res.data;
};

export const deleteCustomer = async (id) => {

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