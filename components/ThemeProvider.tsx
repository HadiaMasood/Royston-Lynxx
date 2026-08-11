"use client";

import { useEffect } from 'react';

export default function ThemeProvider() {
  useEffect(() => {
    // Read dark mode from localStorage (set by home page toggle)
    const stored = localStorage.getItem('roystonlynxx_dark_mode') || localStorage.getItem('quickhop_dark_mode');
    const isDark = stored === null ? true : stored === 'true'; // default dark

    const root = document.documentElement;
    const applyTheme = (dark: boolean) => {
      root.classList.remove('light-mode', 'light', 'dark-mode', 'dark');
      if (dark) {
        root.classList.add('dark-mode', 'dark');
        document.body.style.backgroundColor = '#09090b';
        document.body.style.color = '#f4f4f5';
      } else {
        root.classList.add('light-mode', 'light');
        document.body.style.backgroundColor = '#faf9f6';
        document.body.style.color = '#18181b';
      }
    };

    applyTheme(isDark);

    // Listen for storage changes (when user toggles on home page)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'roystonlynxx_dark_mode' || e.key === 'quickhop_dark_mode') {
        const newDark = e.newValue === 'true';
        applyTheme(newDark);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return null;
}
