import React, { useState } from "react";
import "./onos.css";

const CU_LOGO = "https://www.culibrary.ac.in/assets/images/header_logo.png";
const INDIA_EMBLEM = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Emblem_of_India_%28gold%29.svg/500px-Emblem_of_India_%28gold%29.svg.png?20260116052410";

const OnosPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");

  /* =======================
     ONOS Publisher List
     Source: University of Calcutta Central Library
     ======================= */
  const publishers = [
    { id: 1, name: "AAAS - Science", url: "https://www.science.org/journal/science" },
    { id: 2, name: "ACM Digital Library", url: "https://dl.acm.org" },
    { id: 3, name: "American Chemical Society Journals", url: "https://pubs.acs.org" },
    { id: 4, name: "American Institute of Aeronautics and Astronautics (AIAA) Journals", url: "https://arc.aiaa.org" },
    { id: 5, name: "American Institute of Physics Journals", url: "https://pubs.aip.org" },
    { id: 6, name: "American Mathematical Society Journals", url: "https://www.ams.org/publications/journals" },
    { id: 7, name: "American Physical Society – ALL", url: "https://journals.aps.org" },
    { id: 8, name: "American Society for Microbiology Journals", url: "https://journals.asm.org" },
    { id: 9, name: "Annual Reviews Journals", url: "https://www.annualreviews.org" },
    { id: 10, name: "ASCE Journals Online", url: "https://ascelibrary.org" },
    { id: 11, name: "ASME Journals Online", url: "https://asmedigitalcollection.asme.org" },
    { id: 12, name: "Bentham Science Journals", url: "https://www.benthamscience.com" },
    { id: 13, name: "BMJ Journals", url: "https://journals.bmj.com" },
    { id: 14, name: "Cambridge University Press Journals", url: "https://www.cambridge.org/core/journals" },
    { id: 15, name: "Cold Spring Harbor Laboratory Press Journals", url: "https://cshlpress.com" },
    { id: 16, name: "Elsevier ScienceDirect Journals", url: "https://www.sciencedirect.com" },
    { id: 17, name: "Emerald Publishing Journals", url: "https://www.emerald.com/insight" },
    { id: 18, name: "ICE Publishing Journals", url: "https://www.icevirtuallibrary.com" },
    { id: 19, name: "IEEE Journals", url: "https://ieeexplore.ieee.org" },
    { id: 20, name: "IndianJournals.com", url: "https://www.indianjournals.com" },
    { id: 21, name: "Institute of Physics Journals", url: "https://iopscience.iop.org" },
    { id: 22, name: "Lippincott Williams & Wilkins (Wolters Kluwer)", url: "https://journals.lww.com" },
    { id: 23, name: "Oxford University Press Journals", url: "https://academic.oup.com/journals" },
    { id: 24, name: "Project Muse", url: "https://muse.jhu.edu" },
    { id: 25, name: "Sage Publishing Journals", url: "https://journals.sagepub.com" },
    { id: 26, name: "SPIE Digital Library", url: "https://www.spiedigitallibrary.org" },
    { id: 27, name: "Springer Nature Journals", url: "https://link.springer.com" },
    { id: 28, name: "Taylor & Francis Journals", url: "https://www.tandfonline.com" },
    { id: 29, name: "Thieme Journals", url: "https://www.thieme-connect.com" },
    { id: 30, name: "Wiley Journals", url: "https://onlinelibrary.wiley.com" }
  ];

  /* =======================
     Search Filter
     ======================= */
  const filteredPublishers = publishers.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openPublisher = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="onos-container">
      {/* ================= HEADER ================= */}
      <header className="onos-header">
        <div className="header-content">
          {/* Dual Branding Section */}
          <div className="branding-section">
            <div className="calcutta-branding">
              <div className="logo-container">
                <img src={CU_LOGO} alt="University of Calcutta Logo" className="calcutta-logo" />
                <div className="university-text">
                  <h2 className="university-name">University of Calcutta</h2>
                  <p className="library-name">Central Library</p>
                </div>
              </div>
            </div>
            
            <div className="onos-branding">
              <div className="government-emblem">
                <img src={INDIA_EMBLEM} alt="Government of India Emblem" className="emblem-image" />
                <span className="government-text">Government of India Initiative</span>
              </div>
              <div className="onos-logo">
                <div className="onos-text">
                  <span className="nos">ONOS</span>
                  <span className="full-name">One Nation One Subscription</span>
                </div>
              </div>
            </div>
          </div>

          <h1>Academic Publishers Portal</h1>
          <p className="subtitle">
            Curated by University of Calcutta Central Library • Access to premier academic resources
          </p>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="onos-main">
        {/* Search */}
        <div className="search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search from 30 academic publishers…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <p className="search-info">
            {searchTerm
              ? `Found ${filteredPublishers.length} publisher(s) matching "${searchTerm}"`
              : `Browse all ${publishers.length} publishers from the curated collection`}
          </p>
        </div>

        {/* Table */}
        <div className="table-container">
          <div className="table-header">
            <div className="header-cell">No.</div>
            <div className="header-cell">Publisher Name</div>
            <div className="header-cell">Access</div>
          </div>

          <div className="table-body">
            {filteredPublishers.map((p) => (
              <div className="table-row" key={p.id}>
                <div className="cell sl-cell">{p.id}</div>
                <div className="cell name-cell">{p.name}</div>
                <div className="cell action-cell">
                  <button className="access-button" onClick={() => openPublisher(p.url)}>
                    Visit Publisher
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CALCUTTA UNIVERSITY CREDIT SECTION ================= */}
        <section className="university-credit-section">
          <div className="credit-header">
            <img src={CU_LOGO} alt="University of Calcutta" className="credit-logo" />
            <div>
              <h3>Collection Curated by University of Calcutta</h3>
              <p className="credit-subtitle">Established 1857 • India's first modern university</p>
            </div>
          </div>
          
          <div className="credit-content">
            <p>
              This comprehensive collection of academic publishers is curated and maintained by the 
              <strong> University of Calcutta Central Library</strong> as part of the official 
              <strong> One Nation One Subscription (ONOS)</strong> initiative.
            </p>
            
            <div className="credit-links">
              <a
                href="https://www.culibrary.ac.in/publishers-onos.html"
                target="_blank"
                rel="noopener noreferrer"
                className="credit-link"
              >
                View Official CU ONOS Publisher List →
              </a>
              <a
                href="https://www.culibrary.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="credit-link secondary"
              >
                Visit Central Library Website →
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="onos-footer">
        <div className="footer-content">
          <div className="footer-branding">
            <img src={CU_LOGO} alt="University of Calcutta" className="footer-logo" />
            <div className="footer-text">
              <p className="footer-main">
                © {new Date().getFullYear()} ONOS Portal • Curated by University of Calcutta Central Library
              </p>
              <p className="footer-sub">
                Part of the One Nation One Subscription initiative • Publisher access may require institutional authentication
              </p>
            </div>
          </div>
          
          <div className="footer-emblem">
            <img src={INDIA_EMBLEM} alt="Government of India" className="footer-emblem-img" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OnosPortal;