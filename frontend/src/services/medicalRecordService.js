import axios from "axios";

const API = "http://127.0.0.1:5000/api/medical-records";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getMedicalRecords = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const getMedicalRecord = async (id) => {
  const res = await axios.get(API + "/" + id);
  return res.data;
};

export const getMedicalRecordsByCustomer = async (customerId) => {
  const res = await axios.get(API + "/customer/" + customerId);
  return res.data;
};

export const createMedicalRecord = async (record) => {
  const res = await axios.post(
    API + "/",
    record,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};

export const updateMedicalRecord = async (id, record) => {
  const res = await axios.put(
    API + "/" + id,
    record,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};

export const deleteMedicalRecord = async (id) => {
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