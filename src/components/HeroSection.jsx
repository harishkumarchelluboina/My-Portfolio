import { useEffect, useRef } from "react";
import "./HeroSection.css";

export default function HeroSection({ data }) {
  const logoRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!logoRef.current) return;

      const rect = logoRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * 20;
      const rotateY = (x / rect.width) * 20;

      logoRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <div className="hero-left">
          <h1 className="hero-title">
            {data.personal.name.split(" ")[0]}
            <span className="highlight"> {data.personal.name.split(" ")[1]}</span>{" "}
            {data.personal.name.split(" ")[2]}
          </h1>
          <p className="hero-subtitle">{data.personal.title}</p>
          <p className="hero-bio">{data.personal.summary.slice(0, 150)}...</p>

          <div className="hero-cta">
            <a href="#projects" className="btn-primary">
              View My Work
            </a>
            <a
              href={`mailto:${data.personal.email}`}
              className="btn-secondary"
            >
              Get In Touch
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="azure-3d-container">
            <div className="azure-logo-3d" ref={logoRef}>
              <svg viewBox="0 0 100 100" className="azure-svg">
                <path
                  d="M20 50 L50 20 L80 50 M50 20 L50 80 M20 50 L80 80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value counter">{data.stats.pipelinesBuilt}</div>
          <div className="stat-label">Pipelines Built</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{data.stats.recordsProcessed}</div>
          <div className="stat-label">Records Processed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{data.stats.uptime}</div>
          <div className="stat-label">Uptime Achieved</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{data.stats.yearsExperience}</div>
          <div className="stat-label">Years Experience</div>
        </div>
      </div>
    </section>
  );
}
