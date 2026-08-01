import axios from "axios";

const API = `/settings`;

const getToken = () => {
  return localStorage.getItem("token");
};

// Get all settings
export const getSettings = async () => {
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
};

// Get specific setting by key
export const getSettingByKey = async (key) => {
  const res = await axios.get(API + "/" + key, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
};

// Update a setting
export const updateSetting = async (key, value) => {
  const res = await axios.put(
    API + "/" + key,
    { value },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};

// Update multiple settings
export const updateMultipleSettings = async (settings) => {
  const res = await axios.put(
    API + "/update-multiple",
    settings,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};

// Reset settings to default
export const resetSettings = async () => {
  const res = await axios.post(
    API + "/reset",
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};

// Get system info
export const getSystemInfo = async () => {
  const res = await axios.get(API + "/system-info", {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
};