import { Link } from "react-router-dom";
import {
  FaArrowLeft, 
  FaGraduationCap,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaResearchgate,
  FaCertificate,
  FaGlobe,
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaPlane,
  FaBriefcase,
  FaChalkboardTeacher,
  FaIdCard,
  FaTrophy,
  FaCertificate,
  FaGlobeAmericas,
} from "react-icons/fa/index.js";
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
                <img 
                  src={librarian2} 
                  alt="Dr. Sukanta Kumar Patra" 
                />
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
                Senior Librarian & International Researcher with 15+ years of experience in 
                academic librarianship, digital libraries, and research support services.
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
                <a href="https://www.linkedin.com/in/sukanta-kumar-patra-a8748046" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="profile-link">
                  <FaLinkedin /> LinkedIn Profile
                </a>
                <a href="https://vidwan.inflibnet.ac.in/profile/427265" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="profile-link">
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

      {/* Main Content */}
      <div className="container">
        <div className="profile-grid">
          {/* Sidebar */}
          <div className="academic-sidebar">
            {/* Education Timeline */}
            <div className="sidebar-card">
              <h3>
                <FaGraduationCap />
                Academic Journey
              </h3>
              <div className="education-timeline">
                <div className="timeline-item">
                  <div className="timeline-year">2023</div>
                  <div className="timeline-content">
                    <h4>MA in History</h4>
                    <div className="institution">Netaji Subhas Open University</div>
                    <div className="grade">81.13% (1st Division)</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2019</div>
                  <div className="timeline-content">
                    <h4>MBA (Human Resource)</h4>
                    <div className="institution">Pondicherry University</div>
                    <div className="grade">58.19% (2nd Division)</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2017</div>
                  <div className="timeline-content">
                    <h4>PhD Awarded</h4>
                    <div className="institution">Rabindra Bharati University</div>
                    <div className="grade">Library & Information Science</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2010</div>
                  <div className="timeline-content">
                    <h4>MPhil</h4>
                    <div className="institution">University of Kalyani</div>
                    <div className="grade">68.5% (1st Division)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Awards */}
            <div className="sidebar-card">
              <h3>
                <FaTrophy />
                Awards & Recognition
              </h3>
              <ul className="awards-list">
                <li>
                  <FaStar />
                  <span>Academic Excellence Award 2024</span>
                </li>
                <li>
                  <FaStar />
                  <span>Gold Medal (1st Class 1st in BLIS)</span>
                </li>
                <li>
                  <FaStar />
                  <span>Tinkari Dutta Syraak Padak</span>
                </li>
                <li>
                  <FaPlane />
                  <span>IASA Travel Grant 2025</span>
                </li>
                <li>
                  <FaPlane />
                  <span>CSIR Travel Grant - ETD 2017</span>
                </li>
              </ul>
            </div>

            {/* Conference Map */}
            <div className="sidebar-card">
              <h3>
                <FaGlobe />
                Global Conferences
              </h3>
              <div className="conference-visual">
                <div className="location-dot usa" title="ETD 2017, Washington DC">
                  <FaPlane />
                </div>
                <div className="location-dot taiwan" title="ETD 2018, Taiwan">
                  <FaPlane />
                </div>
                <div className="location-dot portugal" title="ETD 2019, Portugal">
                  <FaPlane />
                </div>
                <div className="location-dot serbia" title="ETD 2022, Serbia">
                  <FaPlane />
                </div>
                <div className="location-dot thailand" title="SEAPAVAA 2023, Thailand">
                  <FaPlane />
                </div>
                <div className="location-dot hawaii" title="IASA 2025, Hawaii">
                  <FaPlane />
                </div>
              </div>
              <p style={{fontSize: '0.9rem', color: 'var(--text-light)', textAlign: 'center'}}>
                Presented research in 6 countries across 3 continents
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content">
            {/* Professional Experience - Enhanced */}
            <section className="experience-section">
              <div className="section-header">
                <FaBriefcase className="section-icon" />
                <h2>Professional Experience</h2>
              </div>
              
              <div className="experience-cards">
                <div className="exp-card current">
                  <div className="exp-header">
                    <div className="exp-title">
                      <h3>Librarian (UGC Scale)</h3>
                      <span className="exp-badge">Current Position</span>
                    </div>
                    <div className="exp-period">March 2020 - Present</div>
                  </div>
                  <div className="exp-institution">Vidyasagar College for Women, Kolkata</div>
                  <div className="exp-details">
                    <p>• Pay Scale: ₹15600-39100, AGP: ₹6000</p>
                    <p>• Leading digital transformation of library services</p>
                    <p>• Managing collection development and research support</p>
                    <p>• Supervising library staff and operations</p>
                  </div>
                </div>

                <div className="exp-card">
                  <div className="exp-header">
                    <div className="exp-title">
                      <h3>Assistant Librarian (Gr-II)</h3>
                    </div>
                    <div className="exp-period">May 2010 - March 2020</div>
                  </div>
                  <div className="exp-institution">Jadavpur University, Kolkata</div>
                  <div className="exp-details">
                    <p>• 10 years of service in premier technical university</p>
                    <p>• Managed digital resources and e-journals</p>
                    <p>• Provided research support to faculty and students</p>
                    <p>• Conducted information literacy workshops</p>
                  </div>
                </div>

                <div className="exp-card">
                  <div className="exp-header">
                    <div className="exp-title">
                      <h3>Guest Teacher</h3>
                    </div>
                    <div className="exp-period">2014 - Present</div>
                  </div>
                  <div className="exp-institution">Department of Library & Information Science, Rabindra Bharati University</div>
                  <div className="exp-details">
                    <p>• Teaching advanced LIS courses</p>
                    <p>• Academic guidance and research supervision</p>
                    <p>• Curriculum development and evaluation</p>
                  </div>
                </div>

                <div className="exp-card">
                  <div className="exp-header">
                    <div className="exp-title">
                      <h3>Academic Counsellor</h3>
                    </div>
                    <div className="exp-period">2004 - Present</div>
                  </div>
                  <div className="exp-institution">IGNOU & E-Vidyabharti (Including African Chapter)</div>
                  <div className="exp-details">
                    <p>• Distance education program coordination</p>
                    <p>• Student counselling and support</p>
                    <p>• Academic material development</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Research & Publications */}
            <section className="research-section">
              <div className="section-header">
                <FaResearchgate className="section-icon" />
                <h2>Research & Publications</h2>
              </div>
              
              <div className="publication-stats">
                <div className="pub-stat-card">
                  <div className="pub-stat-number">20+</div>
                  <div className="pub-stat-label">Research Articles</div>
                  <div className="pub-stat-desc">Peer-reviewed journals</div>
                </div>
                <div className="pub-stat-card">
                  <div className="pub-stat-number">7</div>
                  <div className="pub-stat-label">Book Chapters</div>
                  <div className="pub-stat-desc">Edited volumes</div>
                </div>
                <div className="pub-stat-card">
                  <div className="pub-stat-number">15+</div>
                  <div className="pub-stat-label">Conference Papers</div>
                  <div className="pub-stat-desc">National & International</div>
                </div>
                <div className="pub-stat-card">
                  <div className="pub-stat-number">6</div>
                  <div className="pub-stat-label">Countries</div>
                  <div className="pub-stat-desc">Presented research</div>
                </div>
              </div>

              <div className="publication-highlights">
                <h4>Selected Publications:</h4>
                <ul className="pub-list">
                  <li>
                    <FaBook className="pub-icon" />
                    <span>"Harvesting ETD Metadata from 'Shodhganga' to National Digital Library of India" - RBU Journal of Library and Information Science, Vol.25 (2023)</span>
                  </li>
                  <li>
                    <FaBook className="pub-icon" />
                    <span>"University Ranking Parameters for Research and Present status of Shodhganga in Digital India" - University News, Vol.55, no.51 (2017)</span>
                  </li>
                  <li>
                    <FaBook className="pub-icon" />
                    <span>"Information needs and usage pattern in Hindu religious libraries of Kolkata: a case study" - RBU Journal of Library and Information Science, Vol.17 (2015)</span>
                  </li>
                  <li>
                    <FaBook className="pub-icon" />
                    <span>"Public Libraries as academic agent in the light of UN 2030 sustainable development goals" - National Seminar Proceedings (2019)</span>
                  </li>
                  <li>
                    <FaBook className="pub-icon" />
                    <span>"Digital Curation: steps towards cultural heritage in digital India" - Edited Volume (2017)</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Professional Memberships */}
            <section className="membership-section">
              <div className="section-header">
                <FaIdCard className="section-icon" />
                <h2>Professional Affiliations</h2>
              </div>
              
              <div className="membership-grid">
                <div className="membership-card">
                  <div className="membership-icon">📚</div>
                  <div className="membership-content">
                    <h4>Life Member</h4>
                    <p>Indian Library Association</p>
                  </div>
                </div>
                <div className="membership-card">
                  <div className="membership-icon">🌐</div>
                  <div className="membership-content">
                    <h4>Member</h4>
                    <p>ETD Formatting Group, NDLTD, USA</p>
                  </div>
                </div>
                <div className="membership-card">
                  <div className="membership-icon">📰</div>
                  <div className="membership-content">
                    <h4>Member</h4>
                    <p>NASIG Students Outreach Programme, USA</p>
                  </div>
                </div>
                <div className="membership-card">
                  <div className="membership-icon">👨‍🏫</div>
                  <div className="membership-content">
                    <h4>Academic Counsellor</h4>
                    <p>E-Vidyabharti, IGNOU African Chapter</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="profile-footer">
          <div className="footer-content">
            <div className="footer-info">
              <h4>Academic Credentials Verified</h4>
              <p>All information based on official biodata document</p>
              <p className="update-date">Last Updated: November 6, 2025</p>
            </div>
            <Link to="/" className="home-btn">
              <FaArrowLeft /> Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrSukantaPatra;