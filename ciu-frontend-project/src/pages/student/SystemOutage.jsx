import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OutageDetectedPage = () => {
  const [timeLeft, setTimeLeft] = useState(32 * 60 + 12); // Example: 32 minutes and 12 seconds left
  const navigate = useNavigate();
  const subject = 'Macro Economics';
  const duration = '1 hour';
  const progress = 52; // Example: 52% completed

  // Decrease the timer as time passes
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleResume = () => {
    navigate('/quiz'); // Redirect to the exam page to resume
  };

  const handleQuit = () => {
    navigate('/submit'); // Redirect to a submission or quit confirmation page
  };

  return (
    <div className="outage-page">
      <h1>EXAM IN PROGRESS</h1>
      <p>System Outage detected!</p>
      <p>Abrupt exit from the exam interface.</p>

      <div className="outage-info">
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Duration:</strong> {duration}</p>
        <p><strong>Progress:</strong> {progress}%</p>
        <p><strong>Time left:</strong> {formatTime(timeLeft)}</p>
        <a href="#" className="report-issue">Report Issue</a>
      </div>

      <div className="outage-actions">
        <button onClick={handleResume} className="resume-button">RESUME EXAM</button>
        <p>OR</p>
        <button onClick={handleQuit} className="quit-button">QUIT</button>
      </div>
    </div>
  );
};

export default OutageDetectedPage;
