const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJiaGFud2FydmFpYmhhdkBnbWFpbC5jb20iLCJleHAiOjE3ODEwNzQ5NjcsImlhdCI6MTc4MTA3NDA2NywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjNiMjY0ZTg2LTMyMmQtNDE1ZS04NzE5LTI4NDIxNDQwYTllYiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InZhaWJoYXYgY2hhdWhhbiIsInN1YiI6IjY3ZjU4MTViLTc4MDUtNDNmNS1iZGRlLTZhNDkyOWRkZjk5NiJ9LCJlbWFpbCI6ImJoYW53YXJ2YWliaGF2QGdtYWlsLmNvbSIsIm5hbWUiOiJ2YWliaGF2IGNoYXVoYW4iLCJyb2xsTm8iOiIyMzE1MDAyMzcyIiwiYWNjZXNzQ29kZSI6IlJQc2dZdCIsImNsaWVudElEIjoiNjdmNTgxNWItNzgwNS00M2Y1LWJkZGUtNmE0OTI5ZGRmOTk2IiwiY2xpZW50U2VjcmV0IjoiQmRBcFNncXV3c0FESGRrayJ9.HkInfJUEFt0RJThVFgzcAh5KwkXt3o_ZBJ3KjelJe5k";

async function Log(stack, level, pkg, message) {
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

export { Log };