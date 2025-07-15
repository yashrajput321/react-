// src/hooks/useTheme.js
import { useEffect, useState } from 'react';

export const useTheme = () => {

  const systemTheme =  (window.matchMedia('(prefers-color-scheme: dark)').matches)?"dark":"light"
  const [theme, setTheme] = useState(systemTheme);

  // Update class on every theme change
  useEffect(() => {
    const root = document.documentElement;

    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(theme)

    
    
  }, [theme]);

  

  return { theme, setTheme };
};
