import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, ArrowLeft, Globe, Phone, Mail } from 'lucide-react';
import FAQuestions from './FAQs.module.css';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={FAQuestions["faq-item"]}>
      <button className={FAQuestions["faq-question"]} onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        <span>{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

export default function SupportContent() {
  const [faqData, setFaqData] = useState([]); // State to hold FAQ data
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Fetch FAQ data from the backend API
  useEffect(() => {
    fetch('http://localhost:3000/faqs') // Adjust the endpoint accordingly
      .then((response) => response.json())
      .then((data) => setFaqData(data))
      .catch((error) => console.error('Error fetching FAQs:', error));
  }, []);

  // Filter FAQs based on search term
  const filteredFaqs = faqData.filter((item) =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className={FAQuestions["main-content"]}>
      <div className={FAQuestions["welcome-banner"]}>
        <div className={FAQuestions["welcome-illustration"]}>
          <img src="/call-center-concept-flat-design (2).png" alt="Support Illustration" />
        </div>
        <div className={FAQuestions["welcome-text"]}>
          <h2>Welcome to Support</h2>
          <div className={FAQuestions["search-bar"]}>
            <input
              type="text"
              placeholder="Search..."
              aria-label="Search support topics"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
            <Search size={20} />
          </div>
        </div>
      </div>
      
      <div className={FAQuestions["faq-section"]}>
        <button className={FAQuestions["back-button"]} aria-label="Go back">
          <ArrowLeft size={24} />
        </button>
        <h2>FREQUENTLY ASKED QUESTIONS</h2>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))
        ) : (
          <p>No FAQs found matching your search.</p>
        )}
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
  );
}
