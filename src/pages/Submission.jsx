import { useState } from "react";
import { Link } from "react-router-dom";
import { submitRequisition } from "../services/api";
import "./Submission.css";

/* Offline Requisition PDF */
import requisitionPDF from "../assets/Library-BooksRequisitionForm.pdf";

export default function Submission() {
  const [form, setForm] = useState({
    name: "",
    department: "",
    mobile: "",
    email: "",
    category: "",
    type: "",
    title: "",
    author: "",
    edition: "",
    publisher: "",
    issn: "",
    researchArea: "",
    remark: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT (BACKEND SAFE) ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitRequisition(form); // 🔒 BACKEND UNTOUCHED
      
      // Success animation trigger
      const submitBtn = e.target.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('submit-success');
        setTimeout(() => {
          submitBtn.classList.remove('submit-success');
        }, 2000);
      }
      
      alert("Requisition submitted successfully");

      // Reset form
      setForm({
        name: "",
        department: "",
        mobile: "",
        email: "",
        category: "",
        type: "",
        title: "",
        author: "",
        edition: "",
        publisher: "",
        issn: "",
        researchArea: "",
        remark: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to submit requisition");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="submission-page">
      <div className="header-animation">
        <h2 className="page-title">Library Resources Requisition</h2>
        <div className="title-underline"></div>
      </div>

      <div className="content-container">
        {/* ================= ONLINE REQUISITION FORM ================= */}
        <div className="form-card fade-in">
          <div className="card-header">
            <h3>Online Requisition Form</h3>
            <div className="form-indicator">All fields marked * are required</div>
          </div>
          
          <form className="requisition-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="input-group">
                <input
                  name="name"
                  placeholder="Name *"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                <span className="input-focus-border"></span>
              </div>

              <div className="input-group">
                <input
                  name="department"
                  placeholder="Department *"
                  value={form.department}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                <span className="input-focus-border"></span>
              </div>

              <div className="input-group">
                <input
                  name="mobile"
                  placeholder="Mobile Number *"
                  value={form.mobile}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                <span className="input-focus-border"></span>
              </div>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email ID *"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                <span className="input-focus-border"></span>
              </div>

              <div className="input-group">
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Category *</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Student">Student</option>
                  <option value="Others">Others</option>
                </select>
                <span className="input-focus-border"></span>
              </div>

              <div className="input-group">
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Requisition Type *</option>
                  <option value="Book">Book</option>
                  <option value="Journal">Journal</option>
                </select>
                <span className="input-focus-border"></span>
              </div>

              <div className="input-group full-width">
                <input
                  name="title"
                  placeholder="Title *"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                <span className="input-focus-border"></span>
              </div>

              <div className="input-group">
                <input
                  name="author"
                  placeholder="Author"
                  value={form.author}
                  onChange={handleChange}
                  className="form-input"
                />
                <span className="input-focus-border"></span>
              </div>

              <div className="input-group">
                <input
                  name="edition"
                  placeholder="Edition"
                  value={form.edition}
                  onChange={handleChange}
                  className="form-input"
                />
                <span className="input-focus-border"></span>
              </div>

              <div className="input-group">
                <input
                  name="publisher"
                  placeholder="Publisher"
                  value={form.publisher}
                  onChange={handleChange}
                  className="form-input"
                />
                <span className="input-focus-border"></span>
              </div>

              {form.type === "Journal" && (
                <>
                  <div className="input-group">
                    <input
                      name="issn"
                      placeholder="ISSN (For Journal)"
                      value={form.issn}
                      onChange={handleChange}
                      className="form-input"
                    />
                    <span className="input-focus-border"></span>
                  </div>

                  <div className="input-group">
                    <input
                      name="researchArea"
                      placeholder="Research Area"
                      value={form.researchArea}
                      onChange={handleChange}
                      className="form-input"
                    />
                    <span className="input-focus-border"></span>
                  </div>
                </>
              )}

              <div className="input-group full-width">
                <textarea
                  name="remark"
                  placeholder="Remark (Optional)"
                  value={form.remark}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="4"
                />
                <span className="input-focus-border"></span>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  'Submit Requisition'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* ================= SIDE CARDS ================= */}
        <div className="side-cards">
          {/* ================= OFFLINE REQUISITION ================= */}
          <div className="info-card slide-in-right">
            <div className="card-icon">
              <span className="icon">📄</span>
            </div>
            <h3>Offline Requisition</h3>
            <p>Prefer traditional forms? Download our PDF requisition form.</p>
            <a 
              href={requisitionPDF} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-link"
            >
              <span className="link-text">Download PDF Form</span>
              <span className="link-arrow">→</span>
            </a>
          </div>

          {/* ================= INTERNSHIP ================= */}
          <div className="info-card slide-in-right" style={{animationDelay: '0.1s'}}>
            <div className="card-icon">
              <span className="icon">👨‍💼</span>
            </div>
            <h3>Library Internship</h3>
            <p>Apply for our hybrid mode library internship program.</p>
            <a 
              href="/internship" 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-link"
            >
              <span className="link-text">Apply for Internship</span>
              <span className="link-arrow">→</span>
            </a>
          </div>

          {/* ================= FEEDBACK ================= */}
          <div className="info-card slide-in-right" style={{animationDelay: '0.2s'}}>
            <div className="card-icon">
              <span className="icon">💬</span>
            </div>
            <h3>Library Feedback</h3>
            <p>Help us improve by sharing your valuable feedback.</p>
            <Link to="/feedback" className="action-link">
              <span className="link-text">Submit Feedback</span>
              <span className="link-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}