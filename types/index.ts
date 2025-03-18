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
  
  export interface IAppError {
      errorMessage: string,
      errorStatus: number,
  }

  // Using this helper for now as we are intending to currently use only lightweight interface objects 
  export function isAppError(obj: any): obj is IAppError {
    return typeof obj === "object" &&
           obj !== null &&
           typeof obj.errorMessage === 'string' &&
           typeof obj.errorStatus === 'number'
  }