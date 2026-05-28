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

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M20.52 3.47A11.79 11.79 0 0 0 12.1 0C5.55 0 .22 5.3.22 11.82c0 2.08.55 4.12 1.6 5.92L.12 24l6.42-1.68a11.95 11.95 0 0 0 5.56 1.4h.01c6.55 0 11.88-5.3 11.88-11.82 0-3.16-1.23-6.13-3.47-8.43ZM12.1 21.72h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.22-3.81 1 1.02-3.7-.24-.38a9.77 9.77 0 0 1-1.5-5.22C2.16 6.4 6.62 2 12.1 2c2.65 0 5.14 1.03 7.01 2.9A9.8 9.8 0 0 1 22 11.9c0 5.42-4.44 9.82-9.9 9.82Zm5.43-7.36c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.46a8.9 8.9 0 0 1-1.65-2.04c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.48s1.08 2.88 1.23 3.08c.15.2 2.12 3.22 5.13 4.52.72.3 1.28.49 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.1.79-.25.79-.56v-2.02c-3.22.7-3.9-1.38-3.9-1.38-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.73-1.55-2.57-.29-5.28-1.28-5.28-5.72 0-1.26.45-2.3 1.19-3.1-.12-.3-.52-1.48.11-3.06 0 0 .98-.31 3.17 1.18A10.95 10.95 0 0 1 12 6.07c.98 0 1.96.13 2.88.39 2.2-1.49 3.16-1.18 3.16-1.18.64 1.58.24 2.76.12 3.06.74.8 1.18 1.84 1.18 3.1 0 4.45-2.71 5.43-5.3 5.72.42.36.79 1.07.79 2.16v3.02c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
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
  const githubUrl = data.personal.github?.startsWith("http")
    ? data.personal.github
    : `https://${data.personal.github}`;
  const whatsappNumber = data.personal.phone?.replace(/\D/g, "");
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "";
  const emailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    data.personal.email
  )}`;

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
              <a href={emailUrl} target="_blank" rel="noopener noreferrer">{data.personal.email}</a>
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
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
                  <GitHubIcon />
                </a>
              )}
              {whatsappUrl && (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="WhatsApp">
                  <WhatsAppIcon />
                </a>
              )}
              <a href={emailUrl} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Email">
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
