import axios from "axios";

const API = `${import.meta.env.VITE_BASE_URL}/auth`;

// ==============================
// Login
// ==============================

export const login = async (credentials) => {

  const res = await axios.post(
    API + "/login",
    credentials
  );

  // Save token
  localStorage.setItem(
    "token",
    res.data.token
  );

  // Save user
  localStorage.setItem(
    "user",
    JSON.stringify(res.data.user)
  );

  return res.data;

};

// ==============================
// Register
// ==============================

export const register = async (userData) => {

  const res = await axios.post(
    API + "/register",
    userData
  );

  return res.data;

};

// ==============================
// Logout
// ==============================

export const logout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("user");

};

// ==============================
// Get Token
// ==============================

export const getToken = () => {
  return localStorage.getItem("token");
};

// ==============================
// Get Logged User
// ==============================

export const getCurrentUser = () => {

  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;

};