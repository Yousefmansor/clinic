/**
 * Day 2 — Advanced JavaScript Review
 * Async/Await, Event Loop, and Error Handling
 * 
 * Simulates booking an appointment with a delay (like calling a server).
 */

// Simulate a server call that takes time
function bookAppointmentServer(patientName, doctorName) {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * 2000;
    setTimeout(() => {
      if (doctorName === 'Dr. Khaled Hassan (Cardiology)') {
        reject(new Error(`Doctor ${doctorName} is not accepting new appointments right now.`));
      } else {
        resolve({
          patient: patientName,
          doctor: doctorName,
          status: 'Confirmed',
          bookedAt: new Date().toISOString(),
        });
      }
    }, delay);
  });
}

// Example 1: Booking with async/await (success path)
async function bookWithWait(patient, doctor) {
  try {
    const booking = await bookAppointmentServer(patient, doctor);
    console.log('Success:', booking);
  } catch (err) {
    console.log('Error:', err.message);
  }
}

// Example 2: Booking two patients (Event Loop demo)
async function bookMultiple() {
  console.log('--- Starting bookings ---');

  const p1 = bookAppointmentServer('Ahmed Mohamed', 'Dr. Sarah Ahmed (Pediatrics)');
  const p2 = bookAppointmentServer('Fatma Ali', 'Dr. Mohamed Omar (Dentistry)');
  const p3 = bookAppointmentServer('Sara Khaled', 'Dr. Khaled Hassan (Cardiology)');

  console.log('All requests sent, waiting for responses...');

  try {
    const results = await Promise.allSettled([p1, p2, p3]);
    for (const result of results) {
      if (result.status === 'fulfilled') {
        console.log('Confirmed:', result.value.patient, '→', result.value.doctor);
      } else {
        console.log('Failed:', result.reason.message);
      }
    }
  } catch (err) {
    console.log('Unexpected error:', err.message);
  }

  console.log('--- Bookings complete ---');
}

// Run examples
(async () => {
  await bookWithWait('Ali Hassan', 'Dr. Sarah Ahmed (Pediatrics)');
  await bookMultiple();
})();
