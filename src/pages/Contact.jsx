import React, { useState, useEffect } from "react";
import "./Contact.css";

function Contact() {
  const [activeContact, setActiveContact] = useState("email");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animations
    setIsVisible(true);
    
    // Add scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.observe-me').forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const handleContactClick = (type, value) => {
    setActiveContact(type);
    
    // Add subtle click feedback
    const card = document.querySelector(`.contact-card[data-type="${type}"]`);
    if (card) {
      card.classList.add('clicked');
      setTimeout(() => card.classList.remove('clicked'), 300);
    }
    
    // Handle actions
    if (type === 'phone') {
      window.open(`tel:${value}`);
    } else if (type === 'email') {
      window.open(`mailto:${value}`);
    } else if (type === 'address') {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`;
      window.open(mapsUrl, '_blank');
    }
  };

  const contactInfo = [
    {
      type: "phone",
      primary: "033-22410114",
      secondary: "Main Library Line",
      icon: "📞",
      label: "Telephone",
      accentColor: "#2c5aa0"
    },
    {
      type: "email",
      primary: "library@vcfw.org",
      secondary: "library.vcfw@gmail.com",
      icon: "✉️",
      label: "Email",
      accentColor: "#d35400"
    },
    {
      type: "address",
      primary: "Vidyasagar College for Women",
      secondary: "39, Sankar Ghosh Lane, Kolkata – 700006",
      icon: "📍",
      label: "Address",
      accentColor: "#27ae60"
    },
    {
      type: "hours",
      primary: "Mon-Sat: 8:00 AM - 2:00 PM",
      secondary: "Sunday: Closed",
      icon: "⏰",
      label: "Hours",
      accentColor: "#8e44ad"
    }
  ];

  const libraryServices = [
    {
      name: "Research Assistance",
      description: "Academic research support and guidance",
      icon: "📚",
      extension: "Ext. 101"
    },
    {
      name: "Digital Resources",
      description: "E-journals, databases, and e-books",
      icon: "💻",
      extension: "Ext. 102"
    },
    {
      name: "Circulation Desk",
      description: "Book borrowing and returns",
      icon: "📖",
      extension: "Ext. 103"
    },
    {
      name: "Reference Section",
      description: "Reference materials and periodicals",
      icon: "📰",
      extension: "Ext. 104"
    }
  ];

  const quickAccess = [
    {
      title: "Digital Library Portal",
      url: "#",
      icon: "🌐",
      badge: "Online"
    },
    {
      title: "Library Catalog",
      url: "#",
      icon: "📋",
      badge: "Search"
    },
    {
      title: "E-Resources",
      url: "#",
      icon: "🔗",
      badge: "Access"
    },
    {
      title: "Library Blog",
      url: "https://libraryvcfw.blogspot.com/",
      icon: "📝",
      badge: "Updates"
    }
  ];

  return (
    <div className={`contact-page ${isVisible ? 'page-loaded' : ''}`}>
      {/* Subtle Background Pattern */}
      <div className="academic-pattern"></div>

      <div className="contact-container">
        {/* Professional Header */}
        <header className="contact-header observe-me">
          <div className="university-badge">
            <div className="badge-icon">🏛️</div>
            <div className="badge-text">
              <span className="university-name">Vidyasagar College for Women</span>
              <span className="department-name">Library Department</span>
            </div>
          </div>
          
          <div className="header-content">
            <h1 className="contact-title">
              <span className="title-line">Library</span>
              <span className="title-line accent">Contact & Information</span>
            </h1>
            <div className="header-divider"></div>
            <p className="contact-subtitle">
              Academic support, resources access, and institutional communication
            </p>
          </div>
        </header>

        {/* Primary Contact Grid */}
        <section className="primary-contact-section">
          <div className="section-intro observe-me">
            <h2 className="section-title">
              <span className="section-number">01</span>
              <span className="section-text">Primary Contacts</span>
            </h2>
            <p className="section-description">
              Direct channels for academic inquiries and library services
            </p>
          </div>

          <div className="contact-grid">
            {contactInfo.map((contact, index) => (
              <div
                key={contact.type}
                data-type={contact.type}
                className={`contact-card observe-me ${activeContact === contact.type ? 'active' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleContactClick(contact.type, contact.primary)}
              >
                <div className="card-border" style={{ borderColor: contact.accentColor }}></div>
                <div className="card-content">
                  <div className="card-icon-container">
                    <div className="icon-wrapper" style={{ backgroundColor: `${contact.accentColor}15` }}>
                      <span className="card-icon" style={{ color: contact.accentColor }}>
                        {contact.icon}
                      </span>
                    </div>
                    <div className="status-indicator"></div>
                  </div>
                  
                  <div className="card-details">
                    <h3 className="card-label">{contact.label}</h3>
                    <p className="card-primary">{contact.primary}</p>
                    <p className="card-secondary">{contact.secondary}</p>
                  </div>
                  
                  <div className="card-action">
                    <span className="action-text">
                      {contact.type === 'phone' ? 'Call Now' : 
                       contact.type === 'email' ? 'Send Email' : 
                       contact.type === 'address' ? 'View Location' : 'View Schedule'}
                    </span>
                    <div className="action-arrow">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" 
                              stroke="currentColor" 
                              strokeWidth="1.5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Content Layout */}
        <div className="main-layout">
          {/* Left Column - Map */}
          <div className="layout-column map-column observe-me">
            <div className="location-card">
              <div className="card-header">
                <div className="header-main">
                  <h3 className="card-title">
                    <span className="title-icon">📍</span>
                    Campus Location
                  </h3>
                  <span className="location-badge">Main Campus</span>
                </div>
                <p className="card-subtitle">
                  Vidyasagar College for Women, Kolkata
                </p>
              </div>

              <div className="map-container">
                <div className="map-wrapper">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.520742391523!2d88.36332167591392!3d22.56064863332268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027713edea8a5b%3A0xcf7c12b6c16fb2f0!2sVidyasagar%20College%20for%20Women!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    className="contact-map"
                    title="Campus Location"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                
                <div className="location-details">
                  <div className="detail-item">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">39, Sankar Ghosh Lane, Kolkata – 700006</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Nearest Metro:</span>
                    <span className="detail-value">Central Station (1.2 km)</span>
                  </div>
                  <button 
                    className="directions-button"
                    onClick={() => window.open('https://maps.google.com?q=Vidyasagar+College+for+Women+Kolkata', '_blank')}
                  >
                    Get Directions
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Library Hours */}
            <div className="hours-card observe-me">
              <div className="card-header">
                <h3 className="card-title">
                  <span className="title-icon">⏰</span>
                  Operating Hours
                </h3>
              </div>
              
              <div className="hours-grid">
                <div className="day-slot">
                  <span className="day">Monday - Friday</span>
                  <div className="time-range">
                    <span className="time">8:00 AM</span>
                    <span className="time-separator">-</span>
                    <span className="time">2:00 PM</span>
                  </div>
                </div>
                <div className="day-slot">
                  <span className="day">Saturday</span>
                  <div className="time-range">
                    <span className="time">8:00 AM</span>
                    <span className="time-separator">-</span>
                    <span className="time">2:00 PM</span>
                  </div>
                </div>
                <div className="day-slot closed">
                  <span className="day">Sunday</span>
                  <span className="status">Closed</span>
                </div>
              </div>
              
              <div className="hours-note">
                <span className="note-icon">ℹ️</span>
                Extended hours during examination periods
              </div>
            </div>
          </div>

          {/* Right Column - Services & Information */}
          <div className="layout-column info-column">
            {/* Library Services */}
            <div className="services-card observe-me">
              <div className="card-header">
                <h3 className="card-title">
                  <span className="title-icon">🏛️</span>
                  Library Services
                </h3>
                <p className="card-subtitle">
                  Department-specific contacts and support
                </p>
              </div>
              
              <div className="services-grid">
                {libraryServices.map((service, index) => (
                  <div key={index} className="service-item">
                    <div className="service-icon">{service.icon}</div>
                    <div className="service-details">
                      <h4 className="service-name">{service.name}</h4>
                      <p className="service-description">{service.description}</p>
                    </div>
                    <div className="service-contact">
                      <span className="contact-extension">{service.extension}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Access */}
            <div className="access-card observe-me">
              <div className="card-header">
                <h3 className="card-title">
                  <span className="title-icon">⚡</span>
                  Quick Access
                </h3>
              </div>
              
              <div className="access-grid">
                {quickAccess.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="access-item"
                  >
                    <div className="access-icon">{item.icon}</div>
                    <div className="access-content">
                      <span className="access-title">{item.title}</span>
                      <span className="access-badge">{item.badge}</span>
                    </div>
                    <div className="access-arrow">→</div>
                  </a>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="emergency-card observe-me">
              <div className="card-header">
                <h3 className="card-title">
                  <span className="title-icon">🚨</span>
                  Urgent Matters
                </h3>
              </div>
              
              <div className="emergency-content">
                <div className="emergency-contact">
                  <div className="contact-info">
                    <h4>Librarian Office</h4>
                    <p className="contact-number">033-22410114</p>
                  </div>
                  <div className="contact-note">
                    For urgent library matters requiring immediate attention
                  </div>
                </div>
                
                <div className="emergency-guidelines">
                  <div className="guideline">
                    <span className="guideline-icon">📧</span>
                    <span>Email with "URGENT" in subject line</span>
                  </div>
                  <div className="guideline">
                    <span className="guideline-icon">⏰</span>
                    <span>Response within 2 hours during working days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Calendar */}
            <div className="calendar-card observe-me">
              <div className="card-header">
                <h3 className="card-title">
                  <span className="title-icon">📅</span>
                  Academic Schedule
                </h3>
              </div>
              
              <div className="calendar-events">
                <div className="event-item upcoming">
                  <div className="event-date">
                    <span className="date-month">FEB</span>
                    <span className="date-day">15</span>
                  </div>
                  <div className="event-details">
                    <h4>Library Orientation</h4>
                    <p>New student induction program</p>
                  </div>
                </div>
                <div className="event-item">
                  <div className="event-date">
                    <span className="date-month">MAR</span>
                    <span className="date-day">01</span>
                  </div>
                  <div className="event-details">
                    <h4>Resource Training</h4>
                    <p>Digital resources workshop</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Footer */}
        <footer className="contact-footer observe-me">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-icon">📚</span>
                <div className="logo-text">
                  <h4>VCFW Library</h4>
                  <p>Established 1950</p>
                </div>
              </div>
              <p className="footer-mission">
                Supporting academic excellence through comprehensive library services
              </p>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-title">Information</h4>
              <div className="footer-links">
                <a href="#" className="footer-link">Library Policies</a>
                <a href="#" className="footer-link">Resource Guides</a>
                <a href="#" className="footer-link">Research Support</a>
                <a href="#" className="footer-link">Digital Access</a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-title">Connect</h4>
              <div className="footer-contacts">
                <div className="footer-contact">
                  <span className="contact-icon">📞</span>
                  <span>033-22410114</span>
                </div>
                <div className="footer-contact">
                  <span className="contact-icon">✉️</span>
                  <span>library@vcfw.org</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="copyright">
              © {new Date().getFullYear()} Vidyasagar College for Women Library
            </div>
            <div className="footer-info">
              <span className="info-item">Last Updated: February 2024</span>
              <span className="info-divider">•</span>
              <span className="info-item">Version 2.1</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Contact;