import { useEffect, useState } from "react";
import "./LoadingScreen.css";

export default function LoadingScreen() {
  const [stage, setStage] = useState(0);
  const stages = [
    { label: "Ingesting", dots: "..." },
    { label: "Transforming", dots: "..." },
    { label: "Loading", dots: "..." },
    { label: "Portfolio Ready", dots: "✅" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, [stages.length]);

  return (
    <div className="loading-screen">
      <div className="etl-pipeline">
        <div className="pipeline-header">
          <h1>ETL Pipeline Initialization</h1>
          <p>Building portfolio...</p>
        </div>

        <div className="pipeline-stages">
          {stages.map((s, idx) => (
            <div
              key={idx}
              className={`stage ${idx <= stage ? "active" : ""}`}
            >
              <div className="stage-icon">
                <span>{s.dots}</span>
              </div>
              <p>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="pipeline-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((stage + 1) / stages.length) * 100}%` }}
            ></div>
          </div>
          <p>{Math.round(((stage + 1) / stages.length) * 100)}%</p>
        </div>

        <div className="pipeline-logs">
          <div className="log-entry">
            <span className="log-time">[INFO]</span> Pipeline started
          </div>
          {stage >= 0 && (
            <div className="log-entry">
              <span className="log-time">[INFO]</span> Ingesting from source...
            </div>
          )}
          {stage >= 1 && (
            <div className="log-entry">
              <span className="log-time">[INFO]</span> Transforming data
            </div>
          )}
          {stage >= 2 && (
            <div className="log-entry">
              <span className="log-time">[INFO]</span> Loading to destination
            </div>
          )}
          {stage >= 3 && (
            <div className="log-entry success">
              <span className="log-time">[SUCCESS]</span> Pipeline completed
              successfully
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
