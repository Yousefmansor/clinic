# Day 2 — Debugging & AI Verification

## Two Common Errors I Found

### 1. TypeError: Cannot read property of undefined

**The bug:** I was trying to access `appointment.doctor.name` but `appointment.doctor` was `undefined` because the doctor data was not fetched yet.

**How I fixed it:** I added an optional chaining check:
```javascript
const doctorName = appointment?.doctor?.name || 'Unknown Doctor';
```

**Why it happened:** JavaScript does not wait for async data by default. If you access a property before the data arrives, you get undefined.

### 2. Unhandled Promise Rejection

**The bug:** I called `bookAppointmentServer()` without `await` and without `.catch()`, so when the promise rejected, Node.js crashed with an unhandled rejection.

**How I fixed it:** I wrapped the call in a `try/catch` block inside an `async` function:
```javascript
async function book() {
  try {
    const result = await bookAppointmentServer('Patient', 'Doctor');
    console.log(result);
  } catch (err) {
    console.log('Booking failed:', err.message);
  }
}
```

**Why it happened:** Every async function or promise call needs error handling. Without it, failures are silent or crash the program.

## AI-Assisted Verification

I used AI to help me verify my understanding of the Event Loop. I asked:

> "Why does setTimeout run after synchronous code even if the delay is 0?"

AI explained that setTimeout puts the callback in the task queue, and the event loop only processes the task queue after the call stack is empty. This matched what the instructor explained in the session.

**Key takeaway:** Async/Await makes async code look synchronous, but the Event Loop still runs in the background. Use try/catch to handle errors properly.
