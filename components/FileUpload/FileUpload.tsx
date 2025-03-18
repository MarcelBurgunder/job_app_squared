import React from 'react';
import { Box } from '@mui/material';
import styles from './FileUpload.module.css';
import TextBox from '../TextBox/TextBox';

interface FileUploadProps {
  label: string;
  onChange: (file: File | null) => void;
  width?: 'sm' | 'lg';
}

// TODO: Enable file upload
const FileUpload: React.FC<FileUploadProps> = ({ label, onChange, width = 'lg' }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    onChange(file);
  };

  return (
    <Box
      className={width === 'sm' ? styles.sm : styles.lg}
      display="flex"
      flexDirection="column"
      gap={1}
    >
      <TextBox type="label">{label}</TextBox>
      {/* TODO: Enable file upload<input type="file" className={styles.input} onChange={handleChange} />*/}
      <TextBox type="error">
        File upload is currently unavailable - a recruiter will reach out for any supplements
      </TextBox>
    </Box>
  );
};

export default FileUpload;
