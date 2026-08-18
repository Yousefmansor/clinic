import type { Request, Response } from "express";
import { Appointment } from "../models/appointment.model";
import { Doctor } from "../models/doctor.model";

// Create a new appointment
export async function createAppointment(request: Request, response: Response): Promise<void> {
  try {
    const { doctorId } = request.body;

    // Check if doctor has available slots
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      response.status(404).json({ success: false, message: "Doctor not found" });
      return;
    }

    if (doctor.status !== "active") {
      response.status(400).json({
        success: false,
        message: "Doctor is not available for appointments",
      });
      return;
    }

    const remaining = Math.max(doctor.maxSlotsPerDay - doctor.bookedSlots, 0);

    if (remaining === 0) {
      response.status(400).json({
        success: false,
        message: "No available slots for this doctor today",
      });
      return;
    }

    // Create appointment
    const appointment = await Appointment.create(request.body);

    // Update booked slots
    doctor.bookedSlots = Math.min(doctor.bookedSlots + 1, doctor.maxSlotsPerDay);
    await doctor.save();

    response.status(201).json({ success: true, data: appointment });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Could not create appointment",
    });
  }
}

// Get all appointments
export async function getAppointments(_request: Request, response: Response): Promise<void> {
  try {
    const appointments = await Appointment.find()
      .populate("patientId")
      .populate("doctorId")
      .sort({ createdAt: -1 });

    response.json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    response.status(500).json({ success: false, message: "Could not load appointments" });
  }
}

// Get a single appointment by id
export async function getAppointmentById(request: Request, response: Response): Promise<void> {
  try {
    const appointment = await Appointment.findById(request.params.id)
      .populate("patientId")
      .populate("doctorId");

    if (!appointment) {
      response.status(404).json({ success: false, message: "Appointment not found" });
      return;
    }

    response.json({ success: true, data: appointment });
  } catch (error) {
    response.status(400).json({ success: false, message: "Invalid appointment id" });
  }
}

// Update appointment status
export async function updateAppointment(request: Request, response: Response): Promise<void> {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );

    if (!appointment) {
      response.status(404).json({ success: false, message: "Appointment not found" });
      return;
    }

    response.json({ success: true, data: appointment });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Could not update appointment",
    });
  }
}

// Delete an appointment
export async function deleteAppointment(request: Request, response: Response): Promise<void> {
  try {
    const appointment = await Appointment.findByIdAndDelete(request.params.id);

    if (!appointment) {
      response.status(404).json({ success: false, message: "Appointment not found" });
      return;
    }

    // Reduce booked slots
    await Doctor.findByIdAndUpdate(appointment.doctorId, {
      $inc: { bookedSlots: -1 },
    });

    response.json({ success: true, message: "Appointment deleted" });
  } catch (error) {
    response.status(400).json({ success: false, message: "Invalid appointment id" });
  }
}
