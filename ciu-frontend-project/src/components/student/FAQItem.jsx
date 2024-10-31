import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FAQItem.css';

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button 
        className={`faq-item-header ${isOpen ? 'faq-item-header--open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="faq-item-question">{question}</span>
        <ChevronDown className={`faq-item-icon ${isOpen ? 'faq-item-icon--open' : ''}`} />
      </button>
      {isOpen && (
        <div className="faq-item-answer">
          {answer}
        </div>
      )}
    </div>
  );
}

export default FAQItem;