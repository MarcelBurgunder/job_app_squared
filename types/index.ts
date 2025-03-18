export interface ApplicationFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    linkedin: string;
    resume: File | null;
    coverLetter: File | null;
    gender: string;
    veteranStatus: string;
    race: string;
    disabilityStatus: string;
  }
  
  
  export interface ApiResponse {
    success: boolean;
    message?: string;
  }
  