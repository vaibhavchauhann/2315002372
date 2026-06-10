import { useState, useEffect } from "react";
import { fetchNotifications } from "./api";
import { Log } from "./log";

function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [viewed, setViewed] = useState([]);

  useEffect(() => {
    async function loadData() {
      await Log("frontend", "info", "component", "AllNotifications loaded");
      const data = await fetchNotifications();
      setNotifications(data);
    }
    loadData();
  }, []);

  const markViewed = (id) => {
    if (!viewed.includes(id)) {
      setViewed([...viewed, id]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Notifications</h2>
      {notifications.map((notif) => (
        <div
          key={notif.ID}
          onClick={() => markViewed(notif.ID)}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: viewed.includes(notif.ID) ? "#f0f0f0" : "#fff",
            cursor: "pointer"
          }}
        >
          <strong>{notif.Type}</strong> — {notif.Message}
          <br />
          <small>{notif.Timestamp}</small>
          <span style={{ float: "right", color: viewed.includes(notif.ID) ? "gray" : "blue" }}>
            {viewed.includes(notif.ID) ? "Viewed" : "New"}
          </span>
        </div>
      ))}
    </div>
  );
}

export default AllNotifications;