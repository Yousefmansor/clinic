import { Doctor } from "../models/doctor.model";

interface DefaultDoctor {
  name: string;
  specialty: string;
  phone: string;
  bio: string;
  image: string;
  maxSlotsPerDay: number;
  status: "active";
  schedule: {
    days: number[];
    start: string;
    end: string;
    duration: number;
  };
}

const defaultDoctors: DefaultDoctor[] = [
  {
    name: "Dr. Ahmed Hassan",
    specialty: "Cardiology",
    phone: "01010000001",
    bio: "Consultant cardiologist with experience in heart disease follow-up.",
    image: "",
    maxSlotsPerDay: 12,
    status: "active",
    schedule: { days: [0, 1, 2, 3, 4], start: "09:00", end: "15:00", duration: 30 },
  },
  {
    name: "Dr. Sara Mohamed",
    specialty: "Dermatology",
    phone: "01010000002",
    bio: "Specialist in dermatology and skin care.",
    image: "",
    maxSlotsPerDay: 10,
    status: "active",
    schedule: { days: [1, 2, 3, 4, 6], start: "10:00", end: "16:00", duration: 30 },
  },
  {
    name: "Dr. Omar Ali",
    specialty: "Dentistry",
    phone: "01010000003",
    bio: "General dentist providing routine dental care.",
    image: "",
    maxSlotsPerDay: 8,
    status: "active",
    schedule: { days: [0, 1, 2, 3, 4], start: "11:00", end: "17:00", duration: 45 },
  },
  {
    name: "Dr. Mona Fathy",
    specialty: "Pediatrics",
    phone: "01010000004",
    bio: "Pediatrician focused on child health and development.",
    image: "",
    maxSlotsPerDay: 12,
    status: "active",
    schedule: { days: [0, 2, 4, 6], start: "09:00", end: "14:00", duration: 30 },
  },
  {
    name: "Dr. Khaled Samir",
    specialty: "Orthopedics",
    phone: "01010000005",
    bio: "Orthopedic specialist for bones, joints, and sports injuries.",
    image: "",
    maxSlotsPerDay: 10,
    status: "active",
    schedule: { days: [1, 3, 5], start: "12:00", end: "18:00", duration: 30 },
  },
  {
    name: "Dr. Nada Adel",
    specialty: "Ophthalmology",
    phone: "01010000006",
    bio: "Ophthalmologist for eye examinations and vision care.",
    image: "",
    maxSlotsPerDay: 10,
    status: "active",
    schedule: { days: [0, 1, 2, 3, 4], start: "10:00", end: "16:00", duration: 30 },
  },
  {
    name: "Dr. Youssef Mahmoud",
    specialty: "Internal Medicine",
    phone: "01010000007",
    bio: "Internal medicine consultant for adult health care.",
    image: "",
    maxSlotsPerDay: 12,
    status: "active",
    schedule: { days: [0, 1, 2, 3, 4, 6], start: "08:00", end: "14:00", duration: 30 },
  },
  {
    name: "Dr. Reem Tarek",
    specialty: "Gynecology",
    phone: "01010000008",
    bio: "Gynecologist providing women's health consultations.",
    image: "",
    maxSlotsPerDay: 8,
    status: "active",
    schedule: { days: [1, 2, 3, 4], start: "13:00", end: "18:00", duration: 30 },
  },
];

export async function seedDoctors(): Promise<void> {
  const doctorsCount = await Doctor.countDocuments();

  if (doctorsCount === 0) {
    await Doctor.insertMany(defaultDoctors);
    console.log("Default doctors created");
  }
}
