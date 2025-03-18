// TODO: Wrap in a tanstack query
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