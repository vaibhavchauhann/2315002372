import { useState } from "react";
import AllNotifications from "./AllNotifications";
import PriorityNotifications from "./PriorityNotifications";
import { Log } from "./log";

function App() {
  const [page, setPage] = useState("all");

  return (
    <div>
      <div style={{ padding: "10px"}}>
        <button onClick={() => { setPage("all"); Log("frontend", "info", "page", "Navigated to All"); }}>
          All Notifications
        </button>
        <button onClick={() => { setPage("priority"); Log("frontend", "info", "page", "Navigated to Priority"); }} style={{ marginLeft: "10px" }}>
          Priority Notifications
        </button>
      </div>

      {page === "all" ? <AllNotifications /> : <PriorityNotifications />}
    </div>
  );
}

export default App;