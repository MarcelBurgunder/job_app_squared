import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { submitApplication } from '../api-queries/submit-application';
import BasicInfo from '../components/ApplicationSections/BasicInfo';
import SelfIdentification from '../components/ApplicationSections/SelfIdentification';
import DisabilityStatus from '../components/ApplicationSections/DisabilityStatus';
import JobDescription from '../components/ApplicationSections/JobDescription';
import Button from '../components/Button/Button';
import { ApplicationFormData } from '../types/index';

const Home = () => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    resume: null,
    coverLetter: null,
    gender: '',
    veteranStatus: '',
    race: '',
    disabilityStatus: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSetFormData = (update: Partial<ApplicationFormData>) => {
    setFormData((prev) => ({ ...prev, ...update }));
  };

  const handleFileChange = (field: keyof ApplicationFormData, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const isSubmitDisabled = !(
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.email.trim() &&
    formData.phone.trim()
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('first_name', formData.firstName);
      formDataToSubmit.append('last_name', formData.lastName);
      formDataToSubmit.append('email', formData.email);
      formDataToSubmit.append('phone', formData.phone);
      formDataToSubmit.append('linkedin', formData.linkedin);
      formDataToSubmit.append('gender', formData.gender);
      formDataToSubmit.append('veteran_status', formData.veteranStatus);
      formDataToSubmit.append('race', formData.race);
      formDataToSubmit.append('disability_status', formData.disabilityStatus);
      if (formData.resume) formDataToSubmit.append('resume', formData.resume);
      if (formData.coverLetter) formDataToSubmit.append('coverLetter', formData.coverLetter);

      const response = await submitApplication(formDataToSubmit);
      if (response.success) {
        setSuccess(true);
      } else {
        setError('Failed to submit the application.');
      }
    } catch (err) {
      setError('An error occurred while submitting the application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
        <Box display="flex" flexDirection="column" alignItems="center" gap={4} py={4}>
      <JobDescription />
      <Box display="flex" flexDirection="column" gap={4} p={4} boxShadow={3} borderRadius={2} bgcolor="white">
        {/* Basic Info Section (Now with file uploads) */}
        <BasicInfo formData={formData} setFormData={handleSetFormData} handleFileChange={handleFileChange} />

        {/* Self-Identification & Disability Sections */}
        <SelfIdentification formData={formData} setFormData={handleSetFormData} />
        <DisabilityStatus formData={formData} setFormData={handleSetFormData} />

        <Button type="submit" disabled={isSubmitDisabled || loading} onClick={handleSubmit}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </Button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>Application submitted successfully!</p>}
      </Box>
      </Box>
    </Container>
  );
};

export default Home;
