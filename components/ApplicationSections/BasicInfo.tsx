import { Box } from '@mui/material';
import TextInput from '../TextInput/TextInput';
import FileUpload from '../FileUpload/FileUpload';
import { ApplicationFormData } from '../../types/index';

interface BasicInfoProps {
  formData: ApplicationFormData;
  setFormData: (newFormData: Partial<ApplicationFormData>) => void;
  handleFileChange: (field: keyof ApplicationFormData, file: File | null) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ formData, setFormData, handleFileChange }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextInput label="First Name" value={formData.firstName} onChange={(e) => setFormData({ firstName: e.target.value })} required width="sm"/>
      <TextInput label="Last Name" value={formData.lastName} onChange={(e) => setFormData({ lastName: e.target.value })} required width="sm"/>
      <TextInput label="Phone Number" type="tel" value={formData.phone} onChange={(e) => setFormData({ phone: e.target.value })} required width="sm"/>
      <TextInput label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ email: e.target.value })} required width="sm"/>
      <TextInput label="LinkedIn Profile" type="url" value={formData.linkedin} onChange={(e) => setFormData({ linkedin: e.target.value })} width="sm"/>
      <FileUpload label="Resume (PDF)" onChange={(file) => handleFileChange('resume', file)} width="sm"/>
      <FileUpload label="Cover Letter (PDF)" onChange={(file) => handleFileChange('coverLetter', file)} width="sm"/>
    </Box>
  );
};

export default BasicInfo;
