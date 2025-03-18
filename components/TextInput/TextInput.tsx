import React from 'react';
import { Box } from '@mui/material';
import styles from './TextInput.module.css';
import TextBox from '../TextBox/TextBox';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  width?: 'sm' | 'lg';
}

const TextInput: React.FC<TextInputProps> = ({ label, width = 'lg', ...props }) => {
  return (
    <Box className={width === 'sm' ? styles.sm : styles.lg} display="flex" flexDirection="column" gap={1}>
      <TextBox type="label">{label}</TextBox>
      <input className={styles.input} {...props} />
    </Box>
  );
};

export default TextInput;
