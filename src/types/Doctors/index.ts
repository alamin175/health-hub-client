export interface Doctor {
  id: string;
  email: string;
  name: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: "MALE" | "FEMALE";
  apointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
  review: Review[]; // Defined `Review` type below
  doctorSpecialties: DoctorSpecialty[];
}

export interface DoctorSpecialty {
  specialtiesId: string;
  doctorId: string;
  specialties: ISpecialties; // Replaced `any` with `ISpecialties`
}

export interface ISpecialties {
  specialtiesId: string;
  name: string; // Added field for specialty name as an example
  description?: string; // Optional description field
  isDeleted?: boolean;
}

export interface IDoctor {
  id: string;
  name: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number | undefined;
  gender: "MALE" | "FEMALE";
  apointmentFee: number | undefined;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  specialties?: ISpecialties[]; // Replaced `any` with `ISpecialties[]`
}

export interface Review {
  reviewerId: string;
  comment: string;
  rating: number; // Rating out of 5, for example
  createdAt: string;
}

export interface IDoctorFormData {
  doctor: IDoctor;
  password: string;
}
