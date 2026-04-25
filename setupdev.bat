@echo off

echo ========================================
echo Setting up Healthcare Appointment System
echo ========================================

REM -----------------------------
REM BACKEND SETUP
REM -----------------------------
echo.
echo Setting up backend...

cd healthcare_app

REM Create virtual environment
echo Creating virtual environment...
python -m venv env

REM Activate environment
call env\Scripts\activate

REM Upgrade pip
echo Upgrading pip...
python -m pip install --upgrade pip

REM Install backend dependencies
echo Installing backend requirements...
pip install -r requirements.txt

REM Install SDK dependencies
echo Installing SDK requirements...
pip install -r ..\health_sdk\requirements.txt

REM Run migrations
echo Running database migrations...
alembic upgrade head

REM Seed database
echo Seeding database...
python seed.py

cd ..

REM -----------------------------
REM FRONTEND SETUP
REM -----------------------------
echo.
echo Setting up frontend...

cd frontend

echo Installing frontend dependencies...
npm install

cd ..

REM -----------------------------
REM DONE
REM -----------------------------
echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next step:
echo Run runapplication.bat to start the app
echo.

pause