"use client";

import { useEffect } from 'react';

export default function ThemeProvider() {
  useEffect(() => {
    // Read dark mode from localStorage (set by home page toggle)
    const stored = localStorage.getItem('roystonlynxx_dark_mode') || localStorage.getItem('quickhop_dark_mode');
    
    const isDark = stored === null ? true : stored === 'true'; // default dark
    
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('light-mode');
      root.classList.add('dark-mode');
      document.body.style.backgroundColor = '#09090b';
      document.body.style.color = '#f4f4f5';
    } else {
      root.classList.remove('dark-mode');
      root.classList.add('light-mode');
      document.body.style.backgroundColor = '#faf9f6';
      document.body.style.color = '#18181b';
    }

    // Listen for storage changes (when user toggles on home page)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'roystonlynxx_dark_mode' || e.key === 'quickhop_dark_mode') {
        const newDark = e.newValue === 'true';
        if (newDark) {
          root.classList.remove('light-mode');
          root.classList.add('dark-mode');
          document.body.style.backgroundColor = '#09090b';
          document.body.style.color = '#f4f4f5';
        } else {
          root.classList.remove('dark-mode');
          root.classList.add('light-mode');
          document.body.style.backgroundColor = '#faf9f6';
          document.body.style.color = '#18181b';
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return null;
}
