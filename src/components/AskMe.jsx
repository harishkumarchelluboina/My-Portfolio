import { useState, useRef, useEffect } from "react";
import "./AskMe.css";

export default function AskMe() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const sqlSkillsTable = {
    query: `SELECT * FROM harish.skills`,
    result: [
      { Skill: "Python", Level: "Expert", YearsExperience: 4 },
      { Skill: "PySpark", Level: "Expert", YearsExperience: 4 },
      { Skill: "SQL", Level: "Advanced", YearsExperience: 4 },
      { Skill: "Azure Databricks", Level: "Expert", YearsExperience: 4 },
      { Skill: "Data Architecture", Level: "Advanced", YearsExperience: 4 },
      { Skill: "Azure Data Factory", Level: "Expert", YearsExperience: 3 },
    ],
  };

  // Easter egg: SQL query detector
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (
        e.key === "s" &&
        e.ctrlKey &&
        e.shiftKey &&
        window.location.search !== "?sql-mode=true"
      ) {
        // Trigger on Ctrl+Shift+S
        showSQLTable();
      }
    };

    // Check for SELECT query anywhere on page
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, []);

  const showSQLTable = () => {
    const modal = document.createElement("div");
    modal.className = "sql-modal";
    modal.innerHTML = `
      <div class="sql-content">
        <button class="close-btn" onclick="this.parentElement.parentElement.remove()">✕</button>
        <h3>SQL Easter Egg Unlocked! 🎉</h3>
        <pre>${sqlSkillsTable.query}</pre>
        <table class="results-table">
          <thead>
            <tr>
              <th>Skill</th>
              <th>Level</th>
              <th>Years</th>
            </tr>
          </thead>
          <tbody>
            ${sqlSkillsTable.result
              .map(
                (row) =>
                  `<tr>
                <td>${row.Skill}</td>
                <td>${row.Level}</td>
                <td>${row.YearsExperience}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
    document.body.appendChild(modal);
  };

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Check for SQL easter egg
    if (question.toLowerCase().includes("select * from harish")) {
      showSQLTable();
      setQuestion("");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      // Since we don't have a real Claude API key here, we'll use mock responses
      // In production, you would need to set up a backend to call Claude API
      const mockAnswers = {
        experience: `I have 4+ years of experience as an Azure Data Engineer. I've worked on two major projects:
        
1. ImpactPro (Healthcare Data Platform) - Built ETL/ELT pipelines processing large-scale healthcare datasets with Medallion Architecture and achieved 40% reduction in manual effort.

2. MCDA/MLTSS (Managed Care Platform) - Architected scalable pipelines for managed care data with parameterized templates and zero-downtime deployments.

Both projects emphasized data quality, governance, and performance optimization.`,
        skills: `My core technical skills include:
- Programming: Python, PySpark, SQL (Advanced)
- Azure: Azure Databricks, Data Factory, ADLS Gen2, SQL Server
- Architecture: Medallion Architecture, Delta Lake, Data Lakehouse
- Governance: Unity Catalog, RBAC, HIPAA Compliance
- DevOps: Azure DevOps, CI/CD Pipelines

I'm always learning and recently earned the Databricks Certified Data Engineer Professional certification.`,
        availability: `I'm currently open to new opportunities! I'm looking for roles that focus on:
- Data Engineering
- Data Architecture
- Analytics Engineering
- Positions offering remote or hybrid work

I'm particularly interested in organizations working with Azure cloud, building scalable data platforms, and focused on data quality and governance.`,
        challenges: `Some of the most interesting challenges I've tackled include:
1. Implementing Unity Catalog for fine-grained access control while maintaining HIPAA compliance
2. Building automated data quality frameworks to validate data integrity across all pipeline layers
3. Designing reusable ADF templates and Databricks notebooks to improve pipeline efficiency
4. Managing zero-downtime deployments for production pipelines serving critical business functions`,
        projects: `I've led implementation of two major enterprise data platforms:

**ImpactPro** - Healthcare platform processing large-scale patient datasets with Medallion Architecture (Bronze/Silver/Gold layers), implementing Unity Catalog governance, and achieving 99.9% uptime.

**MCDA/MLTSS** - Managed care analytics platform building parameterized ELT pipelines with modular Databricks notebooks, creating Power BI dashboards for leadership, and managing complete CI/CD deployments with Azure DevOps.`,
      };

      // Simple question matching
      let responseKey = "experience";
      if (
        question.toLowerCase().includes("skill") ||
        question.toLowerCase().includes("expertise")
      ) {
        responseKey = "skills";
      } else if (
        question.toLowerCase().includes("available") ||
        question.toLowerCase().includes("opportunity")
      ) {
        responseKey = "availability";
      } else if (
        question.toLowerCase().includes("challenge") ||
        question.toLowerCase().includes("difficult")
      ) {
        responseKey = "challenges";
      } else if (
        question.toLowerCase().includes("project") ||
        question.toLowerCase().includes("work")
      ) {
        responseKey = "projects";
      }

      setAnswer(mockAnswers[responseKey] || mockAnswers.experience);
    } catch (err) {
      setError("Failed to get response. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ask-me" className="ask-me-section">
      <h2 className="section-title">Ask Me Anything</h2>
      <p className="section-subtitle">
        Powered by AI — Get instant answers about my experience
      </p>

      <div className="ask-container">
        <form onSubmit={handleAskQuestion} className="question-form">
          <div className="form-group">
            <input
              ref={inputRef}
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask me about my experience, skills, or projects..."
              className="question-input"
              disabled={loading}
            />
            <button
              type="submit"
              className="btn-ask"
              disabled={loading || !question.trim()}
            >
              {loading ? "Thinking..." : "Ask ✨"}
            </button>
          </div>
          <p className="hint">
            💡 Tip: Try asking about my experience, skills, or type "SELECT *
            FROM harish" for a surprise!
          </p>
        </form>

        {answer && (
          <div className="answer-box">
            <h3>Answer</h3>
            <p>{answer}</p>
          </div>
        )}

        {error && <div className="error-box">{error}</div>}

        <div className="suggested-questions">
          <h4>Suggested Questions:</h4>
          <div className="suggestions-grid">
            <button
              className="suggestion-btn"
              onClick={() => {
                setQuestion("What's your experience with Azure data platforms?");
                inputRef.current?.focus();
              }}
            >
              💼 Experience
            </button>
            <button
              className="suggestion-btn"
              onClick={() => {
                setQuestion("What are your key technical skills?");
                inputRef.current?.focus();
              }}
            >
              🛠️ Skills
            </button>
            <button
              className="suggestion-btn"
              onClick={() => {
                setQuestion("Tell me about your major projects");
                inputRef.current?.focus();
              }}
            >
              📊 Projects
            </button>
            <button
              className="suggestion-btn"
              onClick={() => {
                setQuestion("Are you available for opportunities?");
                inputRef.current?.focus();
              }}
            >
              🎯 Availability
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
