import MacbookScrollDemo from "./components/example/macbook-scroll-demo";
import { useState } from 'react';


function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <h1 className={isDarkMode ? 'light' : ''}>RDx + Vite + React + Tailwind Widget is live</h1>
        <button
          className={`bg-${isDarkMode ? 'black' : 'white'} text-${isDarkMode ? 'white' : 'black'} hover:bg-gray-700`}
          onClick={toggleDarkMode}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

      <MacbookScrollDemo />
      </div>
  );
}

export default App
