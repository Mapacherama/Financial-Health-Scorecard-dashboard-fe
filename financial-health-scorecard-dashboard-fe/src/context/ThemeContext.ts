import React, { createContext, useState, ReactNode, useContext } from "react";

// Define the shape of the ThemeContext
interface ThemeContextType {
  theme: string;
  toggleTheme: (newTheme: string) => void;
}

// Create the ThemeContext with a default value
export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {}, // Default implementation for toggleTheme
});

// Define the props for the ThemeProvider
interface ThemeProviderProps {
  children: ReactNode;
}

// Create the ThemeProvider
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>(() => localStorage.getItem("theme") || "light");

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save theme to localStorage
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook to use ThemeContext
export const useTheme = () => useContext(ThemeContext);
