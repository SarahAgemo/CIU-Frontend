// ExamDetails.js

import React from "react";
import { useLocation } from "react-router-dom";
import "./ExamDetails.css";

export const ExamDetails = () => {
    const location = useLocation();
    const exam = location.state?.exam;

    if (!exam) {
        return <p>No exam details available.</p>;
    }

    return (
        <div className="wrap-details">
            <h1>ONLINE EXAMINATION SYSTEM</h1>
            <p><strong>Description:</strong> {exam.description}</p>
            <p><strong>Duration:</strong> {exam.duration} minutes</p>
        </div>
    );
};
