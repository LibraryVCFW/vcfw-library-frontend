import { useState, useRef } from "react";
import jsPDF from "jspdf";
import "./Internship.css";

export default function Internship() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "Male",
    email: "",
    phone: "",
    address: "",
    qualification: "",
    institution: "",
    startDate: "",
    agree: false,
  });

  const logoRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    
    // Add margin for content
    const marginLeft = 25;
    const marginRight = 25;
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 25;
    
    // Add college logo
    try {
      // For production, you might need to fetch and convert the image
      // Since CORS might be an issue with external URLs, we'll create a fallback
      const logoData = logoRef.current ? logoRef.current.src : null;
      if (logoData) {
        doc.addImage(logoData, 'PNG', marginLeft, yPos, 25, 25);
      } else {
        // Fallback text logo
        doc.setFillColor(26, 35, 126);
        doc.roundedRect(marginLeft, yPos, 25, 25, 3, 3, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.text("VCFW", marginLeft + 12.5, yPos + 15, { align: "center" });
        doc.setTextColor(0, 0, 0);
      }
    } catch (error) {
      console.log("Logo error, using fallback:", error);
      doc.setFillColor(26, 35, 126);
      doc.roundedRect(marginLeft, yPos, 25, 25, 3, 3, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text("VCFW", marginLeft + 12.5, yPos + 15, { align: "center" });
      doc.setTextColor(0, 0, 0);
    }
    
    // College name and details - Adjusted spacing
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("VIDYASAGAR COLLEGE", marginLeft + 35, yPos + 8);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("(Govt. Aided College affiliated to University of Calcutta)", marginLeft + 35, yPos + 15);
    doc.text("8A, Shibnarayan Das Ln, Simla, Machuabazar, Kolkata, West Bengal 700006", marginLeft + 35, yPos + 21);
    doc.setFontSize(9);
    doc.text("Phone: (033) 2350-0000 | Email: library@vcfw.edu.in | Website: www.vcfw.org", marginLeft + 35, yPos + 27);
    
    // Horizontal line
    doc.setDrawColor(26, 35, 126);
    doc.setLineWidth(0.5);
    doc.line(marginLeft, yPos + 33, pageWidth - marginRight, yPos + 33);
    
    yPos += 45;
    
    // Date on top right
    const currentDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Date: ${currentDate}`, pageWidth - marginRight, yPos, { align: "right" });
    
    yPos += 12;
    
    // Application heading
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("APPLICATION FOR LIBRARY INTERNSHIP", pageWidth / 2, yPos, { align: "center" });
    
    yPos += 20;
    
    // To address - Adjusted spacing
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("To,", marginLeft, yPos);
    yPos += 6;
    doc.setFont("helvetica", "bold");
    doc.text("The Principal", marginLeft, yPos);
    yPos += 6;
    doc.text("Vidyasagar College for Women", marginLeft, yPos);
    yPos += 6;
    doc.setFont("helvetica", "normal");
    doc.text("8A, Shibnarayan Das Ln, Simla,", marginLeft, yPos);
    yPos += 6;
    doc.text("Machuabazar, Kolkata, West Bengal 700006", marginLeft, yPos);
    
    yPos += 12;
    
    // Subject
    doc.setFont("helvetica", "bold");
    doc.text("Subject:", marginLeft, yPos);
    doc.setFont("helvetica", "normal");
    doc.text("Request for Acceptance as a Library Intern", marginLeft + 20, yPos);
    
    yPos += 10;
    
    // Salutation
    doc.text("Dear Sir/Madam,", marginLeft, yPos);
    
    yPos += 8;
    
    // Application text - Tightened spacing
    const para1 = `I, ${form.name || "[Your Name]"}, writing to express my keen interest in joining the esteemed library of Vidyasagar College for Women as an intern. I wish to gain practical experience in library management and operations under your institution's guidance. This internship opportunity will help me enhance my knowledge in cataloging, archiving, digital library systems, and assisting students in their academic pursuits. My details are given below:`;
    const para1Lines = doc.splitTextToSize(para1, pageWidth - marginLeft - marginRight);
    doc.text(para1Lines, marginLeft, yPos);
    yPos += (para1Lines.length * 5) + 10;
    
    // Applicant details in a table format - Tightened spacing
    const details = [
      { label: "Full Name:", value: form.name || "_________________" },
      { label: "Date of Birth:", value: form.dob || "_________________" },
      { label: "Gender:", value: form.gender },
      { label: "Email Address:", value: form.email || "_________________" },
      { label: "Phone Number:", value: form.phone || "_________________" },
      { label: "Address:", value: form.address || "_________________" },
      { label: "Highest Qualification:", value: form.qualification || "_________________" },
      { label: "Institution Name:", value: form.institution || "_________________" },
      { label: "Proposed Internship Start Date:", value: form.startDate || "_________________" },
      { label: "Terms and Conditions:", value: form.agree ? "Accepted" : "Not accepted" },
    ];
    
    const labelWidth = 70;
    const valueX = marginLeft + labelWidth;
    const maxValueWidth = pageWidth - marginRight - valueX;
    
    details.forEach((item) => {
      doc.setFont("helvetica", "bold");
      doc.text(item.label, marginLeft, yPos);
      doc.setFont("helvetica", "normal");
      
      const valueLines = doc.splitTextToSize(item.value, maxValueWidth);
      if (valueLines.length > 1) {
        doc.text(valueLines[0], valueX, yPos);
        yPos += 5;
        for (let i = 1; i < valueLines.length; i++) {
          doc.text(valueLines[i], valueX, yPos);
          yPos += 5;
        }
        yPos += 4;
      } else {
        doc.text(item.value, valueX, yPos);
        yPos += 8;
      }
    });
    
    yPos += 8;
    
    // Closing paragraph
    const para2 = "Thank you for considering my application. I look forward to your positive response.";
    doc.text(para2, marginLeft, yPos);
    
    yPos += 15;
    
    // Attachments section
    doc.setFont("helvetica", "bold");
    doc.text("Attachments (to be submitted offline):", marginLeft, yPos);
    yPos += 6;
    doc.setFont("helvetica", "normal");
    doc.text("1. Photocopy of ID proof", marginLeft + 10, yPos);
    yPos += 5;
    doc.text("2. Proof of Latest Qualification", marginLeft + 10, yPos);
    
    yPos += 12;
    
    // Applicant signature area
    doc.text("Yours sincerely,", marginLeft, yPos);
    yPos += 15;
    doc.text("_________________________", marginLeft, yPos);
    yPos += 4;
    doc.setFontSize(8);
    doc.text("(Signature of Applicant)", marginLeft + 30, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.text(`Name: ${form.name || "_________________"}`, marginLeft, yPos);
    
    yPos += 15;
    
    // Official stamp area with college address
    const stampX = pageWidth - marginRight - 80;
    const stampY = yPos - 25;
    
    // Stamp border
    doc.setDrawColor(26, 35, 126);
    doc.setLineWidth(0.3);
    doc.rect(stampX, stampY, 80, 35);
    
    // Stamp text - Tightened spacing
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.text("FOR OFFICE USE ONLY", stampX + 40, stampY + 6, { align: "center" });
    doc.setDrawColor(200, 0, 0);
    doc.setLineWidth(0.2);
    doc.line(stampX + 10, stampY + 8, stampX + 70, stampY + 8);
    
    doc.setFontSize(6.5);
    doc.setFont("helvetica", "normal");
    doc.text("Authorized Stamp & Signature", stampX + 40, stampY + 14, { align: "center" });
    doc.text("Vidyasagar College for Women", stampX + 40, stampY + 18, { align: "center" });
    doc.text("8A, Shibnarayan Das Ln, Simla", stampX + 40, stampY + 22, { align: "center" });
    doc.text("Machuabazar, Kolkata - 700006", stampX + 40, stampY + 26, { align: "center" });
    doc.text("Phone: (033) 2350-0000", stampX + 40, stampY + 30, { align: "center" });
    
    // Footer
    const timestamp = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${timestamp}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: "center" });
    doc.text("Note: This is a computer generated application. Please sign and submit offline.", pageWidth / 2, doc.internal.pageSize.getHeight() - 5, { align: "center" });
    
    // Save PDF
    const fileName = form.name 
      ? `Internship_Application_${form.name.replace(/\s+/g, '_')}.pdf`
      : 'Library_Internship_Application.pdf';
    doc.save(fileName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.agree) {
      alert("Please accept the terms and conditions before submitting.");
      return;
    }

    // Validate required fields
    const requiredFields = ['name', 'dob', 'email', 'phone', 'address'];
    const missingFields = requiredFields.filter(field => !form[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    generatePDF();
    alert("Application submitted successfully! Your PDF is being downloaded.\n\nPlease note: You need to print, sign, and submit this application offline with required documents.");
  };

  return (
    <div className="internship-container">
      {/* Hidden logo for PDF */}
      <img 
        ref={logoRef}
        src="https://vcfw.org/images/vcfw-logo.png" 
        alt="VCFW Logo" 
        style={{ display: 'none' }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231a237e'/%3E%3Ctext x='50' y='60' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3EVCFW%3C/text%3E%3C/svg%3E";
        }}
      />

      {/* Visible header with logo */}
      <div className="official-header">
        <div className="logo-container">
          <img 
            src="https://vcfw.org/images/vcfw-logo.png" 
            alt="Vidyasagar College for Women Logo" 
            className="college-logo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231a237e'/%3E%3Ctext x='50' y='60' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3EVCFW%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
        <div className="college-header">
          <h1>VIDYASAGAR COLLEGE FOR WOMEN</h1>
          <h2>(Govt. Aided College affiliated to University of Calcutta)</h2>
          <p className="college-address">8A, Shibnarayan Das Ln, Simla, Machuabazar, Kolkata, West Bengal 700006</p>
          <p className="college-contact">Phone: (033) 2350-0000 | Email: library@vcfw.edu.in | Website: www.vcfw.org</p>
        </div>
      </div>

      <div className="internship-wrapper">
        <div className="application-header">
          <div className="header-content">
            <h2>Library Internship Application Form</h2>
            <p className="subtitle">Fill the form below to generate a formal application letter. Print, sign and submit offline.</p>
          </div>
          <div className="date-display">
            <span className="date-label">Application Date:</span>
            <span className="current-date">{new Date().toLocaleDateString('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="internship-form">
          <div className="form-section">
            <h3><span className="section-icon">👤</span> Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name <span className="required-star">*</span></label>
                <input
                  id="name"
                  name="name"
                  placeholder="Enter your full name (as in official documents)"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date of Birth <span className="required-star">*</span></label>
                <input
                  id="dob"
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address <span className="required-star">*</span></label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number <span className="required-star">*</span></label>
                <input
                  id="phone"
                  name="phone"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3><span className="section-icon">🏠</span> Address & Qualifications</h3>
            <div className="form-group">
              <label htmlFor="address">Complete Address <span className="required-star">*</span></label>
              <textarea
                id="address"
                name="address"
                placeholder="Enter your complete postal address"
                value={form.address}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="qualification">Highest Qualification</label>
                <input
                  id="qualification"
                  name="qualification"
                  placeholder="e.g., B.A., B.Sc., M.Lib., etc."
                  value={form.qualification}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="institution">Institution Name</label>
                <input
                  id="institution"
                  name="institution"
                  placeholder="Name of college/university"
                  value={form.institution}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="startDate">Proposed Internship Start Date</label>
                <input
                  id="startDate"
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3><span className="section-icon">📋</span> Declaration</h3>
            <div className="terms-container">
              <div className="terms-content">
                <h4>Terms & Conditions</h4>
                <ul>
                  <li>Internship duration: Minimum 4 weeks, Maximum 12 weeks</li>
                  <li>Certificate will be issued upon successful completion</li>
                  <li>Interns must maintain 90% attendance and follow all library rules</li>
                  <li>Working hours: 10:00 AM to 4:00 PM (Monday to Friday)</li>
                  <li>Stipend: As per college rules (if applicable)</li>
                  <li>Required documents: ID Proof, Qualification Proof, 2 passport photos</li>
                </ul>
              </div>
              
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    required
                  />
                  <span className="checkmark"></span>
                  I hereby declare that all information provided is true and correct. 
                  I agree to abide by the terms and conditions of the internship program. <span className="required-star">*</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <div className="action-buttons">
              <button type="button" className="btn-preview" onClick={() => {
                if (form.name) {
                  generatePDF();
                } else {
                  alert("Please fill in your name first to preview the PDF");
                }
              }}>
                <span className="btn-icon">👁️</span> Preview PDF
              </button>
              <button type="submit" className="btn-submit">
                <span className="btn-icon">📥</span> Generate & Download PDF
              </button>
            </div>
            <p className="form-note">
              <span className="required-star">*</span> indicates required field. 
              After downloading, print the PDF, sign it, and submit with required documents to Library Office.
            </p>
          </div>
        </form>

        <div className="process-info">
          <h3>📋 Application Process</h3>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h4>Fill Online Form</h4>
              <p>Complete all required fields in the form above</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h4>Generate PDF</h4>
              <p>Download the auto-generated formal application letter</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h4>Print & Sign</h4>
              <p>Print the PDF and sign in the designated area</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h4>Submit Offline</h4>
              <p>Submit signed application with required documents to Library Office</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="page-footer">
        <p>
          <strong>Library Office Hours:</strong> Monday to Friday, 10:00 AM to 4:00 PM | 
          <strong> Contact:</strong> library@vcfw.edu.in | (033) 2350-0000 (Ext. 123)
        </p>
        <p className="footer-note">
          Note: This is an online application generator. Final approval is subject to verification of submitted documents.
        </p>
      </footer>
    </div>
  );
}