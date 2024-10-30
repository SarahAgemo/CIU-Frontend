import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Mess from './MessageSupportpop.module.css';

function MessageSupport() {
  const navigate = useNavigate();

  return (
    <div className={Mess["message-support"]}>
      <button className={Mess["back-button"]} aria-label="Go back" onClick={() => navigate('/student/support')}>
        <ArrowLeft />
      </button>
      <div className={Mess["error-illustration"]}>
        <img src="/image 2.png" alt="404 Error Illustration" />
      </div>
      <h1 className={Mess["support-title"]}>MESSAGE SUPPORT</h1>
      <form className={Mess["support-form"]}>
        <div className={Mess["form-group"]}>
          <label htmlFor="problem-category" className={Mess["form-label"]}>Choose Problem category</label>
          <select id="problem-category" className={Mess["form-select"]}>
            <option value="">Select a category</option>
            {/* Add more options here */}
          </select>
        </div>
        <div className={Mess["form-group"]}>
          <label htmlFor="message" className={Mess["form-label"]}>Your message</label>
          <textarea id="message" className={Mess["form-textarea"]} rows="4"></textarea>
        </div>
        <button type="submit" className={Mess["send-button"]}>SEND</button>
      </form>
    </div>
  );
}

export default MessageSupport;