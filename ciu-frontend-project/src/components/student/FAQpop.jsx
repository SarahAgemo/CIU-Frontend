import React from 'react';
import { ArrowLeft } from 'lucide-react';
import FAQItem from './FAQItem';
import { useNavigate } from 'react-router-dom';
import './FAQpop.css';

export default function FAQList() {
  const faqs = [
    {
      id: 1,
      question: 'Vitae orci proin lectus posuere eget lectus purus massa diam. Nam amet quis sagittis dolor sed mattis elementum vitae nibh.',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 2,
      question: 'Vitae orci proin lectus posuere eget lectus purus massa diam. Nam amet quis sagittis dolor sed mattis elementum vitae nibh.',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ];

  const navigate = useNavigate();

  return (
    <div className="faq-list">
      <button className="faq-back-button" aria-label="Go back" onClick={() => navigate('/student/support')}>
        <ArrowLeft className="faq-back-icon" />
      </button>
      <h1 className="faq-title">FREQUENTLY ASKED QUESTIONS</h1>
      <div className="faq-items">
        {faqs.map(faq => (
          <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}
