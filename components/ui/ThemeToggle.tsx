"use client";

import { useEffect, useState } from "react";
import { HiSun, HiMoon } from "react-icons/hi";

const STORAGE_KEY = "theme";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  // On mount, read persisted preference (default: dark)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersDark = stored !== null ? stored === "dark" : true;
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="rounded-full p-2 text-xl transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {isDark ? <HiSun className="text-yellow-300" /> : <HiMoon className="text-primary-400" />}
    </button>
  );
}
