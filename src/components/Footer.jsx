import React, { useEffect, useState } from "react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    // Update Kolkata date/time
    const updateDateTime = () => {
      const now = new Date();
      const options = { 
        timeZone: 'Asia/Kolkata',
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const formatter = new Intl.DateTimeFormat('en-IN', options);
      setCurrentDateTime(formatter.format(now));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    // Visitor counter script - single instance
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://counter1.optistats.ovh/private/counter.js?c=mwwdbfwrujzb6ryd1wy7fp6h5w9regzb&down=async';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      clearInterval(interval);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          
          {/* Left Section: Logo and Address */}
          <div className="footer-left">
            <div className="logo-section">
              <div className="logo-header">
                <span className="logo-icon"></span>
                <div className="logo-content">
                  <h3 className="logo-text">VCFW Library</h3>
                  <p className="motto">Empowering Education</p>
                </div>
              </div>
              <div className="address-info">
                <p>Vidyasagar College for Women</p>
                <p>39, Sankar Ghosh Lane, Kolkata – 700006</p>
                <p className="contact-info">📞 033-22410114 | 📧 library@vcfw.org</p>
              </div>
            </div>
          </div>

          {/* Center Section: Row of 5 Links */}
          <div className="footer-center">
            <div className="links-row">
              <a href="/" className="nav-link">
                <span className="link-text">Home</span>
              </a>
              
              <a 
                href="https://vcfw.in/eshikshak/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="nav-link"
              >
                <span className="link-text">e-Shikshak</span>
              </a>
              
              <a 
                href="https://vcfw.in/oer_portal/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="nav-link"
              >
                <span className="link-text">OER Repository</span>
              </a>
              
              <a 
                href="https://employmentnews.gov.in/NewEmp/Home.aspx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="nav-link"
              >
                <span className="link-text">Emp. News</span>
              </a>
              
              <a 
                href="https://vcfw-opac.l2c2.co.in/cgi-bin/koha/opac-search.pl?q=" 
                target="_blank" 
                rel="noopener noreferrer"
                className="nav-link"
              >
                <span className="link-text">Web OPAC</span>
              </a>
            </div>
          </div>

          {/* Right Section: Stats and Admin */}
          <div className="footer-right">
            <div className="stats-section">
              <div className="stats-header">WEBSITE VISITORS</div>
              <div className="counter-wrapper">
                <div id="sfcmwwdbfwrujzb6ryd1wy7fp6h5w9regzb" className="counter-number">
                  0013386
                </div>
              </div>
            </div>
            
            <a 
              href="/login" 
              target="_blank" 
              rel="noopener noreferrer"
              className="admin-btn"
            >
              <span className="admin-text">🔐Admin</span>
            </a>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="datetime-section">
            <div className="datetime">
              {currentDateTime} (Kolkata)
            </div>
            <div className="copyright">
              © {currentYear} Vidyasagar College for Women Library
            </div>
          </div>
          
          <div className="developer-section">
            <p className="developer">Developed and maintained by <strong>Sattwik Mondal</strong></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;