import { Box } from '@mui/material'
import TextBox from '../TextBox/TextBox';

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DisabilityStatus: React.FC<Props> = ({ formData, handleChange }) => {
  return (
    <Box display="flex" flexDirection="column" gap={1} width="100%">
      <TextBox type="label">Disability Status</TextBox>
      <TextBox type="caption">
        How do you know if you have a disability?  
        A disability is a condition that substantially limits major life activities such as walking, seeing, hearing, or learning.
      </TextBox>
      <Box>
      <select name="disabilityStatus" value={formData.disabilityStatus} onChange={handleChange} className="w-full p-2 border rounded-md">
        <option value="">Select...</option>
        <option value="yes">Yes, I have a disability, or have had one in the past</option>
        <option value="no">No, I don't have a disability and have not had one in the past</option>
        <option value="prefer_not_to_say">I don't wish to answer</option>
      </select></Box>
    </Box>
  );
};

export default DisabilityStatus;
