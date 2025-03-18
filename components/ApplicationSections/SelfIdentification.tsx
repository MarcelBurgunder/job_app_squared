import { Box } from '@mui/material';
import TextBox from '../TextBox/TextBox';

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

// TODO: Move all options to a shared constant files to be managed seperately and not inlined.
const SelfIdentification: React.FC<Props> = ({ formData, handleChange }) => {
  return (
        <Box display="flex" flexDirection="column" gap={1} width="100%">
      <TextBox type="label">Self-Identification</TextBox>
      
      <Box display='flex' gap={1}>
      <TextBox type="caption">Gender:</TextBox>
      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded-md mb-3">
        <option value="">Select...</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="non_binary">Non-Binary</option>
        <option value="prefer_not_to_say">I don't wish to answer</option>
      </select>
      </Box>
      
      <Box display='flex' gap={1}>
      <TextBox type="caption">Veteran Status:</TextBox>
      <select name="veteranStatus" value={formData.veteranStatus} onChange={handleChange} className="w-full p-2 border rounded-md mb-3">
        <option value="">Select...</option>
        <option value="not_protected">I am not a protected Veteran</option>
        <option value="protected_veteran">I identify as one or more classifications of a protected veteran</option>
        <option value="prefer_not_to_say">I don't wish to answer</option>
      </select>
      </Box>

      <Box display='flex' gap={1}>
      <TextBox type="caption">Race/Ethnicity:</TextBox>
      <select name="race" value={formData.race} onChange={handleChange} className="w-full p-2 border rounded-md mb-3">
        <option value="">Select...</option>
        <option value="american_indian">American Indian or Alaska Native</option>
        <option value="asian">Asian</option>
        <option value="black">Black or African American</option>
        <option value="hispanic">Hispanic or Latino</option>
        <option value="native_hawaiian">Native Hawaiian or Other Pacific Islander</option>
        <option value="white">White</option>
        <option value="two_or_more">Two or more races</option>
        <option value="prefer_not_to_say">I don't wish to answer</option>
      </select>
      </Box>
      </Box>
  );
};

export default SelfIdentification;
