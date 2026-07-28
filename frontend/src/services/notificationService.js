import axios from "axios";

const API = "http://127.0.0.1:5000/api/notifications";

const getToken = () => {
  return localStorage.getItem("token");
};

// Get all notifications
export const getNotifications = async () => {
  const res = await axios.get(API);
  return res.data;
};

// Get unread notifications
export const getUnreadNotifications = async () => {
  const res = await axios.get(API + "/unread");
  return res.data;
};

// Get notification by ID
export const getNotification = async (id) => {
  const res = await axios.get(API + "/" + id);
  return res.data;
};

// Mark notification as read
export const markAsRead = async (id) => {
  const res = await axios.patch(
    API + "/" + id + "/read",
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};

// Mark all notifications as read
export const markAllAsRead = async () => {
  const res = await axios.patch(
    API + "/read-all",
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};

// Delete notification
export const deleteNotification = async (id) => {
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

// Delete all notifications
export const deleteAllNotifications = async () => {
  const res = await axios.delete(
    API + "/delete-all",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};

// Get notification count
export const getNotificationCount = async () => {
  const res = await axios.get(API + "/count");
  return res.data;
};