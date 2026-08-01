import axios from "axios";

const API = `${import.meta.env.VITE_BASE_URL}/profile`;

const authHeader = () => {
  const token = localStorage.getItem("token");

  console.log("TOKEN =", token);

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const getProfile = async () => {
  const res = await axios.get(API + "/", authHeader());
  return res.data;
};

export const updateProfile = async () => {
  throw new Error("Update Profile API not implemented.");
};

export const changePassword = async () => {
  throw new Error("Change Password API not implemented.");
};

export const uploadProfilePicture = async () => {
  throw new Error("Upload Picture API not implemented.");
};

export const deleteProfilePicture = async () => {
  throw new Error("Delete Picture API not implemented.");
};

export const getActivityLog = async () => {
  return [];
};