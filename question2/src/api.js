import { Log } from "./log";

const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJiaGFud2FydmFpYmhhdkBnbWFpbC5jb20iLCJleHAiOjE3ODEwNzgzMjUsImlhdCI6MTc4MTA3NzQyNSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6Ijk0Nzk0OGI3LTdlNTMtNDBmNC05YTIxLTExZDU5NTgxN2EzYSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InZhaWJoYXYgY2hhdWhhbiIsInN1YiI6IjY3ZjU4MTViLTc4MDUtNDNmNS1iZGRlLTZhNDkyOWRkZjk5NiJ9LCJlbWFpbCI6ImJoYW53YXJ2YWliaGF2QGdtYWlsLmNvbSIsIm5hbWUiOiJ2YWliaGF2IGNoYXVoYW4iLCJyb2xsTm8iOiIyMzE1MDAyMzcyIiwiYWNjZXNzQ29kZSI6IlJQc2dZdCIsImNsaWVudElEIjoiNjdmNTgxNWItNzgwNS00M2Y1LWJkZGUtNmE0OTI5ZGRmOTk2IiwiY2xpZW50U2VjcmV0IjoiQmRBcFNncXV3c0FESGRrayJ9.ui8eR5N64YpEKMg-H7US2KJwKfhYIai22gY3kDvAoKk";

const PRIORITY = { "Placement": 3, "Result": 2, "Event": 1 };

export async function fetchNotifications() {
  await Log("frontend", "info", "api", "Fetching all notifications");
  const response = await fetch("/evaluation-service/notifications", {
    headers: { "Authorization": TOKEN }
  });
  const data = await response.json();
  await Log("frontend", "info", "api", "Notifications fetched successfully");
  return data.notifications;
}

export function getPriorityNotifications(notifications, n, filterType) {
  let filtered = [...notifications];

  if (filterType && filterType !== "All") {
    filtered = filtered.filter(item => item.Type === filterType);
  }

  for (let i = 0; i < filtered.length; i++) {
    for (let j = i + 1; j < filtered.length; j++) {
      const priorityA = PRIORITY[filtered[i].Type];
      const priorityB = PRIORITY[filtered[j].Type];
      if (priorityB > priorityA) {
        let temp = filtered[i];
        filtered[i] = filtered[j];
        filtered[j] = temp;
      } else if (priorityB === priorityA) {
        if (new Date(filtered[j].Timestamp) > new Date(filtered[i].Timestamp)) {
          let temp = filtered[i];
          filtered[i] = filtered[j];
          filtered[j] = temp;
        }
      }
    }
  }

  return filtered.slice(0, n);
}