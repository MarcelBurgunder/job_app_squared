import React, { useState } from 'react';
import { Box } from '@mui/material';
import styles from './TextInput.module.css';
import TextBox from '../TextBox/TextBox';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  width?: 'sm' | 'lg';
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ label, width = 'lg', required, ...props }) => {
  const [error, setError] = useState<string | null>(null);

  // TODO: Improve validation logic to handle different validation types and also display it nicer
  const handleValidation = (value: string) => {
    if (required && !value.trim()) {
      setError('This field is required.');
      return;
    }
    setError(null); // No errors
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleValidation(e.target.value);
    if (props.onChange) props.onChange(e);
  };

  return (
    <Box className={width === 'sm' ? styles.sm : styles.lg} display="flex" flexDirection="column" gap={1}>
      <TextBox type="label">
        {label} {required && <span className={styles.required}>*</span>}
      </TextBox>
      <input className={`${styles.input} ${error ? styles.error : ''}`} {...props} onChange={handleChange} />
      {error && <span className={styles.errorText}>{error}</span>}
    </Box>
  );
};

export default TextInput;
