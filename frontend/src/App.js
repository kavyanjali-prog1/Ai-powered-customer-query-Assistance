import React, { useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('bw', savedTheme === 'bw');
    updateThemeIcon(savedTheme);
  }, []);

  const toggleTheme = () => {
    const currentTheme = document.body.classList.contains('bw') ? 'bw' : 'dark';
    const newTheme = currentTheme === 'bw' ? 'dark' : 'bw';
    document.body.classList.toggle('bw', newTheme === 'bw');
    updateThemeIcon(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const updateThemeIcon = (theme) => {
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = theme === 'bw' ? '🌙' : '☀️';
  };

  return (
    <div className="App">
      <ChatWindow />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
