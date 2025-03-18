// Utils file for handling API requests via Next.js backend routes
// TODO: Split into mulitple files with a more comprehensive utility file structure
export async function fetchJobDescription(): Promise<string> {
    try {
      const response = await fetch('/api/job');
  
      if (!response.ok) throw new Error(`Failed to fetch job description: ${response.status}`);
  
      const data = await response.json();
      return data?.content || 'No job description available.';
    } catch (error) {
      console.error('Error fetching job description:', error);
      return 'Error loading job description.';
    }
  }
  
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