// TODO: Wrap in a useMutation
// TODO: There is no typesafety on this util ensuring FormData includes all the right info
// We assume that the caller is using our strongly typed ApplicationFormData, but said type
// safety needs to be introduced here on the backend as well eventually.
  export const submitApplication = async (formData: FormData) => {
    try {
      const response = await fetch('/api/job', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
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