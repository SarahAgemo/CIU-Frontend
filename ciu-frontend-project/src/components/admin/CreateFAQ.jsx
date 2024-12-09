import React, { useState } from 'react';
import axios from 'axios';
import FAQs from './CreateFAQ.module.css';

function CreateFAQ() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post('https://c-i-u-backend.onrender.com/faqs/create', {
        question,
        answer,
      });

      setSuccessMessage('FAQ created successfully!');
      setErrorMessage('');
      console.log('Submitted:', response.data);


      setQuestion('');
      setAnswer('');
    } catch (error) {

      setErrorMessage('Failed to create FAQ. Please try again.');
      setSuccessMessage('');
      console.error('Error submitting FAQ:', error);
    }
  };

  return (
    <div className={FAQs["create-faq"]}>
      <h1 className={FAQs["create-faq__title"]}>CREATE FAQs & ANSWERS</h1>
      <form onSubmit={handleSubmit} className={FAQs["create-faq__form"]}>
        <div className={FAQs["create-faq__form-group"]}>
          <label htmlFor="question" className={FAQs["create-faq__label"]}>Input Question</label>
          <textarea
            id="question"
            className={FAQs["create-faq__textarea"]}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div className={FAQs["create-faq__form-group"]}>
          <label htmlFor="answer" className={FAQs["create-faq__label"]}>Input Answer</label>
          <textarea
            id="answer"
            className={FAQs["create-faq__textarea"]}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={FAQs["create-faq__submit-button"]}>SUBMIT</button>
      </form>

      {/* Display Success or Error Message */}
      {successMessage && <p className={FAQs["create-faq__success-message"]}>{successMessage}</p>}
      {errorMessage && <p className={FAQs["create-faq__error-message"]}>{errorMessage}</p>}
    </div>
  );
}

export default CreateFAQ;
