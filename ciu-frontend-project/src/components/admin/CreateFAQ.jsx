import React, { useState } from 'react';
import FAQs from './CreateFAQ.module.css';

function CreateFAQ() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Submitted:', { question, answer });
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
    </div>
  );
}

export default CreateFAQ;