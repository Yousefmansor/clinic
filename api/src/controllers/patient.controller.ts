import type { Request, Response } from "express";
import { Patient } from "../models/patient.model";

// Create a new patient
export async function createPatient(request: Request, response: Response): Promise<void> {
  try {
    const patient = await Patient.create(request.body);
    response.status(201).json({ success: true, data: patient });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Could not create patient",
    });
  }
}

// Get all patients
export async function getPatients(_request: Request, response: Response): Promise<void> {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    response.json({ success: true, count: patients.length, data: patients });
  } catch (error) {
    response.status(500).json({ success: false, message: "Could not load patients" });
  }
}

// Get a single patient by id
export async function getPatientById(request: Request, response: Response): Promise<void> {
  try {
    const patient = await Patient.findById(request.params.id);

    if (!patient) {
      response.status(404).json({ success: false, message: "Patient not found" });
      return;
    }

    response.json({ success: true, data: patient });
  } catch (error) {
    response.status(400).json({ success: false, message: "Invalid patient id" });
  }
}

// Update a patient by id
export async function updatePatient(request: Request, response: Response): Promise<void> {
  try {
    const patient = await Patient.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );

    if (!patient) {
      response.status(404).json({ success: false, message: "Patient not found" });
      return;
    }

    response.json({ success: true, data: patient });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Could not update patient",
    });
  }
}

// Delete a patient by id
export async function deletePatient(request: Request, response: Response): Promise<void> {
  try {
    const patient = await Patient.findByIdAndDelete(request.params.id);

    if (!patient) {
      response.status(404).json({ success: false, message: "Patient not found" });
      return;
    }

    response.json({ success: true, message: "Patient deleted" });
  } catch (error) {
    response.status(400).json({ success: false, message: "Invalid patient id" });
  }
}
