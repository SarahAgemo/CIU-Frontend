import React, { useState } from 'react'
import { Search, ChevronDown, ChevronUp, ArrowLeft, Globe, Phone, Mail } from 'lucide-react'
import FAQuestions from './FAQs.module.css'

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={FAQuestions["faq-item"]}>
      <button className={FAQuestions["faq-question"]} onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        <span>{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  )
}

export default function SupportContent() {
  const faqData = [
    {
      question: "Vitae orci proin lectus posuere eget lectus purus massa diam?",
      answer: "Nam amet quis sagittis dolor sed mattis elementum vitae nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      question: "Vitae orci proin lectus posuere eget lectus purus massa diam?",
      answer: "Nam amet quis sagittis dolor sed mattis elementum vitae nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      question: "How do I reset my password?",
      answer: "To reset your password, go to the login page and click on the 'Forgot Password' link. Follow the instructions sent to your registered email address."
    },
    {
      question: "What should I do if I experience technical issues during an exam?",
      answer: "If you experience technical issues during an exam, immediately contact our support team using the information provided at the bottom of this page. Try to provide as much detail about the issue as possible."
    },
    {
      question: "How can I view my exam results?",
      answer: "You can view your exam results by logging into your account and navigating to the 'Results' section in the sidebar menu. Here you'll find a list of all your completed exams and their respective scores."
    }
  ]

  return (
    <main className={FAQuestions["main-content"]}>
      <div className={FAQuestions["welcome-banner"]}>
        <div className={FAQuestions["welcome-illustration"]}>
          <img src="/call-center-concept-flat-design (2).png" alt="Support Illustration" />
        </div>
        <div className={FAQuestions["welcome-text"]}>
          <h2>Welcome to Support</h2>
          <div className={FAQuestions["search-bar"]}>
            <input type="text" placeholder="Search..." aria-label="Search support topics" />
            <Search size={20} />
          </div>
        </div>
      </div>
      
      <div className={FAQuestions["faq-section"]}>
        <button className={FAQuestions["back-button"]} aria-label="Go back">
          <ArrowLeft size={24} />
        </button>
        <h2>FREQUENTLY ASKED QUESTIONS</h2>
        {faqData.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>

      <div className={FAQuestions["contact-info"]}>
        <div className={FAQuestions["contact-item"]}>
          <Globe size={20} />
          <a href="https://ciu.ac.ug" target="_blank" rel="noopener noreferrer">https://ciu.ac.ug</a>
        </div>
        <div className={FAQuestions["contact-item"]}>
          <Phone size={20} />
          <span>(+256)-323-301-640</span>
        </div>
        <div className={FAQuestions["contact-item"]}>
          <Mail size={20} />
          <a href="mailto:info@ciu.ac.ug">info@ciu.ac.ug</a>
        </div>
      </div>
    </main>
  )
}