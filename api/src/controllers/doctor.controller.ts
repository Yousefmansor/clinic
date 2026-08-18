import type { Request, Response } from "express";
import { Doctor } from "../models/doctor.model";

// Create a new doctor
export async function createDoctor(request: Request, response: Response): Promise<void> {
  try {
    const doctor = await Doctor.create(request.body);
    response.status(201).json({ success: true, data: doctor });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Could not create doctor",
    });
  }
}

// Get all doctors
export async function getDoctors(_request: Request, response: Response): Promise<void> {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    response.json({ success: true, count: doctors.length, data: doctors });
  } catch (error) {
    response.status(500).json({ success: false, message: "Could not load doctors" });
  }
}

// Get a single doctor by id
export async function getDoctorById(request: Request, response: Response): Promise<void> {
  try {
    const doctor = await Doctor.findById(request.params.id);

    if (!doctor) {
      response.status(404).json({ success: false, message: "Doctor not found" });
      return;
    }

    response.json({ success: true, data: doctor });
  } catch (error) {
    response.status(400).json({ success: false, message: "Invalid doctor id" });
  }
}

// Update a doctor by id
export async function updateDoctor(request: Request, response: Response): Promise<void> {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );

    if (!doctor) {
      response.status(404).json({ success: false, message: "Doctor not found" });
      return;
    }

    response.json({ success: true, data: doctor });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Could not update doctor",
    });
  }
}

// Delete a doctor by id
export async function deleteDoctor(request: Request, response: Response): Promise<void> {
  try {
    const doctor = await Doctor.findByIdAndDelete(request.params.id);

    if (!doctor) {
      response.status(404).json({ success: false, message: "Doctor not found" });
      return;
    }

    response.json({ success: true, message: "Doctor deleted" });
  } catch (error) {
    response.status(400).json({ success: false, message: "Invalid doctor id" });
  }
}
