import React from 'react';
import { Box } from '@mui/material';
import TextBox from '../TextBox/TextBox';

interface Option {
  value: string;
  label: string;
}

interface OptionListProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (newValue: string) => void; // Updated: Directly sets value
}

// TODO: Add cleaner styling such that width is more consistent
const OptionList: React.FC<OptionListProps> = ({ label, options, value, onChange }) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value); // Directly updates state in the parent
  };

  return (
    <Box display="flex" gap={1}>
      <TextBox type="label">{label}:</TextBox>
      <select value={value} onChange={handleSelectChange} className="option-list">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Box>
  );
};

export default OptionList;
