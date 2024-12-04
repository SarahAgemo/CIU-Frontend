import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <div className="landing-page-header">
        <h1>ONLINE EXAMINATION SYSTEM</h1>
      </div>
      <div className="landing-page-content">
        <div className="landing-button-group">
          <div className="top-group">
            <p className="landing-description">Administrator</p>{" "}
            <img src="/ciu-logo-2.png" alt="" />
          </div>

          <div className="landing-img">
            <img src="/Landing Page Admin Pic.png" alt="Logo" />
          </div>
          <Link to="/adminlogin" className="landing-button">
            Get Started
          </Link>
        </div>

        <div className="landing-button-group">
          <div className="top-group">
            <p className="landing-description">Lecturer</p>
            <img src="/ciu-logo-2.png" alt="" />
          </div>
          <div className="landing-img">
            <img src="/Lect_1-removebg-preview.png" alt="Logo" />
          </div>
          <Link to="/lecturerlogin" className="landing-button">
            Get Started
          </Link>
        </div>

        <div className="landing-button-group">
          <div className="top-group">
            <p className="landing-description">Student</p>
            <img src="/ciu-logo-2.png" alt="" />
          </div>
          <div className="landing-img">
            <img src="/Landing Page Student Pic.png" alt="Logo" />
          </div>
          <Link to="/StudentLogin" className="landing-button">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
