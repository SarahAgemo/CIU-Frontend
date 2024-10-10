import React from 'react';
import { useNavigate } from 'react-router-dom';

// Sidebar Component
const Sidebar = ({ logoUrl, examDetails }) => (
  <div className="sidebar">
    <img src={logoUrl} alt="CIU Logo" className="ciu-logo" />
    <h2>ONLINE EXAMINATION SYSTEM</h2>
    <div className="exam-details">
      <p><strong>Subject:</strong> {examDetails.subject}</p>
      <p><strong>Duration:</strong> {examDetails.duration}</p>
      <p><strong>Progress:</strong> {examDetails.progress}%</p>
    </div>
  </div>
);

// Question Box Component
const QuestionBox = ({ question, options }) => (
  <div className="question-box">
    <p>{question}</p>
    <ul>
      {options.map((option, index) => (
        <li key={index}>
          <input type="radio" disabled /> {option}
        </li>
      ))}
    </ul>
  </div>
);

// Timeout Popup Component
const TimeoutPopup = () => (
  <div className="timeout-popup">
    <div className="timeout-icon">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAACUCAMAAADCkcf1AAAAY1BMVEX///8AAABmZmYgIiH7+/siIiLe3t7Q0ND19fUdHx4WGRe6urpgYGDi4uKoqKh+fn6urq4oKChVVVWQkJBJSUk6OzvAwMDs7OygoKCIiIgxMTFDQ0PHx8d1dXVvb28QEhGYmJgyMEZ/AAAINklEQVR4nO2bDZeqLBDHGzLMVxTfQEX8/p/yYcB2y2xvp3p2tz38zrm3RGX5M8MwoO12Ho/H4/F4PB6Px+PxeDwej8fj8Xg8Ho/H4/F4PB6Px+PxeDwej+dlkD/LDv4sXto78uellQ1A1Oirsz0vzw/r72nTi3DSeNGA+viJvjx9GdqiPQyfgsL4O5v2LItDjhyEZC0B0k5pkGg21oMq5gTmKaO9KYQymSEDRb6u7gXUJaT2i3ZexNnpt3jNhQvBwFmj2QCMAEshVTCJoWG6P1lmkSZEn4i5LqpwKFjWs6ShilbDMZy0mDkdRk7TnFGSNP+/tHmQXIFKWRLJviZtKsaBpMBqVafQs7hnh1SlNVTVlExMKKYSwgSTsqrBFBR8vpBWZrwtaNiG2EUd5AzmVsSNHjIpZWGOhP1JfqZutuhl9KIiLWtVxVhSj0VayEEQIUdeVeE+mqe5mOaRFUWTQ5kLyPkoZiJDAklVTIXKizTR59IgNHXlnLExFbxLZZKGVRHPLRllVagxHSc6iTSb2m+IJDLhoRByInM+FbJh1ZyruUrMccsnyYz3zKKWgqXpSCQTlZxZLsyHNEeyUFVRwYU0nuioEixmQh6Y6CuhBhaXcz7rNO+lkDERc58Dm/5/afUEJB3I1KfcfGo1DaRX6TCRoeZ8UJyrIS3rOoGUkVLxUpGBkANREVEx3kWGS2n2V7SH5V+JH3YU2xJtP2INMejfEyP/6T9/fsr+k3hp78h/jCSNlGuppVcAAAAASUVORK5CYII="
        alt="Timeout Icon"
      />
    </div>
    <p>TIME OUT! EXAM AUTO SUBMITTED</p>
  </div>
);

// Profile Info Component
const ProfileInfo = ({ profilePicUrl }) => (
  <div className="profile-info">
    <img src={profilePicUrl} alt="Profile Pic" className="profile-pic" />
    {/* Add more profile details if needed */}
  </div>
);

// Main Component
const ExamAutoSubmitPage = () => {
  const navigate = useNavigate();

  const examDetails = {
    subject: 'Macro Economics',
    duration: '1 hour',
    progress: 70,
  };

  const question = 'Lorem ipsum dolor sit amet?';
  const options = [
    'Nam amet quis sagittis dolor sed mattis elementum vitae nibh.',
    'Vitae orci proin lectus posuere eget lectus purus massa diam.',
    'Posuere aect lectus purus massa diam.',
    'Sagittis nec.',
  ];

  // Navigate user to the dashboard or results page after exam submission
  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="exam-page">
      {/* Left Sidebar */}
      <Sidebar
        logoUrl="https://example.com/ciu-logo.png"
        examDetails={examDetails}
      />

      {/* Main Section */}
      <div className="main-content">
        <div className="quiz-header">
          <h1>QUIZ</h1>
          <p>Question: 31</p>
        </div>
        <QuestionBox question={question} options={options} />

        {/* Timeout Pop-up */}
        <TimeoutPopup />
      </div>

      {/* Right Sidebar */}
      <div className="right-sidebar">
        <ProfileInfo profilePicUrl="https://example.com/profile-pic.png" />
        {/* Add any additional right sidebar content if necessary */}
      </div>
    </div>
  );
};

export default ExamAutoSubmitPage;
