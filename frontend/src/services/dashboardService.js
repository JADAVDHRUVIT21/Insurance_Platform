import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

export const getDashboard = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/api/dashboard/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};