const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJiaGFud2FydmFpYmhhdkBnbWFpbC5jb20iLCJleHAiOjE3ODEwNzgzMjUsImlhdCI6MTc4MTA3NzQyNSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6Ijk0Nzk0OGI3LTdlNTMtNDBmNC05YTIxLTExZDU5NTgxN2EzYSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InZhaWJoYXYgY2hhdWhhbiIsInN1YiI6IjY3ZjU4MTViLTc4MDUtNDNmNS1iZGRlLTZhNDkyOWRkZjk5NiJ9LCJlbWFpbCI6ImJoYW53YXJ2YWliaGF2QGdtYWlsLmNvbSIsIm5hbWUiOiJ2YWliaGF2IGNoYXVoYW4iLCJyb2xsTm8iOiIyMzE1MDAyMzcyIiwiYWNjZXNzQ29kZSI6IlJQc2dZdCIsImNsaWVudElEIjoiNjdmNTgxNWItNzgwNS00M2Y1LWJkZGUtNmE0OTI5ZGRmOTk2IiwiY2xpZW50U2VjcmV0IjoiQmRBcFNncXV3c0FESGRrayJ9.ui8eR5N64YpEKMg-H7US2KJwKfhYIai22gY3kDvAoKk";

export async function Log(stack, level, pkg, message) {
  try {
    await fetch("http://4.224.186.213/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": TOKEN
      },
      body: JSON.stringify({
        stack: stack,
        level: level,
        package: pkg,
        message: message
      })
    });
  } catch (err) {
    console.error("Log failed:", err);
  }
}