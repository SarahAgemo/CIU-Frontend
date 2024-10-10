import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [questionIndex, setQuestionIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Questions array for demonstration
  const questions = [
    { question: 'Lorem ipsum dolor sit amet?' },
    { question: 'What is the economic impact of inflation?' },
    { question: 'How does the balance of trade affect the economy?' },
    { question: 'Explain the fiscal policy mechanisms.' },
    { question: 'What are the types of unemployment?' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Detecting tab change or tab close
    const handleTabChange = () => {
      alert('Warning: You opened a new tab! The quiz will be auto-submitted.');
      // Add auto-submit logic here
      navigate('/submit'); // Redirect to the submission page or any action
    };

    window.addEventListener('blur', handleTabChange);

    return () => {
      clearInterval(timer);
      window.removeEventListener('blur', handleTabChange);
    };
  }, [navigate]);

  const handleNextQuestion = () => {
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setQuestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className={darkMode ? 'quiz-page dark-mode' : 'quiz-page'}>
      <div className="sidebar">
        <h2>CIU CLARKE</h2>
        <p>ONLINE EXAMINATION SYSTEM</p>
        <p><strong>Subject:</strong> Macro Economics</p>
        <p><strong>Duration:</strong> 1 hour</p>
        <p><strong>Time Left:</strong> {formatTime(timeLeft)}</p>
        <button onClick={toggleDarkMode} className="mode-switch">
          Switch to {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className="quiz-content">
        <h2>QUIZ</h2>
        <p className="question-text">Question {questionIndex + 1}: {questions[questionIndex].question}</p>
        <form>
          <input type="checkbox" name="answer" /> <span className="option-text">Option A</span><br />
          <input type="checkbox" name="answer" /> <span className="option-text">Option B</span><br />
          <input type="checkbox" name="answer" /> <span className="option-text">Option C</span><br />
          <input type="checkbox" name="answer" /> <span className="option-text">Option D</span><br />
        </form>
        
        <div className="navigation-buttons">
          {questionIndex > 0 && (
            <button className="prev-button" onClick={handlePreviousQuestion}>
              PREVIOUS
            </button>
          )}
          {questionIndex < questions.length - 1 ? (
            <button className="next-button" onClick={handleNextQuestion}>
              NEXT
            </button>
          ) : (
            <button className="submit-button" onClick={() => navigate('/submit')}>
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
