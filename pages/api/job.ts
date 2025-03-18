import { NextApiRequest, NextApiResponse } from 'next';
import { ApplicationFormData, isAppError } from '../../types';
import { applyToJob, getJobDescription } from '../../utils/greenhouse';

// TODO: Allow for user and job ids to be dynamically pulled / set in app
const API_KEY = process.env.NEXT_PUBLIC_GREENHOUSE_API_KEY;
const JOB_ID = process.env.NEXT_PUBLIC_GREENHOUSE_JOB_ID;
const USER_ID = process.env.NEXT_PUBLIC_GREENHOUSE_USER_ID;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!API_KEY || !JOB_ID || !USER_ID) {
    return res
      .status(400)
      .json({ error: 'Missing required environment configuration - see README' });
  }

  if (req.method === 'GET') {
    try {
      const description = getJobDescription();

      if (isAppError(description)) {
        return res.status(description.errorStatus).json({ error: description.errorMessage });
      }

      return res.status(200).json(description);
    } catch (error) {
      console.error('Error fetching job description:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  if (req.method === 'POST') {
    try {
      // TODO: Introduce ZOD parse to properly parse request bodies and parameters
      const formData = req.body as ApplicationFormData;
      const responseData = await applyToJob(formData);
      if (isAppError(responseData)) {
        return res.status(responseData.errorStatus).json({ error: responseData.errorMessage });
      }

      return res.status(200).json({ ...responseData, success: true });
    } catch (error) {
      console.error('Error submitting application:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
