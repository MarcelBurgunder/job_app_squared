import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { submitApplication } from '../utils/greenhouseApi';
import TextBox from '../components/TextBox/TextBox';
import Button from '../components/Button/Button';
import JobDescription from '../components/ApplicationSections/JobDescription';
import BasicInfo from '../components/ApplicationSections/BasicInfo';
import SelfIdentification from '../components/ApplicationSections/SelfIdentification';
import DisabilityStatus from '../components/ApplicationSections/DisabilityStatus';

const Home = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formDataToSubmit = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataToSubmit.append(key, value as string | Blob);
      });

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
          <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={6} width="100%" p={2} boxShadow={2} borderRadius={2}>
            <BasicInfo formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} />
            <SelfIdentification formData={formData} handleChange={handleChange} />
            <DisabilityStatus formData={formData} handleChange={handleChange} />
            <Box display="flex" justifyContent="center" mt={3}>
              <Button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Application'}</Button>
            </Box>
            {error && <TextBox type="caption">{error}</TextBox>}
            {success && <TextBox type="caption">Application submitted successfully!</TextBox>}
            </Box>
          </form>
      </Box>
    </Container>
  );
};

export default Home;
