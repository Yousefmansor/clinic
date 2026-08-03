// src/doctor-availability.ts

import { Doctor } from './models/doctor.types';
import { ApiResult, success, failure } from './api-result';

type Availability = 'available' | 'full' | 'on-leave';

interface DoctorAvailability {
  doctorId: string;
  remainingSlots: number;
  availability: Availability;
}

function getDoctorAvailability(
  doctor: Doctor,
): ApiResult<DoctorAvailability> {
  const remaining = Math.max(doctor.maxSlotsPerDay - doctor.bookedSlots, 0);

  if (doctor.status !== 'active') {
    return failure(`Doctor ${doctor.name} is ${doctor.status} and cannot accept appointments`);
  }

  if (remaining === 0) {
    return failure(`No available slots for Dr. ${doctor.name} today`);
  }

  return success({
    doctorId: doctor.id,
    remainingSlots: remaining,
    availability: 'available',
  });
}

export { Availability, DoctorAvailability, getDoctorAvailability };
