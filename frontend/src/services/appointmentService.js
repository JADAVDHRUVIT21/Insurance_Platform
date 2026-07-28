import axios from "axios";

const API = "http://127.0.0.1:5000/api/appointments";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getAppointments = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const getAppointment = async (id) => {
  const res = await axios.get(API + "/" + id);
  return res.data;
};

export const createAppointment = async (appointment) => {
  const res = await axios.post(
    API + "/",
    appointment,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};

export const updateAppointment = async (id, appointment) => {
  const res = await axios.put(
    API + "/" + id,
    appointment,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};

export const deleteAppointment = async (id) => {
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

export const updateAppointmentStatus = async (id, status) => {
  const res = await axios.patch(
    API + "/" + id + "/status",
    { status },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};