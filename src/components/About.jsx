import { useEffect, useRef, useState } from "react";
import "./About.css";

function GlassmorphismTerminal({ text }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="terminal-glass">
      <div className="terminal-header">
        <span>Portfolio CLI</span>
        <div className="terminal-controls">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="terminal-body">
        <p className="terminal-line">
          <span className="prompt">$ </span>
          <span className="command">cat biography.txt</span>
        </p>
        <p className="terminal-output">{displayedText}</p>
        {isTyping && <span className="cursor">▮</span>}
      </div>
    </div>
  );
}

function MedallionArchitecture() {
  return (
    <div className="medallion-container">
      <h3>Data Architecture</h3>
      <div className="medallion-diagram">
        <div className="medallion-layer bronze">
          <div className="layer-content">
            <p className="layer-icon">📦</p>
            <p className="layer-name">Bronze</p>
            <p className="layer-desc">Raw Data</p>
          </div>
        </div>
        <div className="flow-arrow">→</div>
        <div className="medallion-layer silver">
          <div className="layer-content">
            <p className="layer-icon">⚙️</p>
            <p className="layer-name">Silver</p>
            <p className="layer-desc">Transformed</p>
          </div>
        </div>
        <div className="flow-arrow">→</div>
        <div className="medallion-layer gold">
          <div className="layer-content">
            <p className="layer-icon">✨</p>
            <p className="layer-name">Gold</p>
            <p className="layer-desc">Business Ready</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About({ data }) {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="section-title">About Me</h2>

        <div className="about-content">
          <div className="about-left">
            <GlassmorphismTerminal text={data.personal.summary} />
          </div>

          <div className="about-right">
            <MedallionArchitecture />

            <div className="core-competencies">
              <h3>Core Competencies</h3>
              <div className="competencies-grid">
                {data.coreCompetencies.map((comp, idx) => (
                  <div key={idx} className="competency-tag">
                    {comp}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
