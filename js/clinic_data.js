/**
 * Day 1 JavaScript Review — Clinic Appointment System
 * Run with: node clinic-data.js
 */

// Array of available doctors before a database exists
const doctors = [
  { name: 'Dr. Sarah Ahmed (Pediatrics)', maxPatients: 10, booked: 7, available: true },
  { name: 'Dr. Mohamed Omar (Dentistry)', maxPatients: 8, booked: 8, available: true },
  { name: 'Dr. Khaled Hassan (Cardiology)', maxPatients: 12, booked: 4, available: false },
];

/**
 * Calculates remaining available slots for a doctor.
 */
function getRemainingSlots(doctor) {
  return doctor.maxPatients - doctor.booked;
}

/**
 * Formats doctor info for display.
 */
function formatDoctorLabel(doctor) {
  return `${doctor.name} — ${getRemainingSlots(doctor)} slots remaining`;
}

// 1. filter() selects only active doctors who have open slots
const openDoctors = doctors.filter((doctor) => {
  return doctor.available && getRemainingSlots(doctor) > 0;
});

// 2. map() transforms doctor objects into readable text labels
const doctorLabels = openDoctors.map(formatDoctorLabel);

// 3. reduce() calculates total available slots across the clinic
const totalAvailableSlots = openDoctors.reduce((total, doctor) => {
  return total + getRemainingSlots(doctor);
}, 0);

console.log('Available Doctors:', doctorLabels);
console.log('Total Available Slots:', totalAvailableSlots);

module.exports = { doctors, getRemainingSlots, formatDoctorLabel };