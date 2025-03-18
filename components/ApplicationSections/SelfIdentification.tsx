import React from 'react';
import { Box } from '@mui/material';
import OptionList from '../OptionList/OptionList';
import TextBox from '../TextBox/TextBox';
import { ApplicationFormData } from '../../types/index';

interface SelfIdentificationProps {
  formData: ApplicationFormData;
  setFormData: (newFormData: Partial<ApplicationFormData>) => void; // Updated: Setter function
}

// TODO: Extend description of each field to make it comprehensive
const SelfIdentification: React.FC<SelfIdentificationProps> = ({ formData, setFormData }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextBox type="title">Self-Identification</TextBox>

      <OptionList
        label="Gender"
        value={formData.gender}
        onChange={(newValue) => setFormData({ gender: newValue })}
        options={[
          { value: '', label: 'Select...' },
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'non_binary', label: 'Non-Binary' },
          { value: 'prefer_not_to_say', label: 'Prefer not to say' },
        ]}
      />

      <OptionList
        label="Veteran Status"
        value={formData.veteranStatus}
        onChange={(newValue) => setFormData({ veteranStatus: newValue })}
        options={[
          { value: '', label: 'Select...' },
          { value: 'not_protected', label: 'I am not a protected veteran' },
          {
            value: 'protected',
            label: 'I identify as one or more classifications of a protected veteran',
          },
          { value: 'prefer_not_to_say', label: "I don't wish to answer" },
        ]}
      />

      <OptionList
        label="Race/Ethnicity"
        value={formData.race}
        onChange={(newValue) => setFormData({ race: newValue })}
        options={[
          { value: '', label: 'Select...' },
          { value: 'hispanic', label: 'Hispanic or Latino' },
          { value: 'american_indian', label: 'American Indian or Alaska Native' },
          { value: 'asian', label: 'Asian' },
          { value: 'black', label: 'Black or African American' },
          { value: 'hawaiian', label: 'Native Hawaiian or Other Pacific Islander' },
          { value: 'white', label: 'White' },
          { value: 'two_or_more', label: 'Two or more races' },
          { value: 'prefer_not_to_say', label: 'Prefer not to say' },
        ]}
      />
    </Box>
  );
};

export default SelfIdentification;
