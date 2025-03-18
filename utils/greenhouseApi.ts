// TODO: Move to seperate greenhouse API package and host as a seperate service

import { ApplicationFormData, IAppError } from "../types";

const API_KEY = process.env.NEXT_PUBLIC_GREENHOUSE_API_KEY;
const JOB_ID = process.env.NEXT_PUBLIC_GREENHOUSE_JOB_ID;
const USER_ID = process.env.NEXT_PUBLIC_GREENHOUSE_USER_ID;

export async function getJobDescription(): Promise<any> {
    const response = await fetch(`https://harvest.greenhouse.io/v1/jobs/${JOB_ID}`, {
        headers: {
          'Authorization': `Basic ${btoa(`${API_KEY}:`)}`,
          'Accept': 'application/json',
        }
      });
      
      if (!response.ok) {
        return { errorMessage: `Failed to fetch job description: ${response.statusText}`, errorStatus: response.status } as IAppError;
      }
      
      return await response.json();
  }
  
  // TODO: Break this entire application logic into seperate files for each logical step
  export async function applyToJob(formData: ApplicationFormData): Promise<any> {
      console.log(formData)
        const response = await fetch(`https://harvest.greenhouse.io/v1/jobs/${JOB_ID}/applications`, {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${btoa(`${API_KEY}:`)}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
          });
          
          if (!response.ok) {
              return { errorMessage: `Failed to fetch job description: ${response.statusText}`, errorStatus: response.status } as IAppError;
          }
  };