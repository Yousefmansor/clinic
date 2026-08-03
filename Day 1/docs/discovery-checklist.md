# Discovery Checklist — Care Clinic

## Business Questions

| Question | Answer |
| --- | --- |
| What problem does this solve? | Clinics waste time on phone bookings and manual spreadsheets. Double bookings and lost patient data happen often. |
| What is the business goal? | Reduce appointment scheduling time and give staff a single view of the daily schedule. |
| Who pays for this? | The clinic administration funds the system. |
| What is the success metric? | Fewer phone calls for booking, no double bookings, and a clear daily schedule for staff. |

## User Questions

| Question | Answer |
| --- | --- |
| Who are the main users? | Patients who book appointments and receptionists who manage the schedule. |
| What do they need most? | Patients want to see available slots and book fast. Receptionists need to see all bookings in one place. |
| How will they access the system? | Patients use a mobile or desktop browser. Receptionists use a dashboard on desktop. |

## Workflow Questions

| Question | Answer |
| --- | --- |
| What is the current process? | Patients call or send a message to book. Receptionist writes it down manually. |
| What should the new process be? | Patient browses doctors online, picks a time slot, and confirms the booking. |
| What happens after booking? | The appointment is saved and appears on the receptionist's dashboard. |

## Data Questions

| Question | Answer |
| --- | --- |
| What data do we need? | Patient name, phone, doctor name, specialty, date, time, and status. |
| Where does data live? | Patients, Doctors, and Appointments will be stored in the database. |
| What data changes often? | Doctor availability and appointment status (pending, confirmed, cancelled). |

## Constraint Questions

| Question | Answer |
| --- | --- |
| What is the timeline? | 14 days to build the MVP. |
| What tech is required? | MEAN stack: MongoDB, Express, Angular, Node.js. |
| Any limits on features? | MVP only handles Patients, Doctors, and Appointments. No payment or reminders in phase 1. |

## Success Questions

| Question | Answer |
| --- | --- |
| How do we know it works? | Patients can book without calling. Receptionists see a clean daily schedule. |
| What is the MVP scope? | Patient booking flow + Admin dashboard with doctor and appointment management. |
| What is out of scope? | Payment, SMS reminders, medical records details, and multi-clinic support. |
