import "./Footer.css";

export default function Footer({ data }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Connect With Me</h3>
          <div className="footer-social-links">
            <a href={`mailto:${data.personal.email}`} className="social-link">
              ✉️ Email
            </a>
            <a
              href={`https://linkedin.com/in/harish-kumar-chelluboina`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              💼 LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
              🐙 GitHub
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li>
              <a href="#hero">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#certifications">Certifications</a>
            </li>
            <li>
              <a href="#ask-me">Ask Me</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Location</h3>
          <p>{data.personal.location}</p>
          <p>📱 {data.personal.phone}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-line"></div>
        <p>
          © {currentYear} Portfolio developed by{" "}
          <a
            href="https://github.com/VasanthiSirikonda"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vasanthi Sirikonda
          </a>
          .
        </p>
        <p className="tech-stack-footer">
          Featuring Azure, Databricks, Data Lakehouse Architecture
        </p>
      </div>
    </footer>
  );
}
