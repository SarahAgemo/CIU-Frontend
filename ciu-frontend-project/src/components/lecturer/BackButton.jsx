// BackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export default function BackButton({ targetPath = '/lecturerdashboard', size = 30, color = '#106053' }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
      <button
        onClick={() => navigate(targetPath)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          color: color,
        }}
      >
        <FaArrowLeft size={size} style={{ marginRight: '8px', color: color }} />
      </button>
    </div>
  );
}
