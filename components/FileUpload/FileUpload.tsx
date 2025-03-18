import React from 'react';
import { Box } from '@mui/material';
import styles from './FileUpload.module.css';
import TextBox from '../TextBox/TextBox';

interface FileUploadProps {
  label: string;
  onChange: (file: File | null) => void;
  width?: 'sm' | 'lg';
}

const FileUpload: React.FC<FileUploadProps> = ({ label, onChange, width = 'lg' }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    onChange(file);
  };

  return (
    <Box className={width === 'sm' ? styles.sm : styles.lg} display="flex" flexDirection="column" gap={1}>
      <TextBox type="label">{label}</TextBox>
      <input type="file" className={styles.input} onChange={handleChange} />
    </Box>
  );
};

export default FileUpload;
