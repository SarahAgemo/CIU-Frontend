import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Message from './MessageSupport.module.css'

export default function MessageSupport() {
  // State to capture regno and issue description
  const [regno, setRegno] = useState('');
  const [issueDescription, setIssueDescription] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const reportData = {
      regno: regno,
      issueDescription: issueDescription,
    };

    try {
      const response = await fetch('http://localhost:3000/students/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        alert('Issue reported successfully!');
      } else {
        alert('Failed to report the issue.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting the issue.');
    }
  };

  return (
    <main className={Message["main-content"]}>
      <button className={Message["back-button"]} aria-label="Go back">
        <ArrowLeft size={24} />
      </button>
      <div className={Message["not-found-content"]}>
        <div className={Message["not-found-illustration"]}>
          <img src="/image 2.png" alt="404 Error Illustration" />
        </div>
        <h2 className={Message["support-title"]}>MESSAGE SUPPORT</h2>
        <form className={Message["support-form"]} onSubmit={handleSubmit}>
          <div className={Message["form-group"]}>
            <input 
              type="text" 
              className={Message["form-control"]} 
              placeholder="Your Registration Number" 
              value={regno} 
              onChange={(e) => setRegno(e.target.value)} 
              aria-label="Registration Number" 
              required
            />
          </div>
          <div className={Message["form-group"]}>
            <textarea 
              className={Message["form-control"]} 
              rows={5} 
              placeholder="Your message" 
              value={issueDescription} 
              onChange={(e) => setIssueDescription(e.target.value)} 
              aria-label="Your message" 
              required
            />
          </div>
          <button type="submit" className={Message["btn-send"]}>SEND</button>
        </form>
      </div>
    </main>
  )
}
