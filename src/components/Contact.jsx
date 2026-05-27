import { useState } from "react";
import "./Contact.css";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.36 8.04h4.28V23H.36V8.04ZM8.1 8.04h4.1v2.04h.06c.57-1.08 1.96-2.22 4.04-2.22 4.32 0 5.12 2.84 5.12 6.54V23h-4.28v-7.62c0-1.82-.03-4.16-2.53-4.16-2.54 0-2.93 1.98-2.93 4.02V23H8.1V8.04Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M3 5h18c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2Zm9 8.15L3.55 7.5H3v.2l9 6 9-6v-.2h-.55L12 13.15Z" />
    </svg>
  );
}

export default function Contact({ data }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this to a backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const linkedinUrl = data.personal.linkedin?.startsWith("http")
    ? data.personal.linkedin
    : `https://${data.personal.linkedin}`;

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Get In Touch</h2>
      <p className="section-subtitle">
        Have a question or want to collaborate? Let's connect!
      </p>

      <div className="contact-content">
        <div className="contact-info">
          <h3>Contact Information</h3>
          <div className="info-item">
            <div className="info-icon">📧</div>
            <div className="info-text">
              <h4>Email</h4>
              <a href={`mailto:${data.personal.email}`}>{data.personal.email}</a>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📍</div>
            <div className="info-text">
              <h4>Location</h4>
              <p>{data.personal.location || "Available for remote opportunities"}</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">💼</div>
            <div className="info-text">
              <h4>Professional</h4>
              <p>Azure Data Engineer | Data Architecture</p>
            </div>
          </div>

          <div className="social-links">
            <h4>Connect With Me</h4>
            <div className="social-buttons">
              {data.personal.linkedin && (
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
                  <LinkedInIcon />
                </a>
              )}
              {data.personal.github && (
                <a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="social-btn">
                  GitHub
                </a>
              )}
              <a href={`mailto:${data.personal.email}`} className="social-btn" aria-label="Email">
                <MailIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message here..."
                rows="6"
              />
            </div>

            <button type="submit" className="btn-submit">
              Send Message
            </button>

            {submitted && (
              <div className="success-message">
                ✓ Thank you! I'll get back to you soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
