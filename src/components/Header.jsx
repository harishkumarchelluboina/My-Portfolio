import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { downloadResume, getDownloadCount } from "../utils/downloadTracker";
import logo from "../assets/logo.png";
import "./Header.css";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [downloadCount, setDownloadCount] = useState(getDownloadCount());

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
