import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Globe, Phone, Mail } from 'lucide-react'
import Message from './MessageSupport.module.css'

export default function MessageSupport() {
  const navigate = useNavigate()
  return (
    <main className={Message["main-content"]}>
      <button className={Message["back-button"]} aria-label="Go back" onClick={() => navigate('/student/support')}>
        <ArrowLeft size={24} />
      </button>
      <div className={Message["not-found-content"]}>
        <div className={Message["not-found-illustration"]}>
          <img src="/image 2.png" alt="404 Error Illustration" />
        </div>
        <h2 className={Message["support-title"]}>MESSAGE SUPPORT</h2>
        <form className={Message["support-form"]}>
          <div className={Message["form-group"]}>
            <select className={Message["form-control"]} defaultValue="" aria-label="Choose Problem category">
              <option value="" disabled>Choose Problem category</option>
              <option value="technical">Technical Issue</option>
              <option value="account">Account Problem</option>
              <option value="exam">Exam Related</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className={Message["form-group"]}>
            <textarea className={Message["form-control"]} rows={5} placeholder="Your message" aria-label="Your message"></textarea>
          </div>
          <button type="submit" className={Message["btn-send"]}>SEND</button>
        </form>
      </div>
    </main>
  )
}