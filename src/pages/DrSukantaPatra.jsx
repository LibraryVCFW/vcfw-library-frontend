import { Link } from "react-router-dom";

/* ===== ICONS (ONLY fa6, NO DUPLICATES) ===== */
import {
  FaArrowLeft,
  FaGraduationCap,
  FaLinkedin,
  FaResearchgate,
  FaCertificate,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPlane,
  FaBriefcase,
  FaIdCard,
  FaTrophy,
  FaStar,
  FaBook,
} from "react-icons/fa";


/* ===== ASSETS ===== */
import "./Patra.css";
import librarian2 from "../assets/team/librarian2.jpeg";

function DrSukantaPatra() {
  return (
    <div className="dr-patras-profile">
      {/* Hero Section */}
      <div className="profile-hero">
        <div className="container">
          <Link to="/" className="back-home-btn">
            <FaArrowLeft /> Back to Home
          </Link>

          <div className="hero-content">
            <div className="hero-image-wrapper">
              <div className="image-frame">
                <img src={librarian2} alt="Dr. Sukanta Kumar Patra" />
                <div className="academic-badge">
                  <FaStar />
                  <span>Librarian</span>
                </div>
              </div>
            </div>

            <div className="hero-info">
              <h1>
                Dr. Sukanta Kumar Patra
                <span className="title-underline"></span>
              </h1>

              <p className="hero-subtitle">
                Senior Librarian & International Researcher with 15+ years of
                experience in academic librarianship, digital libraries, and
                research support services.
              </p>

              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-number">20+</div>
                  <div className="hero-stat-label">Publications</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number">6</div>
                  <div className="hero-stat-label">Countries</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number">8</div>
                  <div className="hero-stat-label">Awards</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number">15+</div>
                  <div className="hero-stat-label">Years Exp.</div>
                </div>
              </div>

              <div className="hero-contact">
                <div className="contact-item">
                  <FaEnvelope />
                  <span>skpatra1977@gmail.com</span>
                </div>
                <div className="contact-item">
                  <FaPhone />
                  <span>+91 98833 96086 / +91 98315 67273</span>
                </div>
                <div className="contact-item">
                  <FaMapMarkerAlt />
                  <span>Vidyasagar College for Women, Kolkata</span>
                </div>
              </div>

              <div className="hero-links">
                <a
                  href="https://www.linkedin.com/in/sukanta-kumar-patra-a8748046"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-link"
                >
                  <FaLinkedin /> LinkedIn Profile
                </a>

                <a
                  href="https://vidwan.inflibnet.ac.in/profile/427265"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-link"
                >
                  <FaIdCard /> VIDWAN Profile
                </a>

                <div className="orcid-badge">
                  <FaCertificate />
                  <span>ORCID: 0000-0003-1881-5307</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container">
        <div className="profile-grid">
          {/* Sidebar */}
          <div className="academic-sidebar">
            <div className="sidebar-card">
              <h3>
                <FaGraduationCap /> Academic Journey
              </h3>
              {/* education timeline unchanged */}
            </div>

            <div className="sidebar-card">
              <h3>
                <FaTrophy /> Awards & Recognition
              </h3>
            </div>

            <div className="sidebar-card">
              <h3>
                <FaGlobe /> Global Conferences
              </h3>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content">
            <section className="experience-section">
              <div className="section-header">
                <FaBriefcase className="section-icon" />
                <h2>Professional Experience</h2>
              </div>
            </section>

            <section className="research-section">
              <div className="section-header">
                <FaResearchgate className="section-icon" />
                <h2>Research & Publications</h2>
              </div>

              <ul className="pub-list">
                <li>
                  <FaBook /> Harvesting ETD Metadata from Shodhganga (2023)
                </li>
              </ul>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="profile-footer">
          <Link to="/" className="home-btn">
            <FaArrowLeft /> Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DrSukantaPatra;
