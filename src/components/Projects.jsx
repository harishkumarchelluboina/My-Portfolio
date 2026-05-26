import "./Projects.css";

export default function Projects({ data }) {
  const projects = data.experience[0].projects;

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Featured Projects</h2>
      <p className="section-subtitle">
        Real-world data solutions powering enterprise decisions
      </p>

      <div className="projects-grid">
        {projects.map((project, idx) => (
          <div key={idx} className="project-card">
            <div className="project-header">
              <h3>{project.name}</h3>
              <span className="project-badge">{project.period}</span>
            </div>

            <div className="project-meta">
              <div className="meta-item">
                <span className="label">Client</span>
                <span className="value">{project.client}</span>
              </div>
              <div className="meta-item">
                <span className="label">Impact</span>
                <span className="value">{project.impact}</span>
              </div>
            </div>

            <div className="project-body">
              <h4>Key Highlights</h4>
              <ul className="highlights-list">
                {project.highlights.slice(0, 3).map((highlight, hIdx) => (
                  <li key={hIdx}>
                    <span className="bullet">▸</span>
                    {highlight.slice(0, 80)}...
                  </li>
                ))}
              </ul>
            </div>

            <div className="tech-stack">
              <h4>Tech Stack</h4>
              <div className="tech-tags">
                {project.techStack.map((tech, tIdx) => (
                  <span key={tIdx} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <button className="btn-details">View Details →</button>
          </div>
        ))}
      </div>
    </section>
  );
}
