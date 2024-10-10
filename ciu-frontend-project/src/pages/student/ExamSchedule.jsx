import React from 'react';

// Mock data for exams
const examsData = [
  {
    subject: 'MACRO ECONOMICS',
    program: 'Accounting',
    datePublished: '02/09/2024',
    startDate: '2024-09-26',
    startTime: '14:00',
    duration: '3 hours',
    status: 'Not Started',
  },
  {
    subject: 'CALCULUS',
    program: 'Procurement',
    datePublished: '02/09/2024',
    startDate: '2024-10-04',
    startTime: '10:00',
    duration: '1 hour 30 minutes',
    status: 'Not Started',
  }
];

const ExamPage = () => {
  const handleDoExam = () => {
    // Redirect to instructions page
    window.location.href = '/instructions'; // Replace with actual instructions page URL
  };

  const handleScheduleReminders = () => {
    // Redirect to notification page to schedule reminders
    window.location.href = '/notifications'; // Replace with actual notifications page URL
  };

  return (
    <div className="exam-page">
      <h1>Available Exams</h1>
      {examsData.map((exam, index) => (
        <div key={index} className="exam-card">
          <h2>{exam.subject}</h2>
          <p>Program: {exam.program}</p>
          <p>Date Published: {exam.datePublished}</p>
          <p>Starting Date: {exam.startDate}</p>
          <p>Starting Time: {exam.startTime}</p>
          <p>Duration: {exam.duration}</p>
          <p>Status: {exam.status}</p>

          <div className="actions">
            <button onClick={handleDoExam}>
              Do Exam
            </button>
            <button onClick={handleScheduleReminders}>
              Schedule Reminders
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExamPage;
