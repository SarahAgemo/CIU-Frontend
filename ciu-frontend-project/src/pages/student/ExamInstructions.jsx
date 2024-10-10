
import React from 'react';
import { useNavigate } from 'react-router-dom';
const ExamInstructions = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/proctoring'); 
  };

  return (
    <div className="instructions-page">
      <div className="sidebar">
        <h2>CIU CLARKE</h2>
        <p>ONLINE EXAMINATION SYSTEM</p>
        <p><strong>Subject:</strong> Macro Economics</p>
        <p><strong>Duration:</strong> 1 hour</p>
      </div>
      <div className="instructions-content">
        <h2>EXAM INSTRUCTIONS</h2>
        <p>Lorem ipsum dolor sit amet consectetur...</p>
        <p>Feugiat elementum risus tortor blandit...</p>
        <p>Lorem ipsum dolor sit amet consectetur...</p>
        <p>Feugiat elementum risus tortor blandit...</p>
        <p>Lorem ipsum dolor sit amet consectetur...</p>
        <p>Feugiat elementum risus tortor blandit...</p>
        <button className="next-button" onClick={handleNext}>NEXT</button>
      </div>
    </div>
  );
};


export default ExamInstructions;
