// utils/fetchDoctor.ts
type Specialty = {
  title: string;
};

export type Doctor = {
  id: string;
  name: string;
  profilePhoto: string;
  designation: string;
  currentWorkingPlace: string;
  apointmentFee: number;
  experience: number;
  qualification: string;
  averageRating: number;
  contactNumber: string;
  doctorSpecialties: { specialties: Specialty }[];
};

export const fetchDoctor = async (id: string): Promise<Doctor> => {
  const res = await fetch(`http://localhost:5000/api/v1/doctor/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch doctor data");
  }
  const { data }: { data: Doctor } = await res.json();
  return data;
};
