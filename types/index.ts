export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    linkedin: string;
    disabilityStatus: string;
    race: string;
    resume: File | null;
  }
  
  export interface ApiResponse {
    success: boolean;
    message?: string;
  }
  