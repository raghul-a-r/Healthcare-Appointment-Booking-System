@echo off
cd /d %~dp0

echo ========================================
echo Starting Healthcare Appointment System
echo ========================================

REM -----------------------------
REM START BACKEND (FastAPI)
REM -----------------------------
echo Starting backend server...

start "Backend" cmd /k "cd /d healthcare_app && call env\Scripts\activate && uvicorn main:app --reload"

REM -----------------------------
REM START FRONTEND (React + Vite)
REM -----------------------------
echo Starting frontend...

start "Frontend" cmd /k "cd /d frontend && npm run dev"

echo.
echo ========================================
echo Application is starting...
echo Backend: http://127.0.0.1:8000
echo Frontend: http://localhost:5173
echo ========================================
echo.

pause