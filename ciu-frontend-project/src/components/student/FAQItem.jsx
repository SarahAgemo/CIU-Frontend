import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Item from './FAQItem.module.css';

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={Item["faq-item"]}>
      <button 
        className={`${Item['faq-item-header']} ${isOpen ? Item['faq-item-header--open'] : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={Item["faq-item-question"]}>{question}</span>
        <ChevronDown className={`${Item['faq-item-icon']} ${isOpen ? Item['faq-item-icon--open'] : ''}`} />
      </button>
      {isOpen && (
        <div className={Item["faq-item-answer"]}>
          {answer}
        </div>
      )}
    </div>
  );
}

export default FAQItem;