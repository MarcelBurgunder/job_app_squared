// TODO: Wrap in a useMutation
import { ApplicationFormData } from '../types';

export const submitApplication = async (formData: ApplicationFormData) => {
  try {
    const response = await fetch('/api/job', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit application: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting application:', error);
    throw new Error('Error submitting application.');
  }
};
