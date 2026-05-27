import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { downloadResume, getDownloadCount } from "../utils/downloadTracker";
import "./Header.css";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [downloadCount, setDownloadCount] = useState(getDownloadCount());

  const handleResumeDownload = () => {
    try {
      // Try to download from public folder
      const link = document.createElement("a");
      link.href = "/Harish-Kumar-Resume.pdf";
      link.download = "Harish-Kumar-Resume.pdf";
      link.click();
      
      // Update download count
      const newCount = downloadResume("Harish-Kumar-Resume.pdf");
      setDownloadCount(newCount);
    } catch (error) {
      console.log("Download initiated");
    }
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-brand">
          <svg className="nav-logo" viewBox="0 0 100 100" width="32" height="32">
            <path d="M20 50 L50 20 L80 50 M50 20 L50 80 M20 50 L80 80" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          </svg>
          <span>Portfolio</span>
        </div>

        <ul className="nav-links">
          <li>
            <a href="#hero">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#journey">Journey</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
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
