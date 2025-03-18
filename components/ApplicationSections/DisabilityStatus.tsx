import React from 'react';
import { Box } from '@mui/material';
import OptionList from '../OptionList/OptionList';
import TextBox from '../TextBox/TextBox';
import { ApplicationFormData } from '../../types/index';

interface DisabilityStatusProps {
  formData: ApplicationFormData;
  setFormData: (newFormData: Partial<ApplicationFormData>) => void;
}

// TODO: Extend description of this field and make it more comprehensive
const DisabilityStatus: React.FC<DisabilityStatusProps> = ({ formData, setFormData }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextBox type="title">Disability Status</TextBox>

      <TextBox type="caption">
        How do you know if you have a disability?
        <br />
        A disability is a condition that substantially limits major life activities such as walking, seeing, hearing, 
        speaking, breathing, learning, and working.
      </TextBox>

      <OptionList
        label="Do you have a disability?"
        value={formData.disabilityStatus}
        onChange={(newValue) => setFormData({ disabilityStatus: newValue })}
        options={[
          { value: '', label: 'Select...' },
          { value: 'yes', label: 'Yes, I have a disability' },
          { value: 'no', label: 'No, I do not have a disability' },
          { value: 'prefer_not_to_say', label: 'Prefer not to say' },
        ]}
      />
    </Box>
  );
};

export default DisabilityStatus;
