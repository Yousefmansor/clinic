// src/doctor-availability.ts

import { Doctor } from './models/doctor.types';
import { ApiResult, success, failure } from './api-result';

type Availability = 'available' | 'full' | 'on-leave';

interface DoctorAvailability {
  doctorId: string;
  remainingSlots: number;
  availability: Availability;
}

// Implementation of the DoctorAvailability interface
class DoctorAvailabilityReport implements DoctorAvailability {
  doctorId: string;
  remainingSlots: number;
  availability: Availability;

  constructor(doctorId: string, remainingSlots: number, availability: Availability) {
    this.doctorId = doctorId;
    this.remainingSlots = remainingSlots;
    this.availability = availability;
  }
}

function getDoctorAvailability(
  doctor: Doctor,
): ApiResult<DoctorAvailabilityReport> {
  const remaining = Math.max(doctor.maxSlotsPerDay - doctor.bookedSlots, 0);

  if (doctor.status !== 'active') {
    return failure(`Doctor ${doctor.name} is ${doctor.status} and cannot accept appointments`);
  }

  if (remaining === 0) {
    return failure(`No available slots for Dr. ${doctor.name} today`);
  }

  return success(
    new DoctorAvailabilityReport(doctor.id, remaining, 'available')
  );
}

export { Availability, DoctorAvailability, DoctorAvailabilityReport, getDoctorAvailability };
