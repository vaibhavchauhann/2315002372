import { Log } from "./log.js";

const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJiaGFud2FydmFpYmhhdkBnbWFpbC5jb20iLCJleHAiOjE3ODEwNzQ5NjcsImlhdCI6MTc4MTA3NDA2NywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjNiMjY0ZTg2LTMyMmQtNDE1ZS04NzE5LTI4NDIxNDQwYTllYiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InZhaWJoYXYgY2hhdWhhbiIsInN1YiI6IjY3ZjU4MTViLTc4MDUtNDNmNS1iZGRlLTZhNDkyOWRkZjk5NiJ9LCJlbWFpbCI6ImJoYW53YXJ2YWliaGF2QGdtYWlsLmNvbSIsIm5hbWUiOiJ2YWliaGF2IGNoYXVoYW4iLCJyb2xsTm8iOiIyMzE1MDAyMzcyIiwiYWNjZXNzQ29kZSI6IlJQc2dZdCIsImNsaWVudElEIjoiNjdmNTgxNWItNzgwNS00M2Y1LWJkZGUtNmE0OTI5ZGRmOTk2IiwiY2xpZW50U2VjcmV0IjoiQmRBcFNncXV3c0FESGRrayJ9.HkInfJUEFt0RJThVFgzcAh5KwkXt3o_ZBJ3KjelJe5k";

const PRIORITY = { "Placement": 3, "Result": 2, "Event": 1 };

async function getTopNotifications(n) {
  await Log("backend", "info", "api", "Fetching notifications from server");

  const response = await fetch("http://4.224.186.213/evaluation-service/notifications", {
    headers: { "Authorization": TOKEN }
  });

  const data = await response.json();
  console.log("API Response:", JSON.stringify(data));

  await Log("backend", "info", "api", "Notifications fetched successfully");

  const notifications = data.notifications;

  for (let i = 0; i < notifications.length; i++) {
    for (let j = i + 1; j < notifications.length; j++) {
      const priorityA = PRIORITY[notifications[i].Type];
      const priorityB = PRIORITY[notifications[j].Type];

      if (priorityB > priorityA) {
        let temp = notifications[i];
        notifications[i] = notifications[j];
        notifications[j] = temp;
      } else if (priorityB === priorityA) {
        if (new Date(notifications[j].Timestamp) > new Date(notifications[i].Timestamp)) {
          let temp = notifications[i];
          notifications[i] = notifications[j];
          notifications[j] = temp;
        }
      }
    }
  }

  const topN = [];
  for (let i = 0; i < n && i < notifications.length; i++) {
    topN.push(notifications[i]);
  }

  await Log("backend", "info", "utils", "Top " + n + " notifications selected");

  console.log("\nTop " + n + " Priority Notifications:\n");
  for (let i = 0; i < topN.length; i++) {
    console.log((i + 1) + ". [" + topN[i].Type + "] " + topN[i].Message + " | " + topN[i].Timestamp);
  }

  return topN;
}

getTopNotifications(10);