import "../styles/globals.css";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function MyApp({ Component, pageProps }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) {
        setDark(saved === "dark");
      } else {
        const prefersDark =
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        setDark(prefersDark);
      }
    } catch (err) {
      console.warn("Theme load error:", err);
    }
  }, []);

  // Apply theme class and persist
  useEffect(() => {
    const el = document.documentElement;
    if (dark) {
      el.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      el.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const toggleTheme = () => setDark((v) => !v);

  return (
    <div>
      <nav className="navbar">
        <h1 className="brand">
          <a href="/">School Directory</a>
        </h1>
        <button
          className="toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          {dark ? "Light" : "Dark"}
        </button>
      </nav>

      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={Component.displayName || Component.name || "page"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
