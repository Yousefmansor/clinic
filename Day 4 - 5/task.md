# Task: Doctor Availability Report

Create a new file:

src/doctor-availability.ts

Implement a function that reports whether a doctor can accept appointments.

## Requirements

Import Doctor from models/doctor.types.ts.
Import the generic ApiResult<T>.
Create this union type:
```
type Availability = 'available' | 'full' | 'on-leave';
```
Create this interface:
```
interface DoctorAvailability {
  doctorId: string;
  remainingSlots: number;
  availability: Availability;
}
```
Implement:
```
function getDoctorAvailability(
  doctor: Doctor,
): ApiResult<DoctorAvailability>
```

## Rules

- An inactive or on-leave doctor returns a failure result.
- An active doctor with no remaining slots returns a failure result.
- An active doctor with available slots returns a success result.
- Remaining slots must never be negative.
- Update src/main.ts to test:
  - Dr. Ahmed Mohamed: active with available slots
  - Dr. Sara Ali: active but all slots booked
  - Dr. Faisal El Saeed: on-leave doctor
- Use if (result.ok) to safely access either data or error.
