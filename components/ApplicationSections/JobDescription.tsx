import { Box } from '@mui/material'
import { useEffect, useState } from 'react';
import { fetchJobDescription } from '../../api-queries/fetch-job-description';
import TextBox from '../TextBox/TextBox';

const JobDescription = () => {
  const [description, setDescription] = useState<string>('Loading...');

  useEffect(() => {
    fetchJobDescription().then(setDescription);
  }, []);

  return (
    <Box>
      <TextBox type="header">Job Description</TextBox>
      <TextBox type="caption">{description}</TextBox>
    </Box>
  );
};

export default JobDescription;
