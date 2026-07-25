# Care Clinic — System Documentation

## Value Sentence
Care Clinic reduces waiting time and phone booking chaos by giving patients a clear doctor list and immediate booking status, while providing clinic staff with a unified daily schedule.

## Project Pitch
Clinics often process reservations through phone calls or manual messaging, leading to double bookings, lost patient data, and scheduling conflicts. Care Clinic is a web application that enables patients to view available doctors and reserve appointments smoothly. 

The initial phase (MVP) focuses on core functionality: managing Patients, Doctors, and Appointments. It demonstrates data transformations using pure JavaScript along with DOM event handling before integrating backend services and databases.

## Users and Roles
* Patient: Views open doctor slots and submits appointment requests.
* Receptionist / Admin: Manages doctor schedules, updates availability, and reviews daily bookings.

## Data Logic Analysis: Negative Remaining Slots
When calculating remaining slots using `capacity - booked`, the result can be negative if bookings exceed capacity. The approach to handling this depends on the system layer:

1. Clamping at Zero (`Math.max(0, capacity - booked)`): Prevents negative numbers from reaching the user interface, maintaining a clean and accurate display for patients.
2. Throwing an Error: Used internally during development or server processing to immediately flag data inconsistencies where bookings bypass capacity limits.
3. Reporting Overbooking Separately: Exposes the overbooked count to administrators as an indicator of high demand, helping management allocate additional shifts or doctors.