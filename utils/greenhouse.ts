// TODO: Move to seperate greenhouse API package and host as a seperate service

import { ApplicationFormData, IAppError } from '../types';

const API_KEY = process.env.NEXT_PUBLIC_GREENHOUSE_API_KEY;
const JOB_ID = process.env.NEXT_PUBLIC_GREENHOUSE_JOB_ID;
const JOB_SOURCE_ID = process.env.NEXT_PUBLIC_GREENHOUSE_JOB_SOURCE_ID;
const USER_ID = process.env.NEXT_PUBLIC_GREENHOUSE_USER_ID;
const BASE_URL = 'https://harvest.greenhouse.io/v1';

export async function getJobDescription(): Promise<any> {
  const response = await fetch(`${BASE_URL}}/jobs/${JOB_ID}`, {
    headers: {
      Authorization: `Basic ${btoa(`${API_KEY}:`)}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    return {
      errorMessage: `Failed to fetch job description: ${response.statusText}`,
      errorStatus: response.status,
    } as IAppError;
  }

  return await response.json();
}

// NOTE: This is currently used as a private api, but maybe we'll want to allow selecting stages in the future.
async function getFirstJobStage(): Promise<string> {
  const stagesResponse = await fetch(`${BASE_URL}/jobs/${JOB_ID}/stages`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${API_KEY}:`).toString('base64')}`,
      Accept: 'application/json',
    },
  });

  if (!stagesResponse.ok) {
    const errorText = await stagesResponse.text();
    console.error(`Failed to fetch job stages: ${stagesResponse.status} - ${errorText}`);
    throw new Error(`Failed to fetch job stages: ${errorText}`);
  }

  const stagesData = await stagesResponse.json();

  // Use the first stage or find the correct one
  const initialStageId = stagesData.length ? stagesData[0].id : null;

  if (!initialStageId) {
    throw new Error('No valid initial_stage_id found. Check Greenhouse job stages.');
  }

  return initialStageId;
}

// TODO: Break this entire application logic into seperate files for each logical step.
// Eventually we want to support functionality that isolates certain parts of this pipeline.
export async function applyToJob(formData: ApplicationFormData): Promise<any> {
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedin,
    // TODO: Add these once they're enabled in greenhouse
    //race,
    //gender,
    //disabilityStatus,
    //veteranStatus,
  } = formData;

  // 1Check if the candidate already exists in Greenhouse
  console.log('Checking if candidate exists...');
  const candidateSearchUrl = `${BASE_URL}/candidates?email=${encodeURIComponent(email)}`;

  const searchResponse = await fetch(candidateSearchUrl, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${API_KEY}:`).toString('base64')}`,
      Accept: 'application/json',
    },
  });

  const searchData = await searchResponse.json();
  let candidateId = searchData.length ? searchData[0].id : null;
  const headers = {
    Authorization: `Basic ${Buffer.from(`${API_KEY}:`).toString('base64')}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'On-Behalf-Of': USER_ID ?? 'NO_USER', // Adding invalid fallback to bypass typecheck - this is never expected it cause an issue unless environment variables are misconfigured
  };
  const firstJobStage = await getFirstJobStage();
  const application = {
    job_id: JOB_ID,
    source_id: JOB_SOURCE_ID, // pulled from env -> currently arbitrary but in the future we want to make adjustable
    initial_stage_id: firstJobStage,
  };

  if (candidateId) {
    // Submit the application for an existing candidate
    console.log('Submitting application...');
    const applicationResponse = await fetch(`${BASE_URL}/candidates/${candidateId}/applications`, {
      method: 'POST',
      headers,
      body: JSON.stringify(application),
    });

    if (!applicationResponse.ok) {
      return {
        errorMessage: `Failed to submit application: ${applicationResponse.statusText}`,
        errorStatus: applicationResponse.status,
      } as IAppError;
    }
    const applicationData = await applicationResponse.json();
    console.log('Application submitted successfully:', applicationData);
    return applicationData;
  }

  // else create the candidate with application
  console.log('Creating new candidate...');
  const body = JSON.stringify({
    first_name: firstName,
    last_name: lastName,
    email,
    phone_numbers: [{ value: phone, type: 'mobile' }],
    social_media_addresses: linkedin ? [{ value: linkedin, type: 'linkedin' }] : [],
    /* TODO: Add said custom fields to Greenhouse account
        custom_fields: [{
          key: 'race_ethnicity', value: race || ''}, {
          key: 'veteran_status', value: veteranStatus || ''}, {
          key: 'disability_status', value: disabilityStatus || ''
        }],
        */
    applications: [application],
  });
  const createCandidateResponse = await fetch(`${BASE_URL}/candidates`, {
    method: 'POST',
    headers,
    body,
  });

  if (!createCandidateResponse.ok) {
    console.log(await createCandidateResponse.text());
    return {
      errorMessage: `Failed to create candidate: ${createCandidateResponse.statusText}`,
      errorStatus: createCandidateResponse.status,
    } as IAppError;
  }

  const candidateData = await createCandidateResponse.json();
  console.log('Application submitted successfully for new candidate:', candidateData);
  return candidateData;
}
