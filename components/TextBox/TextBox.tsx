import React from 'react';
import styles from './TextBox.module.css';

interface TextBoxProps {
  type: 'title' | 'label' | 'caption' | 'header' | 'error' | 'positive';
  children: React.ReactNode;
}

const TextBox: React.FC<TextBoxProps> = ({ type, children }) => {
  return <div className={styles[type]}>{children}</div>;
};

export default TextBox;
