# Care Clinic — Doctor Booking System

This is the **final project**: a clinic appointment-booking system built with the **MEAN Stack**. The complete application is contained in this folder, while the earlier course assignments remain in separate folders at the repository root.

## Project Structure

```text
Final Project/
├── api/                              # Backend: Node.js + Express + TypeScript + MongoDB
│   └── src/
│       ├── models/                   # Doctor, Patient, Appointment, Admin
│       ├── controllers/              # Business logic
│       ├── routes/                   # API routes
│       ├── middleware/               # JWT authentication
│       ├── app.ts                    # Express application configuration
│       └── server.ts                 # Backend entry point
├── frontend/                         # Frontend: Angular
│   └── src/app/
│       ├── doctors/                  # Public doctors list
│       ├── booking/                  # Multi-step booking form
│       ├── admin-login/              # Admin login page
│       └── dashboard/                # Protected admin dashboard
├── README.md                         # Project guide
└── CARE_CLINIC_ORAL_EXAM_QA_AR.md    # Arabic oral-exam study guide
```

## Features

| Feature | Description |
|---|---|
| Doctors list | Displays doctors with specialty filtering and quick booking. |
| Appointment booking | A three-step flow for patient details, date and time selection, and confirmation. |
| Doctor schedules | Each doctor has working days, working hours, and a visit duration. |
| Available slots | The system generates valid time slots and excludes slots that have already been booked. |
| Admin dashboard | Shows today's appointments, summary statistics, and appointment status controls. |
| Doctor management | The admin can add doctors, edit their schedules, and delete doctors. |
| Security | Admin authentication uses JWT, with an Angular route guard for protected pages. |

## Requirements

- Node.js 20 or later.
- MongoDB running locally or a MongoDB Atlas connection.

## Run Locally

Open a terminal inside **this folder (`Final Project`)** and follow these steps.

### 1. Start MongoDB

Make sure MongoDB is running on its default port, `27017`.

### 2. Start the Backend

```bash
cd api
npm install
```

Create a file named `.env` inside the `api` folder with these values:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/care-clinic
JWT_SECRET=your-secret-key
```

Then start the API server:

```bash
npm run dev
```

The API runs at:

```text
http://localhost:4000
```

On the first run, the application creates the default admin account if it does not already exist:

| Field | Value |
|---|---|
| Email | `admin@careclinic.com` |
| Password | `admin123` |

### 3. Start the Frontend

Open a second terminal from the `Final Project` folder and run:

```bash
cd frontend
npm install
npm start
```

Open the application in a browser at:

```text
http://localhost:4200
```

In development mode, `proxy.conf.json` forwards Angular requests starting with `/api` to the backend at `localhost:4000`.

## Main API Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/health` | Public | Checks whether the server is running. |
| GET | `/api/doctors` | Public | Retrieves the doctors list. |
| POST | `/api/doctors` | Admin | Creates a new doctor. |
| PATCH | `/api/doctors/:id` | Admin | Updates doctor data or schedule. |
| DELETE | `/api/doctors/:id` | Admin | Deletes a doctor. |
| POST | `/api/patients` | Public | Creates a patient record during booking. |
| GET | `/api/appointments/available-slots` | Public | Retrieves available slots for a doctor and date. |
| POST | `/api/appointments` | Public | Creates a new appointment. |
| GET | `/api/appointments/today` | Admin | Retrieves today's appointments and statistics. |
| PATCH | `/api/appointments/:id/status` | Admin | Changes an appointment status. |
| POST | `/api/auth/login` | Public | Logs in the admin and returns a JWT. |

## Technologies Used

| Area | Technologies |
|---|---|
| Frontend | Angular, Standalone Components, Router, HttpClient, Template-driven Forms |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB with Mongoose |
| Authentication | JSON Web Token and bcryptjs |

> Review `CARE_CLINIC_ORAL_EXAM_QA_AR.md` when preparing for the project discussion. It contains Arabic questions and model answers based on the actual project code.
