import axios from "axios";

const API = `${import.meta.env.VITE_BASE_URL}/premium-payments`;

const getToken = () => localStorage.getItem("token");

export const getPremiumPayments = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createPremiumPayment = async (data) => {
  const res = await axios.post(API + "/", data, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return res.data;
};

export const updatePremiumPayment = async (id, data) => {
  const res = await axios.put(API + "/" + id, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return res.data;
};

export const deletePremiumPayment = async (id) => {
  const res = await axios.delete(API + "/" + id, {  
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return res.data;
};