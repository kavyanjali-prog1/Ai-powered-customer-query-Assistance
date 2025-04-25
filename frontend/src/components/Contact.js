import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSending(true);
    setStatusMessage('');

    fetch('http://localhost:5000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Server error');
        }
        return response.json();
      })
      .then((data) => {
        setStatusMessage('Message sent successfully!');
        setIsError(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      })
      .catch((error) => {
        setStatusMessage('Error sending message. Please try again.');
        setIsError(true);
        console.error('Error:', error);
      })
      .finally(() => {
        setIsSending(false);
        setTimeout(() => setStatusMessage(''), 5000);
      });
  };

  return (
    <section className="contact-section" id="contact">
      <h2 className="contact-heading">Get in Touch</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        />
        <textarea
          placeholder="Your Message"
          rows="5"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {statusMessage && (
        <p className={`status-message ${isError ? 'error' : 'success'}`}>
          {statusMessage}
        </p>
      )}
    </section>
  );
};

export default Contact;
