# Please Watch this

[![Watch from YouTube](https://img.youtube.com/vi/746o8kN7piY/0.jpg)](https://youtu.be/746o8kN7piY)


# Healthcare Appointment Booking System

A full-stack web application for managing healthcare appointments with real-time slot booking, doctor scheduling, and analytics dashboard.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#️-prerequisites)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-endpoints)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Patient Features
- **Smart Appointment Booking**: Step-by-step booking flow with real-time slot availability
- **Specialization-based Search**: Find doctors by medical specialization
- **Date & Time Selection**: Choose convenient appointment slots
- **Booking Validation**: Prevents double-booking and conflicts

### Doctor Features
- **Personal Dashboard**: View daily schedule and appointments
- **Availability Management**: Track booked and available time slots
- **Date-based Filtering**: Check schedules for specific dates

### Analytics
- **Peak Hours Analysis**: Visualize appointment distribution throughout the day
- **Top Performers**: Track top 5 doctors and specializations
- **Interactive Charts**: Dynamic data visualization with Chart.js

---

## 🛠️ Tech Stack

**Backend:**
- FastAPI - Modern Python web framework
- SQLAlchemy - SQL toolkit and ORM
- Alembic - Database migrations
- SQLite - Lightweight database
- Pytest - Testing framework

**Frontend:**
- React 18 - UI library
- Vite - Build tool and dev server
- Chart.js - Data visualization
- React Router - Navigation

**SDK:**
- Custom health_sdk for API interactions

---

## ⚙️ Prerequisites

Ensure the following are installed on your system:

| Software | Version | Required |
|----------|---------|----------|
| Python | 3.10 or higher | ✅ Yes |
| Node.js | 18 or higher | ✅ Yes |
| npm | Latest | ✅ Yes (comes with Node.js) |
| Git | Latest | ⭐ Recommended |

**Optional:**
- SQLite / DB Browser for SQLite (for viewing database)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/raghul-a-r/Healthcare-Appointment-Booking-System.git
cd Healthcare-Appointment-Booking-System
```

### 2. Run Setup Script

**Windows:**
```bash
setupdev.bat
```

This script will:
- Create Python virtual environment
- Install backend dependencies
- Install frontend dependencies
- Set up the database

---

## 💻 Usage

### Running the Application

**Windows:**
```bash
runapplication.bat
```


### Access the Application

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **API Documentation**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 🔗 API Endpoints

### Doctors

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/doctors/` | Retrieve all doctors |
| `POST` | `/doctors/` | Add a new doctor |

**Example Request:**
```bash
curl -X GET "http://127.0.0.1:8000/doctors/"
```

### Appointments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/appointments/` | Book an appointment |
| `GET` | `/appointments/slots/{doctor_id}?date=YYYY-MM-DD` | Get available slots for a doctor |
| `GET` | `/appointments/stats?date=YYYY-MM-DD` | Get statistics for a specific date |

**Example Booking Request:**
```bash
curl -X POST "http://127.0.0.1:8000/appointments/" \
  -H "Content-Type: application/json" \
  -d '{
    "doctor_id": 1,
    "patient_name": "John Doe",
    "date": "2024-05-15",
    "slot": "10:00 AM"
  }'
```

### Statistics Response Includes:
- Peak hours (busiest appointment times)
- Top 5 doctors (by appointment count)
- Top 5 specializations (most booked)

---

## 🌐 Application Pages

### 🏠 Home Page
- Entry point with navigation menu
- Quick access to:
  - Book Appointment
  - Doctor Dashboard
  - View Statistics

### 📋 Booking Page
Interactive 4-step booking process:

1. **Choose Specialization** - Select medical specialty
2. **Select Doctor** - Pick from available doctors
3. **Pick Date** - Choose appointment date
4. **Select Slot** - Pick available time slot

**Features:**
- Real-time slot availability
- Visual feedback for booked/available slots
- Validation to prevent conflicts

### 🩺 Doctor Dashboard
- View schedules by date
- Color-coded slots:
  - ✅ Available slots
  - ❌ Booked slots
- Filter by doctor and date

### 📊 Statistics Page
Comprehensive analytics dashboard:
- **Peak Hours Chart**: Appointment distribution by time
- **Top Doctors**: Ranked by appointment volume
- **Popular Specializations**: Most requested medical fields
- Interactive Chart.js visualizations

---

## 🧪 Testing

Run the test suite:

```bash
cd healthcare_app
pytest
```

Run with coverage:
```bash
pytest --cov=app --cov-report=html
```

---

## 📁 Project Structure

```
Healthcare-Appointment-Booking-System/
├── healthcare_app/          # Backend (FastAPI)
│   ├── app/
│   │   ├── models/         # Database models
│   │   ├── routes/         # API endpoints
│   │   ├── schemas/        # Pydantic schemas
│   │   └── main.py         # Application entry point
│   ├── tests/              # Test suite
│   └── requirements.txt    # Python dependencies
│
├── frontend/                # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   └── App.jsx         # Main app component
│   └── package.json        # Node dependencies
│
├── health_sdk/              # Custom SDK
│   └── sdk.py              # API client wrapper
│
├── setupdev.bat            # Setup script (Windows)
├── runapplication.bat      # Run script (Windows)
└── README.md               # This file
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Raghul A R**

- GitHub: [@raghul-a-r](https://github.com/raghul-a-r)
- Repository: [Healthcare-Appointment-Booking-System](https://github.com/raghul-a-r/Healthcare-Appointment-Booking-System)

---

## 🙏 Acknowledgments

- FastAPI for the excellent backend framework
- React team for the powerful UI library
- Chart.js for beautiful visualizations

---

## 📞 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/raghul-a-r/Healthcare-Appointment-Booking-System/issues).

---

<div align="center">
Made with ❤️ for better healthcare management
</div>
