import { useState, useEffect } from "react";
import "./SQLEasterEgg.css";

export default function SQLEasterEgg() {
  const [showResults, setShowResults] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Add character to input
      setInput((prev) => prev + e.key.toLowerCase());

      // Check if user typed "SELECT * FROM harish"
      if (
        input.toLowerCase().includes("select * from harish") ||
        input.toLowerCase().includes("select*fromharish")
      ) {
        setShowResults(true);
        setInput("");

        // Auto-hide after 8 seconds
        setTimeout(() => setShowResults(false), 8000);
      }

      // Clear input if it gets too long
      if (input.length > 100) {
        setInput("");
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [input]);

  if (!showResults) return null;

  return (
    <div className="sql-easter-egg">
      <div className="sql-terminal">
        <div className="terminal-header">
          <span className="terminal-title">SQL Query Terminal</span>
          <button
            className="terminal-close"
            onClick={() => setShowResults(false)}
          >
            ✕
          </button>
        </div>
        <div className="terminal-content">
          <div className="query-input">
            <span className="prompt">postgres=&gt; </span>
            <span className="sql-query">SELECT * FROM harish;</span>
          </div>

          <div className="query-results">
            <table className="results-table">
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>role</th>
                  <th>skills</th>
                  <th>experience_years</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Chelluboina Harish Kumar</td>
                  <td>Azure Data Engineer</td>
                  <td>Python, PySpark, SQL, Azure Databricks, Delta Lake</td>
                  <td>4+</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Location</td>
                  <td>Hyderabad, Telangana</td>
                  <td>India</td>
                  <td>📍</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Email</td>
                  <td>harishkumarchelluboina@gmail.com</td>
                  <td>Always open</td>
                  <td>📧</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Status</td>
                  <td>Available for Opportunities</td>
                  <td>Open to Collaborate</td>
                  <td>🚀</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="query-stats">
            <span className="stat-label">(4 rows)</span>
          </div>

          <div className="query-footer">
            <span className="hint">💡 Tip: Type "SELECT * FROM harish" anywhere to unlock this!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
