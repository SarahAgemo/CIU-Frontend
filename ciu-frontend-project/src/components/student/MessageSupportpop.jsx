import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Mess from "./MessageSupportpop.module.css";

function MessageSupport() {
  const [regno, setRegno] = useState(""); // State for registration number
  const [issueDescription, setIssueDescription] = useState(""); // State for issue description
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Data to be sent in the request body
    const reportData = {
      regno: regno,
      issueDescription: issueDescription,
    };

    try {
      const response = await fetch("https://c-i-u-backend.onrender.com/students/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the report. Please try again.");
      }

      alert("Your message has been sent successfully!");
      setRegno(""); // Clear input after submission
      setIssueDescription(""); // Clear input after submission
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className={Mess["message-support"]}>
      <button
        className={Mess["back-button"]}
        aria-label="Go back"
        onClick={() => navigate("/student/support")}
      >
        <ArrowLeft />
      </button>
      <div className={Mess["error-illustration"]}>
        <img src="/Report Issue.png" alt="404 Error Illustration" />
      </div>
      <h1 className={Mess["support-title"]}>MESSAGE SUPPORT</h1>
      <form className={Mess["support-form"]} onSubmit={handleSubmit}>
        <div className={Mess["form-group"]}>
          <label htmlFor="regno" className={Mess["form-label"]}>
            Registration Number
          </label>
          <input
            type="text"
            id="regno"
            className={Mess["form-input"]}
            value={regno}
            onChange={(e) => setRegno(e.target.value)}
            placeholder="Enter your registration number"
            required
          />
        </div>
        <div className={Mess["form-group"]}>
          <label htmlFor="issueDescription" className={Mess["form-label"]}>
            Describe Your Issue
          </label>
          <textarea
            id="issueDescription"
            className={Mess["form-textarea"]}
            rows="4"
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            placeholder="Enter your message here"
            required
          ></textarea>
        </div>
        <div className={Mess["form-button"]}>
          <button type="submit" className={Mess["send-button"]}>
            SEND
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageSupport;


