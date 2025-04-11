import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FAQ.css';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/faqs')
      .then(res => setFaqs(res.data))
      .catch(err => {
        console.error('Error fetching FAQs:', err);
        setError(true);
      });
  }, []);

  const handleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  if (error) return <div className="faq-error">Failed to load FAQs. Please try again later.</div>;
  if (!faqs.length) return <div className="faq-loading">Loading FAQs...</div>;

  return (
    <div className="faq-section" id="faq"> {/* <-- Add this line */}
      <h2 className="faq-heading">FREQUENTLY ASKED QUESTIONS</h2>
      <div className="faq-grid">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-card ${flippedIndex === index ? 'flipped' : ''}`}
            onClick={() => handleFlip(index)}
          >
            <div className="faq-inner">
              <div className="faq-front">
                <p>{faq.question}</p>
              </div>
              <div className="faq-back">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
