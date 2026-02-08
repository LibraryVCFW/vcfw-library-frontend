import { useState } from "react";
import "./Feedback.css";

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    userType: "",
    rollNumber: "",
    semester: "",
    email: "",
    staffCooperative: "",
    netStaffCooperative: "",
    titlesAvailable: "",
    nodesAvailable: "",
    xeroxFacility: "",
    internetAccess: "",
    onlineResources: "",
    readingSpace: "",
    catalogArrangement: "",
    visitFrequency: "",
    rating: 0,
    suggestion: ""
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === "radio" && name === "rating") {
      setFormData({
        ...formData,
        [name]: parseInt(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    // Here you would typically send the data to your backend
    alert("Thank you for your feedback! Your response has been submitted.");
    
    // Reset form after submission
    setFormData({
      name: "",
      department: "",
      userType: "",
      rollNumber: "",
      semester: "",
      email: "",
      staffCooperative: "",
      netStaffCooperative: "",
      titlesAvailable: "",
      nodesAvailable: "",
      xeroxFacility: "",
      internetAccess: "",
      onlineResources: "",
      readingSpace: "",
      catalogArrangement: "",
      visitFrequency: "",
      rating: 0,
      suggestion: ""
    });
  };

  return (
    <div className="feedback-page">
      <h2>Library Feedback Form</h2>
      
      <p className="feedback-note">
        Your feedback is valuable to us. Please share your experience and 
        suggestions to help improve library services.
      </p>

      <form className="feedback-form" onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">1. Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">2. Department:</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="userType">3. Type:</label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="rollNumber">4. Roll Number:</label>
              <input
                type="text"
                id="rollNumber"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="semester">5. Semester:</label>
              <input
                type="text"
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">6. Valid Email ID:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Library Services Section */}
        <div className="form-section">
          <h3>Library Services Feedback</h3>
          
          <div className="form-group">
            <label>1. Are the Library Staff co-operative and helpful?</label>
            <select
              name="staffCooperative"
              value={formData.staffCooperative}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-group">
            <label>2. Are the Net Centre staff co-operative and helpful?</label>
            <select
              name="netStaffCooperative"
              value={formData.netStaffCooperative}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-group">
            <label>3. Are the required number of titles in your Subject available in the Library?</label>
            <select
              name="titlesAvailable"
              value={formData.titlesAvailable}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-group">
            <label>4. Are there enough number of nodes available in the Internet Centre?</label>
            <select
              name="nodesAvailable"
              value={formData.nodesAvailable}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-group">
            <label>5. Are you able to make use of Xerox facility in the Library?</label>
            <select
              name="xeroxFacility"
              value={formData.xeroxFacility}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-group">
            <label>6. Are you able to access Internet Centre as and when you require?</label>
            <select
              name="internetAccess"
              value={formData.internetAccess}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-group">
            <label>7. Are you making use of educational online resources?</label>
            <select
              name="onlineResources"
              value={formData.onlineResources}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-group">
            <label>8. Are you satisfied with the available reading space in the Library?</label>
            <select
              name="readingSpace"
              value={formData.readingSpace}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-group">
            <label>9. Are you satisfied with the cataloguing and arrangement of books in the Library?</label>
            <select
              name="catalogArrangement"
              value={formData.catalogArrangement}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-group">
            <label>10. How often do you visit the Library?</label>
            <select
              name="visitFrequency"
              value={formData.visitFrequency}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Regular">Regular</option>
              <option value="Occasionally">Occasionally</option>
              <option value="Never">Never</option>
            </select>
          </div>
        </div>

        {/* Rating and Suggestions Section */}
        <div className="form-section">
          <h3>Overall Rating & Suggestions</h3>
          
          <div className="form-group">
            <label>Overall Rating:</label>
            <div className="rating-container">
              {[1, 2, 3, 4, 5].map((star) => (
                <label key={star} className="rating-star">
                  <input
                    type="radio"
                    name="rating"
                    value={star}
                    checked={formData.rating === star}
                    onChange={handleChange}
                    required
                  />
                  <span className="star">{star}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="suggestion">Suggestion:</label>
            <textarea
              id="suggestion"
              name="suggestion"
              value={formData.suggestion}
              onChange={handleChange}
              rows="4"
              placeholder="Please share your suggestions for improvement..."
            ></textarea>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Submit Feedback</button>
          <button type="button" className="reset-btn" onClick={() => setFormData({
            name: "",
            department: "",
            userType: "",
            rollNumber: "",
            semester: "",
            email: "",
            staffCooperative: "",
            netStaffCooperative: "",
            titlesAvailable: "",
            nodesAvailable: "",
            xeroxFacility: "",
            internetAccess: "",
            onlineResources: "",
            readingSpace: "",
            catalogArrangement: "",
            visitFrequency: "",
            rating: 0,
            suggestion: ""
          })}>Reset Form</button>
        </div>
      </form>
    </div>
  );
}