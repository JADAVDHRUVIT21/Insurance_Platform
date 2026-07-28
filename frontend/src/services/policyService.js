import axios from "axios";

const API = "http://127.0.0.1:5000/api/policies";

const getToken = () => {
  return localStorage.getItem("token");
};

// Get All Policies
export const getPolicies = async () => {
  const res = await axios.get(API + "/");
  return res.data;
};

// Get One Policy
export const getPolicy = async (id) => {
  const res = await axios.get(API + "/" + id);
  return res.data;
};

// Create Policy
export const createPolicy = async (policy) => {
  const res = await axios.post(
    API + "/",
    policy,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return res.data;
};

// Update Policy
export const updatePolicy = async (id, policy) => {
  const res = await axios.put(
    API + "/" + id,
    policy,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return res.data;
};

// Delete Policy
export const deletePolicy = async (id) => {
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