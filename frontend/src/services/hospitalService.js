import axios from "axios";

const API = `/hospitals`;

const getToken = () => {
  return localStorage.getItem("token");
};

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

// ===============================
// Get All Hospitals
// ===============================

export const getHospitals = async () => {

  const res = await axios.get(
    API + "/"
  );

  return res.data;

};

// ===============================
// Get Single Hospital
// ===============================

export const getHospital = async (id) => {

  const res = await axios.get(
    API + "/" + id
  );

  return res.data;

};

// ===============================
// Create Hospital
// ===============================

export const createHospital = async (
  hospital
) => {

  const res = await axios.post(
    API + "/",
    hospital,
    authHeaders()
  );

  return res.data;

};

// ===============================
// Update Hospital
// ===============================

export const updateHospital = async (
  id,
  hospital
) => {

  const res = await axios.put(
    API + "/" + id,
    hospital,
    authHeaders()
  );

  return res.data;

};

// ===============================
// Delete Hospital
// ===============================

export const deleteHospital = async (
  id
) => {

  const res = await axios.delete(
    API + "/" + id,
    authHeaders()
  );

  return res.data;

};