'use client';

import { useTheme } from 'next-themes';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="
        text-2xl mr-2
        text-text dark:text-text-dark
        transition-shadow duration-300
        z-50
      "
      aria-label="Toggle Theme"
    >
      {resolvedTheme === 'dark' ? <FiSun /> : <FiMoon />}
    </button>
  );
}
