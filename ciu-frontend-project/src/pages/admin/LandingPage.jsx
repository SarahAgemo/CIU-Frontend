import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <div className="landing-page-content">
        {/* Left Section: Image */}
        <div className="landing-page-image">
          <img
            src="./src/assets/images/ciu-logo-2.png"
            alt="Online Examination"
          />
        </div>

        {/* Right Section: Role Selection */}
        <div className="landing-page-right">
          <div className="landing-page-header">
            <h1>ONLINE EXAMINATION SYSTEM</h1>
          </div>
          <div className="landing-buttons-section">
            <div className="landing-button-group">
              <p className="landing-description">
                Are you a CIU admin?<br />Click the button below to continue.
              </p>
              <Link to="/adminlogin" className="landing-button">Admin</Link>
            </div>

            <div className="landing-button-group">
              <p className="landing-description">
                Are you a CIU Lecturer?<br />Click the button below to continue.
              </p>
              <Link to="/lecturerlogin" className="landing-button">Lecturer</Link>
            </div>

            <div className="landing-button-group">
              <p className="landing-description">
                Are you a CIU Student?<br />Click the button below to continue.
              </p>
              <Link to="/StudentLogin" className="landing-button">Student</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
