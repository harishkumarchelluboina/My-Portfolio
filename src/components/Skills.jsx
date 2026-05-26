import { useEffect, useRef } from "react";
import "./Skills.css";

function InteractiveSkillsGraph() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Skill nodes
    const skills = [
      { name: "Python", x: 150, y: 150, category: "programming" },
      { name: "PySpark", x: 300, y: 100, category: "programming" },
      { name: "SQL", x: 300, y: 200, category: "programming" },
      { name: "Azure Databricks", x: 450, y: 150, category: "azure" },
      { name: "Data Factory", x: 450, y: 250, category: "azure" },
      { name: "Delta Lake", x: 450, y: 50, category: "architecture" },
      { name: "ETL/ELT", x: 600, y: 150, category: "architecture" },
    ];

    // Connection rules
    const connections = [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [3, 4],
      [3, 5],
      [5, 6],
      [4, 6],
    ];

    const colors = {
      programming: "#00D9FF",
      azure: "#0078D4",
      architecture: "#50E6FF",
    };

    const animate = (time) => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);

      // Draw connections
      ctx.strokeStyle = "rgba(100, 200, 255, 0.3)";
      ctx.lineWidth = 1;
      connections.forEach(([from, to]) => {
        const f = skills[from];
        const t = skills[to];
        ctx.beginPath();
        ctx.moveTo(f.x, f.y);
        ctx.lineTo(t.x, t.y);
        ctx.stroke();
      });

      // Draw nodes
      skills.forEach((skill) => {
        const pulse = Math.sin(time * 0.005 + skill.x) * 5 + 10;
        ctx.fillStyle = colors[skill.category];
        ctx.beginPath();
        ctx.arc(skill.x, skill.y, pulse, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = "#fff";
        ctx.font = "11px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(skill.name, skill.x, skill.y);
      });

      requestAnimationFrame(animate);
    };

    animate(0);
  }, []);

  return <canvas ref={canvasRef} width={700} height={350} />;
}

export default function Skills({ data }) {
  const skillCategories = [
    {
      name: "Programming",
      skills: data.skills.programming,
      color: "#00D9FF",
    },
    { name: "Azure Services", skills: data.skills.azure, color: "#0078D4" },
    {
      name: "Data Architecture",
      skills: data.skills.architecture,
      color: "#50E6FF",
    },
    { name: "Governance", skills: data.skills.governance, color: "#FFB900" },
    { name: "DevOps & CI/CD", skills: data.skills.devops, color: "#FF6B6B" },
    {
      name: "Visualization",
      skills: data.skills.visualization,
      color: "#FFD60A",
    },
  ];

  return (
    <section id="skills" className="skills-section">
      <h2 className="section-title">Technical Skills</h2>

      <div className="skills-content">
        <div className="skills-graph">
          <h3>Skill Connections</h3>
          <InteractiveSkillsGraph />
        </div>

        <div className="skills-breakdown">
          <div className="skills-grid">
            {skillCategories.map((category, idx) => (
              <div
                key={idx}
                className="skill-category"
                style={{ "--accent-color": category.color }}
              >
                <h3>{category.name}</h3>
                <div className="skill-tags">
                  {category.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="skill-distribution">
        <h3>Skill Distribution</h3>
        <div className="distribution-bars">
          {[
            { label: "Data Engineering", value: 95 },
            { label: "Cloud Platforms", value: 90 },
            { label: "Data Architecture", value: 88 },
            { label: "DevOps & CI/CD", value: 85 },
            { label: "Problem Solving", value: 92 },
          ].map((item, idx) => (
            <div key={idx} className="distribution-item">
              <span className="label">{item.label}</span>
              <div className="bar-container">
                <div className="bar-fill" style={{ width: `${item.value}%` }}>
                  <span className="bar-value">{item.value}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="skill-logos">
        <h3>Tech Stack & Tools</h3>
        <div className="logos-grid">
          {data.skillsWithLogos && data.skillsWithLogos.map((skill, idx) => (
            <div key={idx} className="logo-item" title={skill.name}>
              <img src={skill.logo} alt={skill.name} onError={(e) => { e.target.style.display = 'none'; }} />
              <span className="logo-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
