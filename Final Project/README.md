# Care Clinic — Final Project (MEAN Stack)

Doctor appointment booking system built with **MongoDB, Express, Angular, and Node.js**.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Angular 20 (Signals, Standalone Components, Router) |
| Backend | Node.js + Express + TypeScript |
| Database | MongoDB (Mongoose ODM) |

## Project Structure

```
frontend/     ← Angular app (port 4200)
  src/app/
    core/services/   ← HTTP services
    models/          ← TypeScript types
    pages/           ← Components (doctors, patients, appointments)

api/          ← Express REST API (port 3000)
  src/
    config/        ← Database connection
    models/        ← Mongoose schemas
    controllers/   ← CRUD handlers
    routes/        ← Express routers
```

## How to Run

### 1. Backend
```bash
cd api
npm install
# Create .env file:
# PORT=3000
# MONGODB_URI=mongodb://127.0.0.1:27017/care-clinic
npm run dev
```

### 2. Frontend
```bash
cd frontend
npm install
ng serve
```

### 3. MongoDB
Make sure MongoDB is running locally or use MongoDB Atlas.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /api/doctors | Create doctor |
| GET | /api/doctors | List all doctors |
| PATCH | /api/doctors/:id | Update doctor |
| DELETE | /api/doctors/:id | Delete doctor |
| POST | /api/patients | Create patient |
| GET | /api/patients | List all patients |
| PATCH | /api/patients/:id | Update patient |
| DELETE | /api/patients/:id | Delete patient |
| POST | /api/appointments | Book appointment |
| GET | /api/appointments | List all appointments |
| PATCH | /api/appointments/:id | Update status |
| DELETE | /api/appointments/:id | Delete appointment |

## Features

- **Doctors**: Add, edit, delete, track available slots
- **Patients**: Add, edit, delete patient records
- **Appointments**: Book, confirm, cancel, delete appointments
- **Slot Management**: Auto-checks doctor availability before booking
