import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ChatWindow from './components/ChatWindow';
import FAQ from './components/FAQ';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = JSON.parse(localStorage.getItem('darkMode'));
    if (savedMode !== null) {
      setDarkMode(savedMode);
      document.documentElement.setAttribute('data-theme', savedMode ? 'dark' : 'light');
    } else {
      // default theme
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const handleButtonClick = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <Navbar
        title="ShoppersAI" 
        image = "../public/chatbot.gif"
        onButtonClick={handleButtonClick}
        darkMode={darkMode}
      />
      <ChatWindow />
      <FAQ />
    </div>
  );
}

export default App;
