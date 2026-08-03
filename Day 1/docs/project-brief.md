# Project Brief — Care Clinic

## Pages

| Page | Route | User |
| --- | --- | --- |
| Home | / | Visitor |
| Doctors List | /doctors | Visitor |
| Doctor Detail | /doctors/:id | Visitor |
| Booking Form | /book/:id | Patient |
| My Appointments | /my-appointments | Patient |
| Login / Register | /login | Visitor |
| Profile | /profile | Patient |
| Admin Dashboard | /admin | Admin |
| Manage Appointments | /admin/appointments | Admin |
| Manage Doctors | /admin/doctors | Admin |

## Entities

| Entity | Key Fields |
| --- | --- |
| Patient | name, phone, email, visitType |
| Doctor | name, specialty, status, maxSlotsPerDay |
| Appointment | patient, doctor, date, time, status |

## MVP Scope

- Patient can browse doctors and book an appointment.
- Admin can manage doctors and view the daily appointment list.
- Appointment status tracking: Pending, Confirmed, Cancelled.

## Out of Scope (Phase 1)

- Payment processing.
- SMS or email reminders.
- Medical records details.
- Multi-clinic or multi-location support.

## Acceptance Criteria

1. A patient can select a doctor, pick a date and time, and confirm the booking.
2. The admin dashboard shows all appointments for the selected day.
3. A doctor cannot be overbooked beyond their max slots.
4. Appointments show correct status (pending, confirmed, cancelled).
