import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FAQ.css';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/faqs')
      .then(res => setFaqs(res.data))
      .catch(err => {
        console.error('Error fetching FAQs:', err);
        setError(true);
      });
  }, []);

  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>Failed to load FAQs. Please try again later.</div>;

  if (!faqs.length) return <div style={{ textAlign: 'center' }}>Loading FAQs...</div>;

  return (
    <div className="faq-section">
      <h2>📋 Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <details key={index} className="faq-item">
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
};

export default FAQ;
