import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-top">
          <h3 className="footer-logo">SmartShop AI</h3>
          <div className="footer-links">
            <a href="#">Home</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-dev">
          <p className="dev-heading">Developed by</p>
          <p className="dev-name">KORIPUDI KAVYANJALI</p>
          <div className="dev-contact">
            <a href="mailto:youremail@example.com" title="Email"><i className="fas fa-envelope"></i></a>
            {/* <a href="tel:+1234567890" title="Phone"><i className="fas fa-phone-alt"></i></a> */}
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noreferrer" title="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" title="LinkedIn"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>

        <p className="footer-bottom">&copy; {new Date().getFullYear()} SmartShop AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
