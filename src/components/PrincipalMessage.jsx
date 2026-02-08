import "./PrincipalMessage.css";
import { FaQuoteLeft, FaUniversity, FaStar } from "react-icons/fa";

export default function PrincipalMessage() {
  const principalImageUrl = "https://vcfw.org/images/principal.jpg";
  
  return (
    <div className="principal-message-wrapper">
      <div className="principal-message-card">
        {/* Left Side - Photo & Badge */}
        <div className="principal-portrait">
          <div className="portrait-frame">
            <div className="portrait-glow"></div>
            <img 
              src={principalImageUrl} 
              alt="Dr. Sutapa Roy"
              className="portrait-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
              }}
            />
            <div className="portrait-border"></div>
            <div className="badge">
              <FaStar className="badge-icon" />
              <span>Principal</span>
            </div>
          </div>
          
          <div className="principal-details">
            <h3 className="principal-name">Dr. Sutapa Roy</h3>
            <div className="institution">
              <FaUniversity />
              <span>Vidyasagar College for Women</span>
            </div>
          </div>
        </div>

        {/* Right Side - Message */}
        <div className="message-side">
          <div className="message-header">
            <div className="header-icon">
              <FaQuoteLeft />
            </div>
            <h2>From The Principal's Desk</h2>
            <div className="header-line"></div>
          </div>
          
          <div className="message-content">
            <p className="salutation">My dear students,</p>
            
            <div className="message-paragraphs">
              <p>
                Welcome to our college library—a sanctuary of learning where knowledge meets character. 
                At Vidyasagar College for Women, we believe education is the light that dispels ignorance 
                and illuminates the path to righteous living.
              </p>
              
              <p>
                This library is more than books—it's a space for your holistic growth. Here, we nurture 
                both your academic excellence and your creative spirit, helping you develop into confident, 
                conscientious women who will make meaningful contributions to society.
              </p>
              
              <p>
                Our dedicated team has created this environment to support your journey of self-discovery. 
                May you find here the inspiration to question, explore, and grow into empowered leaders 
                of tomorrow.
              </p>
            </div>
            
            <div className="signature-block">
              <div className="closing-remark">
                With warm regards and best wishes,
              </div>
              <div className="signature-area">
                <div className="signature-line"></div>
                <div className="signature-text">
                  <strong>Dr. Sutapa Roy</strong>
                  <span>Principal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}