import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ subject, duration }) => {
  return (
    <div style={styles.sidebar}>
      <h2>Clarke International University</h2>
      <h4>Subject: {subject}</h4>
      <h4>Duration: {duration} minutes</h4>
      <nav>
        <Link to="/exam-instructions">ExamInstructions</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/proctoring">Proctoring</Link>
      </nav>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    padding: '20px',
    background: '#f2f2f2',
    position: 'fixed',
    height: '100%',
    borderRight: '1px solid #ccc',
  },
};

export default Sidebar;
