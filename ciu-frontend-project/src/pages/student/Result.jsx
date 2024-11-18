import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";
import Header from "../../components/student/Headerpop";
import Sidebar from "../../components/student/SideBarpop"; // Corrected import path

const ResultComponent = ({ toggleMobileMenu, isMobile, isMobileMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the passed results from the location state
  const { score, totalQuestions, percentage } = location.state || {};

  if (!score && !totalQuestions && !percentage) {
    return (
      <div className="admin-layout">
        {/* Include Header */}
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />

        <div className="this-content">
          {/* Include Sidebar */}
          {!isMobile && <Sidebar />}
          {isMobile && isMobileMenuOpen && <MobileMenu toggleMenu={toggleMobileMenu} />}

          {/* Main Content */}
          <div className="ResultPage">
            <h2>No Results to Display</h2>
            <p>Please complete the quiz to view your results.</p>
            <button onClick={() => navigate("/")}>Go to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Include Header */}
      <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />

      <div className="this-content">
        {/* Include Sidebar */}
        {!isMobile && <Sidebar />}
        {isMobile && isMobileMenuOpen && <MobileMenu toggleMenu={toggleMobileMenu} />}

        {/* Main Content */}
        <div className="ResultPage">
          <h2>Quiz Results</h2>
          <p>
            <strong>Score:</strong> {score}/{totalQuestions}
          </p>
          <p>
            <strong>Percentage:</strong> {percentage}%
          </p>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    </div>
  );
};

export default ResultComponent;
