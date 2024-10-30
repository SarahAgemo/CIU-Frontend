import React from "react";
import "./ExamDetails.css";

export const ExamDetails = () => {
  return (
    <div className="wrap-details">
      <div className="exam-img-div">
        <img src="./src/assets/images/CIU-exam-logo.png" alt="" />
      </div>

      <h1>ONLINE EXAMINATION SYSTEM</h1>
      <p>
        <strong>Subject:</strong> Macro Economics
      </p>
      <p>
        <strong>Duration:</strong> 1 Hour
      </p>
    </div>
  );
};
