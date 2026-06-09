import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { downloadResume, getDownloadCount } from "../utils/downloadTracker";
import logo from "../assets/logo.png";
import "./Header.css";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [downloadCount, setDownloadCount] = useState(getDownloadCount());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleResumeDownload = () => {
    const newCount = downloadResume("Harish-Kumar-Resume.pdf");
    setDownloadCount(newCount);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-brand">
          <img className="nav-logo" src={logo} alt="Portfolio logo" />
          <span>Portfolio</span>
        </div>

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? "is-open" : ""}`}>
          <li>
            <a href="#hero" onClick={() => setIsMenuOpen(false)}>Home</a>
          </li>
          <li>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
          </li>
          <li>
            <a href="#journey" onClick={() => setIsMenuOpen(false)}>Journey</a>
          </li>
          <li>
            <a href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a>
          </li>
          <li>
            <a href="#skills" onClick={() => setIsMenuOpen(false)}>Skills</a>
          </li>
          <li>
            <a href="#certifications" onClick={() => setIsMenuOpen(false)}>Certifications</a>
          </li>
          <li>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </li>
        </ul>

        <div className="nav-actions">
          <button className="btn-resume" onClick={handleResumeDownload} title={`Downloaded ${downloadCount} times`}>
            📥 Resume <span className="download-count">({downloadCount})</span>
          </button>
          <button className="btn-theme" onClick={toggleTheme} title={theme}>
            {theme === "dark" && "🌙"}
            {theme === "light" && "☀️"}
            {theme === "azure" && "☁️"}
          </button>
        </div>
      </nav>
    </header>
  );
}
