import "./About.css";

import collegeImg from "../assets/college-building.jpg";
import seminarImg from "../assets/seminar-library.jpeg";
import centralImg from "../assets/central-library.jpg";
import readingRoomImg from "../assets/reading-room.jpg";
import digitalLibraryImg from "../assets/digital-library.jpg";

export default function About() {
  
  const images = {
    college: collegeImg,
    centralLibrary: centralImg,
    seminarLibrary: seminarImg,
    readingRoom: readingRoomImg,
    digitalLibrary: digitalLibraryImg
  };

  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <h1 className="about-hero-title">About Vidyasagar College for Women</h1>
        <p className="about-hero-text">
          Established in 1960, carrying forward the legacy of Pundit Iswar Chandra Vidyasagar
          - a beacon of women's education and empowerment in Kolkata
        </p>
      </section>

      {/* COLLEGE HISTORY */}
      <section className="about-section history-section">
        <div className="history-content">
          <h2 className="section-heading">Historical Journey</h2>
          <div className="history-timeline">
            <div className="timeline-item">
              <div className="timeline-year">1931</div>
              <div className="timeline-content">
                <h3>Inception as Women's Section</h3>
                <p>Separate women's section of Vidyasagar College started to cater to women's educational needs</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">1947</div>
              <div className="timeline-content">
                <h3>Post-War Expansion</h3>
                <p>Regular expansion with new subjects introduced and dedicated faculty team</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">1960</div>
              <div className="timeline-content">
                <h3>Independent College Established</h3>
                <p>Became a full-fledged separate college affiliated to University of Calcutta</p>
              </div>
            </div>
          </div>
          <div className="history-text">
            <p>
              Vidyasagar College for Women was founded in 1960 as a full-fledged separate college 
              affiliated to the University of Calcutta. Its history dates back to 1931 when a 
              separate women's section was started. Classes were held in the morning until 
              temporary closure during World War II.
            </p>
            <p>
              Since 1947, expansion occurred steadily with new subjects introduced and dedicated 
              teachers inspiring growing numbers of students. The college continues the ideals of 
              Pundit Iswar Chandra Vidyasagar, the great 19th-century educationist and social reformer.
            </p>
          </div>
        </div>
        <div className="history-image">
          <img src={images.college} alt="Vidyasagar College for Women Campus" />
          <div className="image-caption">Main Campus - Heart of North Kolkata</div>
        </div>
      </section>

      {/* CAMPUS LOCATION */}
      <section className="about-section location-section">
        <h2 className="section-heading">Strategic Location</h2>
        <p className="location-description">
          All three campuses are located in North Kolkata, the central zone of the Bengal Renaissance, 
          surrounded by prestigious institutions including Calcutta University, Presidency College, 
          Sanskrit College, Scottish Church College, Bethune College, and Victoria College.
        </p>
        <div className="location-highlights">
          <div className="highlight-item">
            <span className="highlight-icon">🎓</span>
            <span className="highlight-text">Neighborhood of Academic Excellence</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-icon">📍</span>
            <span className="highlight-text">Close to Thakurs, Rammohan Roy, Vivekananda residences</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-icon">🏛️</span>
            <span className="highlight-text">Cultural & Historical Hub of Kolkata</span>
          </div>
        </div>
      </section>

      {/* LIBRARIES SECTION */}
      <section className="libraries-section">
        <h2 className="section-heading">Library System</h2>
        <div className="libraries-grid">
          {/* Central Library */}
          <div className="library-card central-library">
            <div className="library-image">
              <img src={images.centralLibrary} alt="Central Library" />
            </div>
            <div className="library-content">
              <h3 className="library-title">Central Library</h3>
              <p className="library-address">8A Shibnarayan Das Lane</p>
              <div className="library-stats">
                <div className="stat">
                  <span className="stat-number">27,946</span>
                  <span className="stat-label">Books</span>
                </div>
                <div className="stat">
                  <span className="stat-number">1,95,000</span>
                  <span className="stat-label">E-books</span>
                </div>
                <div className="stat">
                  <span className="stat-number">6,239</span>
                  <span className="stat-label">E-journals</span>
                </div>
                <div className="stat">
                  <span className="stat-number">41</span>
                  <span className="stat-label">Journals</span>
                </div>
              </div>
              <ul className="library-features">
                <li>Air-conditioned Reading Rooms</li>
                <li>Web OPAC with QR Code Integration</li>
                <li>KOHA Library Management System</li>
                <li>INFLIBNET N-LIST Consortium Access</li>
                <li>Large Stack Room & Search Kiosk</li>
              </ul>
            </div>
          </div>

          {/* Seminar Library */}
          <div className="library-card seminar-library">
            <div className="library-image">
              <img src={images.seminarLibrary} alt="Seminar Library" />
            </div>
            <div className="library-content">
              <h3 className="library-title">Seminar Library</h3>
              <p className="library-space">968.13 sq. ft. • Approximately 5,000 Books</p>
              <div className="library-highlights">
                <div className="highlight">
                  <span className="highlight-icon">📚</span>
                  <span>Primary focus: Humanities Faculty & Students</span>
                </div>
                <div className="highlight">
                  <span className="highlight-icon">💻</span>
                  <span>7 Departmental Workstations with Internet</span>
                </div>
                <div className="highlight">
                  <span className="highlight-icon">🖨️</span>
                  <span>Network Computers with Printers</span>
                </div>
                <div className="highlight">
                  <span className="highlight-icon">⏳</span>
                  <span>Short-term borrowing for faculty & students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIBRARY SERVICES */}
      <section className="services-section">
        <h2 className="section-heading">Library Services</h2>
        <div className="services-grid">
          {/* Reading Services */}
          <div className="service-card">
            <div className="service-icon">📖</div>
            <h3 className="service-title">Reading Services</h3>
            <ul className="service-list">
              <li>Open Access, Wi-Fi enabled air-conditioned reading room</li>
              <li>Seating capacity: 35 people</li>
              <li>Reference books, periodicals, newspaper sections</li>
              <li>Current awareness service</li>
              <li>Audio-visual materials (CD, DVD) access</li>
            </ul>
            <div className="service-image">
              <img src={images.readingRoom} alt="Reading Room" />
            </div>
          </div>

          {/* Lending Services */}
          <div className="service-card">
            <div className="service-icon">📚</div>
            <h3 className="service-title">Lending Services</h3>
            <div className="lending-details">
              <div className="lending-category">
                <h4>Students</h4>
                <p>1 week borrowing period</p>
                <p className="fine">Late return: ₹0.50 per day</p>
              </div>
              <div className="lending-category">
                <h4>Faculty</h4>
                <p>1 month borrowing period</p>
                <p className="fine">Late return: ₹1.00 per day</p>
              </div>
            </div>
            <p className="note">Books can be renewed based on availability</p>
          </div>

          {/* Reprographic Services */}
          <div className="service-card">
            <div className="service-icon">🖨️</div>
            <h3 className="service-title">Reprographic Services</h3>
            <div className="pricing">
              <div className="price-item">
                <span className="service">Photocopy/Print (A4)</span>
                <span className="price">₹1.00 per page</span>
              </div>
              <div className="price-item">
                <span className="service">Scanning</span>
                <span className="price free">Free</span>
              </div>
            </div>
            <ul className="service-features">
              <li>Internet-connected computers linked to photocopy machine</li>
              <li>Print online/offline materials directly</li>
              <li>Photocopy service for library books only</li>
            </ul>
          </div>

          {/* Digital Services */}
          <div className="service-card">
            <div className="service-icon">💻</div>
            <h3 className="service-title">Digital Library Services</h3>
            <ul className="service-list">
              <li>Access to subscribed and open access e-resources</li>
              <li>Cyber library with 20 computer nodes</li>
              <li>Remote access to N-List and other e-resources</li>
              <li>LAN connected computers in central & seminar libraries</li>
            </ul>
            <div className="service-image">
              <img src={images.digitalLibrary} alt="Digital Library" />
            </div>
          </div>

          {/* Additional Services */}
          <div className="service-card">
            <div className="service-icon">📋</div>
            <h3 className="service-title">Additional Services</h3>
            <div className="additional-services">
              <div className="additional-service">
                <h4>Selective Dissemination</h4>
                <p>Previous year question papers provided to students</p>
              </div>
              <div className="additional-service">
                <h4>Download Forms</h4>
                <p>'Books Requisition Form' and 'Journal Requisition Form' available for download</p>
              </div>
              <div className="additional-service">
                <h4>Book Bank Service</h4>
                <p>Special facility for remedial coaching students</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="vision-mission-section">
        <div className="vision-mission-grid">
          <div className="vision-card">
            <div className="icon-wrapper">✨</div>
            <h3>Our Vision</h3>
            <p>
              To become a dynamic knowledge centre that empowers women through
              access to information, technology, and innovative library services.
            </p>
          </div>
          <div className="mission-card">
            <div className="icon-wrapper">🎯</div>
            <h3>Our Mission</h3>
            <ul className="mission-list">
              <li>Support academic programmes of the college</li>
              <li>Promote reading, research, and information literacy</li>
              <li>Provide user-friendly digital and print resources</li>
              <li>Encourage ethical use of information</li>
              <li>Foster intellectual growth and lifelong learning</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}