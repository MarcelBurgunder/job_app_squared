import { useRouter } from 'next/router';
import { Box, Button } from '@mui/material';
import TextBox from '../components/TextBox/TextBox';

const ConfirmationPage = () => {
  const router = useRouter();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      gap={3}
    >
      <TextBox type="header">🎉 Application Submitted Successfully!</TextBox>
      <TextBox type="title">
        Thank you for your application. We will review your submission and get back to you soon.
      </TextBox>
    </Box>
  );
};

export default ConfirmationPage;
