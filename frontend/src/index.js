import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize theme
const savedMode = localStorage.getItem('darkMode');
const initialMode = savedMode ? JSON.parse(savedMode) : false; // Default to light mode
document.documentElement.setAttribute('data-theme', initialMode ? 'dark' : 'light');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App initialDarkMode={initialMode} />
  </React.StrictMode>
);
