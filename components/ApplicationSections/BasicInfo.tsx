import { Box } from '@mui/material'
import TextInput from '../TextInput/TextInput';
import FileUpload from '../FileUpload/FileUpload';

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (name: string, file: File | null) => void;
}

const Basic: React.FC<Props> = ({ formData, handleChange, handleFileChange }) => {
  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <TextInput label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
      <TextInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
      <TextInput label="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      <TextInput label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
      <TextInput label="LinkedIn Profile" type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} required />
      <FileUpload label="Resume (PDF)" onChange={(file) => handleFileChange('resume', file)} />
      <FileUpload label="Cover Letter (PDF)" onChange={(file) => handleFileChange('coverLetter', file)} />
    </Box>
  );
};

export default Basic;
