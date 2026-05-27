import { useState, useEffect } from "react";
import "./Achievements.css";

function CounterCard({ value, label, unit = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const parseValue =
      typeof value === "string" ? parseInt(value.replace(/\D/g, "")) : value;
    let current = 0;
    const increment = parseValue / 30;

    const interval = setInterval(() => {
      current += increment;
      if (current >= parseValue) {
        setCount(parseValue);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="achievement-card">
      <div className="card-content">
        <div className="card-value">
          {count}
          {unit}
        </div>
        <div className="card-label">{label}</div>
      </div>
    </div>
  );
}

function PowerBIKPICard({ title, value, trend, color }) {
  return (
    <div className="kpi-card" style={{ "--kpi-color": color }}>
      <div className="kpi-header">
        <h4>{title}</h4>
        <span className="kpi-trend">{trend}</span>
      </div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-bar">
        <div className="kpi-fill"></div>
      </div>
    </div>
  );
}

export default function Achievements({ data }) {
  const [downloadCount, setDownloadCount] = useState(12);

  return (
    <section id="achievements" className="achievements-section">
      <h2 className="section-title">Achievements & Impact</h2>

      <div className="achievements-container">
        <div className="achievement-row">
          <CounterCard
            value={data.stats.pipelinesBuilt}
            label="Pipelines Built"
          />
          <CounterCard value={data.stats.recordsProcessed} label="Data Records Processed" unit="B" />
          <CounterCard
            value={data.stats.projectsCompleted}
            label="Projects Delivered"
          />
          <CounterCard
            value={data.stats.teamSize}
            label="Team Members Collaborated"
          />
        </div>

        <div className="kpi-section">
          <h3>Performance Metrics</h3>
          <div className="kpi-grid">
            <PowerBIKPICard
              title="Data Quality Score"
              value="98.5%"
              trend="↑ 2.3%"
              color="#50E6FF"
            />
            <PowerBIKPICard
              title="Pipeline Success Rate"
              value={data.stats.uptime}
              trend="↑ 0.5%"
              color="#0078D4"
            />
            <PowerBIKPICard
              title="Cost Savings"
              value="40%"
              trend="↑ 15%"
              color="#FFB900"
            />
            <PowerBIKPICard
              title="Time to Insight"
              value="60%"
              trend="↑ 25%"
              color="#50FA7C"
            />
          </div>
        </div>

        <div className="recruitment-section">
          <div className="opportunity-card">
            <div className="opportunity-badge">Available</div>
            <h3>Open to Opportunities</h3>
            <p>
              Seeking Senior Data Engineer or Analytics Engineer roles focused
              on building scalable data platforms
            </p>
            <div className="opportunity-tags">
              <span>Azure Cloud</span>
              <span>Data Architecture</span>
              <span>Remote/Hybrid</span>
            </div>
          </div>

          <div className="recommendations-card">
            <h3>What I Bring to Your Team</h3>
            <div className="recommendations">
              <div className="recommendation-item">
                <div className="rec-icon">💰</div>
                <div className="rec-content">
                  <h4>Cost Optimization</h4>
                  <p>40% reduction in manual effort through automation</p>
                </div>
              </div>
              <div className="recommendation-item">
                <div className="rec-icon">🎯</div>
                <div className="rec-content">
                  <h4>Data Quality</h4>
                  <p>99.9% uptime with comprehensive validation frameworks</p>
                </div>
              </div>
              <div className="recommendation-item">
                <div className="rec-icon">⚡</div>
                <div className="rec-content">
                  <h4>Fast Delivery</h4>
                  <p>Scalable architectures with reusable components</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="download-tracker">
          <p>Resumes Downloaded: {downloadCount}</p>
          <div className="download-progress">
            <div className="progress-bar"></div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
