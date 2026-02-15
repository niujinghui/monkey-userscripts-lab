import React from 'react';
import styles from './reader-mode-button.module.css';

interface ReaderModeButtonProps {
  enabled: boolean;
  onClick: () => void;
}

export const ReaderModeButton: React.FC<ReaderModeButtonProps> = ({ enabled, onClick }) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${enabled ? styles.enabled : ''}`}
      onClick={onClick}
    >
      {enabled ? 'ReaderMode ON' : 'ReaderMode OFF'}
    </button>
  );
};