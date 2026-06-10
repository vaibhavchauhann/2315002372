import { useState, useEffect } from "react";
import { fetchNotifications, getPriorityNotifications } from "./api";
import { Log } from "./log";

function PriorityNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    async function loadData() {
      await Log("frontend", "info", "component", "PriorityNotifications loaded");
      const data = await fetchNotifications();
      setNotifications(data);
    }
    loadData();
  }, []);

  const topNotifications = getPriorityNotifications(notifications, limit, filterType);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Priority Notifications</h2>

      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option>All</option>
        <option>Placement</option>
        <option>Result</option>
        <option>Event</option>
      </select>

      <input
        type="number"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        style={{ marginLeft: "10px", width: "60px" }}
      />

      {topNotifications.map((notif) => (
        <div key={notif.ID} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <strong>{notif.Type}</strong> — {notif.Message}
          <br />
          <small>{notif.Timestamp}</small>
        </div>
      ))}
    </div>
  );
}

export default PriorityNotifications;