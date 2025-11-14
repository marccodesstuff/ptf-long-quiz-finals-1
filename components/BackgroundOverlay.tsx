'use client';

import { useEffect } from 'react';

export default function BackgroundOverlay() {
  useEffect(() => {
    const overlay = document.getElementById('theme-overlay');
    if (!overlay) return;

    const updateOverlay = () => {
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        overlay.style.background = 'linear-gradient(to bottom right, rgb(15, 23, 42), rgb(30, 41, 59), rgb(15, 23, 42))';
      } else {
        overlay.style.background = 'linear-gradient(to bottom right, rgb(165, 140, 251), rgb(243, 232, 255), rgb(252, 231, 243))';
      }
    };

    const observer = new MutationObserver(updateOverlay);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    updateOverlay();

    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="theme-overlay"
      className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 pointer-events-none z-0 transition-all duration-500"
    />
  );
}
