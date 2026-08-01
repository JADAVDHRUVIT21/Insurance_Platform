import axios from "axios";

const API = "http://127.0.0.1:5000/api/policies";

const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

// ======================
// Get All Policies
// ======================

export const getPolicies = async () => {
  const res = await axios.get(API + "/");

  // Backend may return:
  // { policies: [...] }
  // or
  // [ ... ]

  return res.data.policies || res.data || [];
};

// ======================
// Get One Policy
// ======================

export const getPolicy = async (id) => {
  const res = await axios.get(API + "/" + id);
  return res.data.policy || res.data;
};

// ======================
// Create Policy
// ======================

export const createPolicy = async (policy) => {
  const res = await axios.post(
    API + "/",
    policy,
    authHeaders()
  );

  return res.data;
};

// ======================
// Update Policy
// ======================

export const updatePolicy = async (id, policy) => {
  const res = await axios.put(
    API + "/" + id,
    policy,
    authHeaders()
  );

  return res.data;
};

// ======================
// Delete Policy
// ======================

export const deletePolicy = async (id) => {
  const res = await axios.delete(
    API + "/" + id,
    authHeaders()
  );

  return res.data;
};