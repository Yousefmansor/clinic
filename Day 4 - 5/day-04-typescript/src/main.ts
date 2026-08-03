// src/main.ts

import { Doctor } from './models/doctor.types';
import { getDoctorAvailability, DoctorAvailabilityReport } from './doctor-availability';

const drAhmed: Doctor = {
  id: 'D001',
  name: 'Ahmed Mohamed',
  specialty: 'Cardiology',
  status: 'active',
  maxSlotsPerDay: 10,
  bookedSlots: 7,
};

const drSara: Doctor = {
  id: 'D002',
  name: 'Sara Ali',
  specialty: 'Pediatrics',
  status: 'active',
  maxSlotsPerDay: 8,
  bookedSlots: 8,
};

const drFaisal: Doctor = {
  id: 'D003',
  name: 'Faisal El Saeed',
  specialty: 'ENT',
  status: 'on-leave',
  maxSlotsPerDay: 6,
  bookedSlots: 2,
};

const doctors = [drAhmed, drSara, drFaisal];

for (const doctor of doctors) {
  const result = getDoctorAvailability(doctor);
  if (result.ok) {
    const report = result.data as DoctorAvailabilityReport;
    console.log(`${report.doctorId} (${report.availability}) - remaining: ${report.remainingSlots} slots`);
  } else {
    console.log(`FAILED: ${result.error}`);
  }
}
