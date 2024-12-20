import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import FAQItem from './FAQItem';
import { useNavigate } from 'react-router-dom';
import FAQ from './FAQpop.module.css';

export default function FAQList() {
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch('https://c-i-u-backend.onrender.com/faqs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        setError('Failed to load FAQs');
      }
    };

    fetchFAQs();
  }, []);

  return (
    <div className={FAQ["faq-list"]}>
      <button className={FAQ["faq-back-button"]} aria-label="Go back" onClick={() => navigate('/student/support')}>
        <ArrowLeft className={FAQ["faq-back-icon"]} />
      </button>
      <h1 className={FAQ["faq-title"]}>FREQUENTLY ASKED QUESTIONS</h1>

      {/* Display error message if there is one */}
      {error && <p className={FAQ["error-message"]}>{error}</p>}

      <div className={FAQ["faq-items"]}>
        {/* Render fetched FAQs */}
        {faqs.map(faq => (
          <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}
