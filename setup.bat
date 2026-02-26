@echo off
echo ========================================
echo   Vighnaharta Real Estate - Setup
echo ========================================

echo.
echo [1/3] Installing backend dependencies...
cd backend
call npm install
cd ..

echo.
echo [2/3] Creating React app (this takes 2-3 mins)...
cd frontend
call npx create-react-app . --yes 2>nul
call npm install axios
cd ..

echo.
echo [3/3] Copying your custom files...
copy /Y frontend_src_App.js frontend\src\App.js
copy /Y frontend_src_App.css frontend\src\App.css

echo.
echo ========================================
echo   DONE! Now run start.bat to launch
echo ========================================
pause
