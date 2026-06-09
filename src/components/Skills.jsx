import { useEffect, useRef } from "react";
import "./Skills.css";

function InteractiveSkillsGraph() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId;

    const updateCanvasSize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(width, 1) * pixelRatio;
      canvas.height = Math.max(height, 1) * pixelRatio;

      const ctx = canvas.getContext("2d");
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(canvas);

    const ctx = canvas.getContext("2d");

    const wideLayout = [
      { name: "Python", x: 0.12, y: 0.52, category: "programming" },
      { name: "PySpark", x: 0.27, y: 0.32, category: "programming" },
      { name: "SQL", x: 0.28, y: 0.72, category: "programming" },
      { name: "Azure Databricks", x: 0.52, y: 0.5, category: "azure" },
      { name: "Data Factory", x: 0.52, y: 0.78, category: "azure" },
      { name: "Delta Lake", x: 0.52, y: 0.22, category: "architecture" },
      { name: "ETL/ELT", x: 0.82, y: 0.5, category: "architecture" },
    ];

    const compactLayout = [
      { name: "Python", x: 0.14, y: 0.5, category: "programming" },
      { name: "PySpark", x: 0.3, y: 0.28, category: "programming" },
      { name: "SQL", x: 0.3, y: 0.72, category: "programming" },
      { name: "Azure Databricks", x: 0.53, y: 0.5, category: "azure" },
      { name: "Data Factory", x: 0.53, y: 0.78, category: "azure" },
      { name: "Delta Lake", x: 0.53, y: 0.22, category: "architecture" },
      { name: "ETL/ELT", x: 0.82, y: 0.5, category: "architecture" },
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

    const darkColors = {
      programming: "#00D9FF",
      azure: "#0078D4",
      architecture: "#50E6FF",
    };

    const lightColors = {
      programming: "#0f766e",
      azure: "#0f6cbd",
      architecture: "#b45309",
    };

    const animate = (time) => {
      const isLightTheme = document.documentElement.getAttribute("data-theme") === "light";
      const colors = isLightTheme ? lightColors : darkColors;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const isCompact = width < 900;
      const layout = isCompact ? compactLayout : wideLayout;
      const padding = isCompact ? 22 : 40;
      const graphWidth = Math.max(width - padding * 2, 1);
      const graphHeight = Math.max(height - padding * 2, 1);
      const nodeRadius = isCompact ? 8 : 11;
      const fontSize = width < 520 ? 9 : 11;
      const positions = layout.map((skill) => ({
        ...skill,
        x: padding + skill.x * graphWidth,
        y: padding + skill.y * graphHeight,
      }));

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = isLightTheme ? "#fbfcfd" : "rgba(0, 0, 0, 0.88)";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = isLightTheme ? "rgba(71, 85, 105, 0.28)" : "rgba(100, 200, 255, 0.3)";
      ctx.lineWidth = 1;
      connections.forEach(([from, to]) => {
        const f = positions[from];
        const t = positions[to];
        ctx.beginPath();
        ctx.moveTo(f.x, f.y);
        ctx.lineTo(t.x, t.y);
        ctx.stroke();
      });

      positions.forEach((skill) => {
        const pulse = Math.sin(time * 0.005 + skill.x) * 3 + nodeRadius;
        ctx.fillStyle = colors[skill.category];
        ctx.beginPath();
        ctx.arc(skill.x, skill.y, pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = isLightTheme ? "#111827" : "#fff";
        ctx.font = `700 ${fontSize}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(skill.name, skill.x, skill.y);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} />;
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
