// Querying DOM elements
const form = document.querySelector('#bookingForm');
const nameInput = document.querySelector('#patientName');
const phoneInput = document.querySelector('#phone');
const doctorSelect = document.querySelector('#doctorSelect');
const message = document.querySelector('#message');
const preview = document.querySelector('#preview');

/**
 * Creates an appointment object from form input values.
 */
function createBookingObject() {
  return {
    patientName: nameInput.value.trim(),
    phone: phoneInput.value.trim(),
    doctor: doctorSelect.value,
    status: 'Confirmed',
    createdAt: new Date().toISOString().split('T')[0]
  };
}

/**
 * Validates the form using standard HTML validation.
 */
function isFormValid() {
  return form.checkValidity();
}

/**
 * Handles form submit event.
 */
function handleBookingSubmit(event) {
  event.preventDefault();

  if (!isFormValid()) {
    message.textContent = 'Please complete all required fields correctly.';
    form.reportValidity();
    return;
  }

  const booking = createBookingObject();
  message.textContent = 'Appointment saved locally for Day 1 demo!';
  preview.textContent = JSON.stringify(booking, null, 2);
}

// Event listener
form.addEventListener('submit', handleBookingSubmit);