import axios from "axios";

const API = `/claims`;

const getToken = () => {
  return localStorage.getItem("token");
};

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

// ============================
// Get All Claims
// ============================

export const getClaims = async () => {

  const res = await axios.get(
    API + "/"
  );

  return res.data;

};

// ============================
// Get Single Claim
// ============================

export const getClaim = async (id) => {

  const res = await axios.get(
    API + "/" + id
  );

  return res.data;

};

// ============================
// Create Claim
// ============================

export const createClaim = async (claim) => {

  const res = await axios.post(
    API + "/",
    claim,
    authHeaders()
  );

  return res.data;

};

// ============================
// Update Claim
// ============================

export const updateClaim = async (
  id,
  claim
) => {

  const res = await axios.put(
    API + "/" + id,
    claim,
    authHeaders()
  );

  return res.data;

};

// ============================
// Delete Claim
// ============================

export const deleteClaim = async (
  id
) => {

  const res = await axios.delete(
    API + "/" + id,
    authHeaders()
  );

  return res.data;

};

// ============================
// Approve Claim
// ============================

export const approveClaim = async (
  id
) => {

  const res = await axios.put(
    API + "/" + id + "/approve",
    {},
    authHeaders()
  );

  return res.data;

};

// ============================
// Reject Claim
// ============================

export const rejectClaim = async (
  id
) => {

  const res = await axios.put(
    API + "/" + id + "/reject",
    {},
    authHeaders()
  );

  return res.data;

};