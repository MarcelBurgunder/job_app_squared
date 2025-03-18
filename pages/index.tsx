import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { submitApplication } from '../api-queries/submit-application';
import BasicInfo from '../components/ApplicationSections/BasicInfo';
import SelfIdentification from '../components/ApplicationSections/SelfIdentification';
import DisabilityStatus from '../components/ApplicationSections/DisabilityStatus';
import JobDescription from '../components/ApplicationSections/JobDescription';
import Button from '../components/Button/Button';
import { ApplicationFormData } from '../types/index';
import TextBox from '../components/TextBox/TextBox';

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
      const response = await submitApplication(formData);
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
        <Box
          display="flex"
          flexDirection="column"
          gap={4}
          p={4}
          boxShadow={3}
          borderRadius={2}
          bgcolor="white"
        >
          {/* Basic Info Section (Now with file uploads) */}
          <BasicInfo
            formData={formData}
            setFormData={handleSetFormData}
            handleFileChange={handleFileChange}
          />

          {/* Self-Identification & Disability Sections */}
          <SelfIdentification formData={formData} setFormData={handleSetFormData} />
          <DisabilityStatus formData={formData} setFormData={handleSetFormData} />

          <Button type="submit" disabled={isSubmitDisabled || loading} onClick={handleSubmit}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </Button>

          {error && <TextBox type="error">{error}</TextBox>}
          {success && <TextBox type="positive">Application submitted successfully!</TextBox>}
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
