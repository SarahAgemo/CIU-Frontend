import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, ArrowLeft, Globe, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FAQuestions from './FAQs.module.css'; // Import the CSS module

// Component for each FAQ item
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={FAQuestions["faq-item"]}>
      <button
        className={FAQuestions["faq-question"]}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && <h6 className={FAQuestions["faq-answer"]}>{answer}</h6>}
    </div>
  );
};

// Main support content component
export default function SupportContent() {
  const [faqData, setFaqData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch FAQ data from the backend API
  useEffect(() => {
    fetch('https://c-i-u-backend.onrender.com/faqs') // Adjust the endpoint accordingly
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
      {/* Search and FAQ section */}
      <div className={FAQuestions["faq-section"]}>
        <button
          className={FAQuestions["back-button"]}
          aria-label="Go back"
          onClick={() => navigate('/student/support')}
        >
          <ArrowLeft size={24} />
        </button>
        <h2>FREQUENTLY ASKED QUESTIONS</h2>

        {/* Search bar */}
        <div className={FAQuestions["search-bar"]}>
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search support topics"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={20} />
        </div>

        {/* Render FAQ items */}
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))
        ) : (
          <p>No FAQs found matching your search.</p>
        )}
      </div>

      {/* Contact information section */}
      <div className={FAQuestions["contact-info"]}>
        <div className={FAQuestions["contact-item"]}>
          <Globe size={20} />
          <a href="https://ciu.ac.ug" target="_blank" rel="noopener noreferrer">
            https://ciu.ac.ug
          </a>
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
