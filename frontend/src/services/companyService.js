import axios from "axios";

const API_URL = "/api/companies"; 

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

// Get all companies
export const getCompanies = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Get Companies Error:", error.response?.data || error.message);
    throw error;
  }
};

// Get single company
export const getCompany = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get Company Error:", error.response?.data || error.message);
    throw error;
  }
};

// Create company
export const createCompany = async (company) => {
  try {
    const response = await axios.post(
      API_URL,
      company,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Create Company Error:", error.response?.data || error.message);
    throw error;
  }
};

// Update company
export const updateCompany = async (id, company) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      company,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Update Company Error:", error.response?.data || error.message);
    throw error;
  }
};

// Delete company
export const deleteCompany = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/${id}`,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Delete Company Error:", error.response?.data || error.message);
    throw error;
  }
};