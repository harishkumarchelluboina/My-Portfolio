import { useState } from "react";
import "./Certifications.css";

export default function Certifications() {
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const certificateUrl = "/DataBricksCertificate.pdf";
  const certificatePreviewUrl = `${certificateUrl}#toolbar=0&navpanes=0&scrollbar=0&view=Fit&zoom=page-fit`;

  return (
    <section id="certifications" className="certifications-section">
      <div className="certifications-container">
        <h2 className="section-title">Certifications</h2>
        <p className="section-subtitle">
          Professional credentials validating hands-on data engineering expertise
        </p>

        <button
          type="button"
          className="certification-card"
          onClick={() => setIsCertificateOpen(true)}
          aria-label="View Databricks certificate"
        >
          <img
            className="certification-badge"
            src="/DataBricksBadge.png"
            alt="Databricks certification badge"
          />
          <div className="certification-details">
            <h3>Databricks Certification</h3>
            <p>Click the badge to preview the certificate.</p>
          </div>
        </button>
      </div>

      {isCertificateOpen && (
        <div className="certificate-modal-overlay" onClick={() => setIsCertificateOpen(false)}>
          <div
            className="certificate-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="certificate-modal-header">
              <div>
                <h3 id="certificate-modal-title">Databricks Certificate</h3>
                <p>Preview or download a copy.</p>
              </div>
              <button
                type="button"
                className="certificate-close"
                onClick={() => setIsCertificateOpen(false)}
                aria-label="Close certificate preview"
              >
                x
              </button>
            </div>

            <div className="certificate-viewer">
              <iframe
                src={certificatePreviewUrl}
                className="certificate-pdf"
                title="Databricks certificate preview"
              />
            </div>

            <div className="certificate-actions">
              <a className="certificate-download" href={certificateUrl} download>
                Download Certificate
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
