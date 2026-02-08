import { useState } from "react";
import "./Grievance.css";

const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "https://vcfw-library-backend.onrender.com";


export default function Grievance() {
  const [userType, setUserType] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [submittedId, setSubmittedId] = useState("");
  const [result, setResult] = useState(null);
  const [showTerms, setShowTerms] = useState(false);

  const [form, setForm] = useState({
    category: "",
    subject: "",
    name: "",
    phone: "",
    email: "",
    department: "",
    course: "",
    query: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
   
  console.log("API_BASE USED =", API_BASE);
  /* ================= SUBMIT ================= */
  const submitGrievance = async (e) => {
    e.preventDefault();

    if (!form.query.trim()) {
      alert("Please write your grievance");
      return;
    }

    const payload = {
      userType,
      name: form.name,
      phone: form.phone,
      email: form.email,
      department: form.department,
      query: form.query,
    };

    if (userType === "Student") {
      payload.category = form.category;
      payload.subject = form.subject;
      payload.course = form.course;
    }

    try {
      const res = await fetch(`${API_BASE}/api/grievances`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Submission failed");
        return;
      }

      // show tracking id nicely
      setSubmittedId(data.trackingId);

      // reset form
      setForm({
        category: "",
        subject: "",
        name: "",
        phone: "",
        email: "",
        department: "",
        course: "",
        query: "",
      });
      setUserType("");
    } catch (err) {
      alert("Server error. Please try again.");
    }
    
  };

  /* ================= TRACK ================= */
  const track = async () => {
    if (!trackingId.trim()) return;

    try {
      const res = await fetch(
  `${API_BASE}/api/grievances/track/${trackingId}`
    );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid Tracking ID");
        return;
      }
      setResult(data);
    } catch {
      alert("Unable to track grievance");
    }
  };

  const clearTracking = () => {
    setTrackingId("");
    setResult(null);
  };

  const statusColors = {
    "Pending": "#f39c12",
    "In Progress": "#3498db",
    "Resolved": "#27ae60",
    "Rejected": "#e74c3c"
  };

  return (
    <div className="grievance-container">
      <div className="grievance-header">
        <h1>📚 Library Grievance Redressal Portal</h1>
        <p className="subtitle">
          Submit your concerns and track their resolution status
        </p>
      </div>

      <div className="grievance-layout">
        {/* LEFT : SUBMISSION */}
        <div className="grievance-left">
          <div className="section-title">
            <h2>📝 Submit Grievance</h2>
            {userType && (
              <span className="user-type-badge">
                {userType === "Student" ? "🎓 Student" : "👨‍🏫 Teacher"}
              </span>
            )}
          </div>

          {/* Terms Alert */}
          <div className="terms-alert">
            <button 
              className="terms-toggle-btn"
              onClick={() => setShowTerms(!showTerms)}
            >
              {showTerms ? "▲" : "▼"} Important Terms & Guidelines
            </button>
            
            {showTerms && (
              <div className="terms-content">
                <div className="terms-list">
                  <p><strong>📋 Please read before submitting:</strong></p>
                  <ul>
                    <li>✅ Submit only genuine concerns. False complaints may lead to action.</li>
                    <li>✅ Response time: 3-5 working days for non-urgent matters.</li>
                    <li>✅ Keep your Tracking ID confidential for security.</li>
                    <li>✅ All communication will be sent to your registered email.</li>
                    <li>✅ Maintain respectful language in your description.</li>
                  </ul>
                  <p className="terms-note">
                    <strong>Note:</strong> By submitting, you agree to these terms.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* SUCCESS BOX */}
          {submittedId && (
            <div className="success-box">
              <div className="success-header">
                <span className="success-icon">✅</span>
                <h3>Grievance Submitted!</h3>
              </div>
              <p className="copy-warning">
                ⚠️ Please <strong>copy and save</strong> your Tracking ID
              </p>

              <div className="tracking-display">
                <div className="tracking-id-box">
                  <span className="tracking-label">Tracking ID:</span>
                  <code className="tracking-code">{submittedId}</code>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(submittedId);
                    alert("Tracking ID copied!");
                  }}
                >
                  📋 Copy
                </button>
              </div>

              <p className="info-text">
                Use this ID to track your grievance status.
              </p>
              
              <button 
                className="new-btn"
                onClick={() => setSubmittedId("")}
              >
                + Submit Another
              </button>
            </div>
          )}

          {/* User Selection */}
          {!submittedId && !userType && (
            <div className="user-select">
              <div className="select-title">
                <span className="step-number">1</span>
                <h3>Select Your Role</h3>
              </div>
              <p className="select-desc">Choose your role to proceed</p>
              <div className="role-options">
                <button 
                  className="role-btn student-btn"
                  onClick={() => setUserType("Student")}
                >
                  🎓 Student
                </button>
                <button 
                  className="role-btn teacher-btn"
                  onClick={() => setUserType("Teacher")}
                >
                  👨‍🏫 Teacher
                </button>
              </div>
            </div>
          )}

          {/* Grievance Form */}
          {!submittedId && userType && (
            <form onSubmit={submitGrievance} className="grievance-form">
              <div className="form-header">
                <button 
                  type="button" 
                  className="back-btn"
                  onClick={() => setUserType("")}
                >
                  ← Back
                </button>
                <h3>Fill Grievance Details</h3>
              </div>

              {userType === "Student" && (
                <>
                  <div className="form-group">
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      required
                      className="form-select"
                    >
                      <option value="">Select Category</option>
                      <option>Book Availability</option>
                      <option>Facility Issues</option>
                      <option>Library Hours</option>
                      <option>Staff Behaviour</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {form.category === "Other" && (
                    <div className="form-group">
                      <input
                        name="subject"
                        value={form.subject}
                        placeholder="Subject"
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <select
                      name="course"
                      value={form.course}
                      onChange={handleChange}
                      required
                      className="form-select"
                    >
                      <option value="">Select Course</option>
                      <option>General</option>
                      <option>Honours</option>
                    </select>
                  </div>
                </>
              )}

              <div className="form-group">
                <input
                  name="name"
                  value={form.name}
                  placeholder="Name"
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <input
                  name="phone"
                  value={form.phone}
                  placeholder="Phone"
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  placeholder="Email"
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <input
                  name="department"
                  value={form.department}
                  placeholder="Department"
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <textarea
                  name="query"
                  value={form.query}
                  placeholder="Describe your grievance in detail..."
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  rows="5"
                />
              </div>

              <button type="submit" className="submit-btn">
                Submit Grievance
              </button>
            </form>
          )}
        </div>

        {/* RIGHT : TRACKING */}
        <div className="grievance-right">
          <div className="tracking-card">
            <div className="tracking-header">
              <h3>🔍 Track Your Grievance</h3>
              <p>Enter your Tracking ID to check status</p>
            </div>

            <div className="tracking-input-container">
              <input
                placeholder="Enter Tracking ID"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="tracking-input"
              />
              {trackingId && (
                <button 
                  className="clear-tracking"
                  onClick={clearTracking}
                  title="Clear"
                >
                  ✕
                </button>
              )}
            </div>
            
            <button onClick={track} className="track-btn">
              Check Status
            </button>

            {result && (
              <div className="track-result">
                <div className="result-header">
                  <h4>Status Details</h4>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: statusColors[result.status] || '#95a5a6' }}
                  >
                    {result.status}
                  </span>
                </div>
                
                <div className="result-content">
                  <div className="result-row">
                    <span className="result-label">Tracking ID:</span>
                    <code className="result-value">{result.trackingId}</code>
                  </div>
                  <div className="result-row">
                    <span className="result-label">Name:</span>
                    <span className="result-value">{result.name}</span>
                  </div>
                  <div className="result-row">
                    <span className="result-label">Department:</span>
                    <span className="result-value">{result.department}</span>
                  </div>
                  
                  <div className="grievance-text">
                    <strong>Grievance:</strong>
                    <p>{result.query}</p>
                  </div>
                  
                  {result.reply && (
                    <div className="reply-box">
                      <div className="reply-header">
                        <strong>📝 Reply:</strong>
                      </div>
                      <p>{result.reply}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Help Section */}
            <div className="help-section">
              <h4>💡 Need Help?</h4>
              <ul>
                <li>Forgot Tracking ID? Contact library desk</li>
                <li>Status not updating? Wait 24 hours</li>
                <li>Email: vcfwlibrary@gmail.com</li>
              </ul>
            </div>

            {/* Status Legend */}
            <div className="status-legend">
              <h4>📊 Status Meaning</h4>
              <div className="legend-items">
                <div className="legend-item">
                  <span className="dot pending"></span>
                  <span>Pending</span>
                </div>
                <div className="legend-item">
                  <span className="dot in-progress"></span>
                  <span>In Progress</span>
                </div>
                <div className="legend-item">
                  <span className="dot resolved"></span>
                  <span>Resolved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}