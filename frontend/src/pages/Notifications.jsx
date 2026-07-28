import { useState, useEffect } from "react";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
  getNotificationCount
} from "../services/notificationService";
import NotificationCard from "../components/NotificationCard";
import NotificationTable from "../components/NotificationTable";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [counts, setCounts] = useState({
    total: 0,
    unread: 0,
    read: 0
  });

  // Fetch all notifications on component mount
  useEffect(() => {
    fetchNotifications();
    fetchCounts();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await getNotifications();
      setNotifications(data);
      setError("");
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError("Failed to load notifications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCounts = async () => {
    try {
      const data = await getNotificationCount();
      setCounts({
        total: data.total || 0,
        unread: data.unread || 0,
        read: data.read || 0
      });
    } catch (err) {
      console.error("Error fetching notification counts:", err);
    }
  };

  // Handle Mark as Read
  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      await fetchNotifications();
      await fetchCounts();
    } catch (err) {
      console.error("Error marking notification as read:", err);
      alert("Failed to mark notification as read. Please try again.");
    }
  };

  // Handle Mark All as Read
  const handleMarkAllAsRead = async () => {
    if (window.confirm("Mark all notifications as read?")) {
      try {
        await markAllAsRead();
        await fetchNotifications();
        await fetchCounts();
        alert("✅ All notifications marked as read!");
      } catch (err) {
        console.error("Error marking all as read:", err);
        alert("Failed to mark all as read. Please try again.");
      }
    }
  };

  // Handle Delete Notification
  const handleDelete = async (id) => {
    if (window.confirm("Delete this notification?")) {
      try {
        await deleteNotification(id);
        await fetchNotifications();
        await fetchCounts();
      } catch (err) {
        console.error("Error deleting notification:", err);
        alert("Failed to delete notification. Please try again.");
      }
    }
  };

  // Handle Delete All Notifications
  const handleDeleteAll = async () => {
    if (window.confirm("Delete all notifications? This cannot be undone!")) {
      try {
        await deleteAllNotifications();
        await fetchNotifications();
        await fetchCounts();
        alert("✅ All notifications deleted!");
      } catch (err) {
        console.error("Error deleting all notifications:", err);
        alert("Failed to delete all notifications. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center", padding: "50px" }}>
        Loading notifications...
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}
      >
        <h1 style={{ color: "white" }}>🔔 Notifications</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          {counts.unread > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              ✅ Mark All Read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={handleDeleteAll}
              style={{
                background: "#dc2626",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              🗑️ Delete All
            </button>
          )}
        </div>
      </div>

      {error && (
        <div
          style={{
            background: "#7f1d1d",
            color: "#fca5a5",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px"
          }}
        >
          {error}
        </div>
      )}

      {/* Notification Cards */}
      <NotificationCard
        totalNotifications={counts.total}
        unreadCount={counts.unread}
        readCount={counts.read}
      />

      {/* Notification Table */}
      <NotificationTable
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDelete}
      />
    </div>
  );
}