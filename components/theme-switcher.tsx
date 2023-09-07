// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      The current theme is: {theme}
      {theme === "dark" ? (
        <button
          className="bg-slate-300 px-3 py-2 text-slate-900 rounded-lg cursor-pointer"
          onClick={() => setTheme("light")}
        >
          Light Mode
        </button>
      ) : (
        <button
          className="bg-slate-300 px-3 py-2 text-slate-900 rounded-lg cursor-pointer"
          onClick={() => setTheme("dark")}
        >
          Dark Mode
        </button>
      )}
    </div>
  );
}
