import axios from "axios";

const API = `${import.meta.env.VITE_BASE_URL}/premium-payments`;

const getToken = () => {
  return localStorage.getItem("token");
};

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

// ==============================
// Get All Payments
// ==============================

export const getPayments = async () => {

  const res = await axios.get(
    API + "/"
  );

  return res.data;

};

// ==============================
// Get Single Payment
// ==============================

export const getPayment = async (id) => {

  const res = await axios.get(
    API + "/" + id
  );

  return res.data;

};

// ==============================
// Create Payment
// ==============================

export const createPayment = async (payment) => {

  const res = await axios.post(
    API + "/",
    payment,
    authHeaders()
  );

  return res.data;

};

// ==============================
// Update Payment
// ==============================

export const updatePayment = async (
  id,
  payment
) => {

  const res = await axios.put(
    API + "/" + id,
    payment,
    authHeaders()
  );

  return res.data;

};

// ==============================
// Delete Payment
// ==============================

export const deletePayment = async (id) => {

  const res = await axios.delete(
    API + "/" + id,
    authHeaders()
  );

  return res.data;

};