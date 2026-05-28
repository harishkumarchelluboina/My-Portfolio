import "./Journey.css";

export default function Journey() {
  const journeySteps = [
    {
      year: "2021",
      title: "Mechanical Engineering Graduate",
      description: "Graduated with B.Tech in Mechanical Engineering",
      type: "education",
    },
    {
      year: "2021",
      title: "Self-Learning Data Skills",
      description: "Started learning Python, SQL, and data fundamentals",
      type: "learning",
    },
    {
      year: "2022",
      title: "First Pipeline Built",
      description: "Joined Infinite Computer Solutions as Azure Data Engineer",
      type: "milestone",
    },
    {
      year: "2023",
      title: "Healthcare Data Platform",
      description: "Led implementation of Medallion Architecture at Molina",
      type: "project",
    },
    {
      year: "2025",
      title: "Managed Care Platform",
      description: "Architecting scalable ELT pipelines for MLTSS data",
      type: "project",
    },
    {
      year: "2026",
      title: "Databricks Certification",
      description: "Certified Data Engineer Professional",
      type: "certification",
    },
  ];

  return (
    <section id="journey" className="journey-section">
      <h2 className="section-title">My Data Journey</h2>
      <p className="section-subtitle">
        From Mechanical Engineer to Enterprise Data Architect
      </p>

      <div className="timeline">
        {journeySteps.map((step, idx) => (
          <div key={idx} className="timeline-item">
            <div className="timeline-marker">
              <div className={`marker-dot ${step.type}`}></div>
            </div>
            <div className="timeline-content">
              <div className="timeline-year">{step.year}</div>
              <h3 className="timeline-title">{step.title}</h3>
              <p className="timeline-description">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
