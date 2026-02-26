@echo off
echo Starting Backend on port 5000...
start "Backend" cmd /k "cd backend && node server.js"

timeout /t 2 /nobreak > nul

echo Starting Frontend on port 3000...
start "Frontend" cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Close the two black windows to stop the servers.
