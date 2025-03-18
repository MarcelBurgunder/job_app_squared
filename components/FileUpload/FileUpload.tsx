import React from 'react';
import styles from './FileUpload.module.css';

interface FileUploadProps {
  label: string;
  onChange: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    onChange(file);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input type="file" className={styles.input} onChange={handleChange} />
    </div>
  );
};

export default FileUpload;
