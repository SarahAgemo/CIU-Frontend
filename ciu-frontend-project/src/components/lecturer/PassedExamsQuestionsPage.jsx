import React from 'react';
import './PassedExamsQuestionsPage.css';

const PassedExamsQuestionsPage = () => {
  const exams = [
    {
      title: 'Mathematics',
      questions: [
        'What is the Pythagorean theorem?',
        'Explain the concept of limits in calculus.',
      ],
    },
    {
      title: 'Physics',
      questions: [
        'What is Newton\'s second law of motion?',
        'Define the principle of conservation of energy.',
      ],
    },
    
  ];

  return (
    <div className="passed-exams-container">
      <h1 className="page-title">Passed Exams Questions</h1>
      <div className="main-card">
        <div className="exams-list">
          {exams.map((exam, index) => (
            <div className="exam-card" key={index}>
              <div className="exam-header">
                <h2>{exam.title}</h2>
              </div>
              <ul className="questions-list">
                {exam.questions.map((question, idx) => (
                  <li key={idx}>{question}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PassedExamsQuestionsPage;
