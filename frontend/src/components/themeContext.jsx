import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext({
  theme: 'default',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'default';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme === "default" ? "bg-gray-700 text-white" : "bg-gray-900 text-white";
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'default' ? 'dark' : 'default');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);