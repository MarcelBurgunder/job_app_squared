import React from 'react';
import styles from './TextInput.module.css';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input className={styles.input} {...props} />
    </div>
  );
};

export default TextInput;