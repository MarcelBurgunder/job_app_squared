import { NextApiRequest, NextApiResponse } from 'next';

const API_KEY = process.env.NEXT_PUBLIC_GREENHOUSE_API_KEY;
const JOB_ID = process.env.NEXT_PUBLIC_GREENHOUSE_JOB_ID;
const USER_ID = process.env.NEXT_PUBLIC_GREENHOUSE_USER_ID;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!API_KEY || !JOB_ID) {
    return res.status(400).json({ error: 'Missing API key or job ID' });
  }

  if (req.method === 'GET') {
    try {
      const response = await fetch(`https://harvest.greenhouse.io/v1/jobs/${JOB_ID}`, {
        headers: {
          'Authorization': `Basic ${btoa(`${API_KEY}:`)}`,
          'Accept': 'application/json',
        }
      });
      
      if (!response.ok) {
        return res.status(response.status).json({ error: `Failed to fetch job description: ${response.statusText}` });
      }
      
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching job description:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const formData = req.body;
      formData.user_id = USER_ID;
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
        return res.status(response.status).json({ error: `Failed to submit application: ${response.statusText}` });
      }
      
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error submitting application:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
