import React from 'react';
import BreakingNotice from "../components/BreakingNotice";
import NoticeSection from "../components/NoticeSection";
import PrincipalMessage from "../components/PrincipalMessage";
import PageContainer from "../components/PageContainer";
import RanganathanSection from "../components/RanganathanSection";
import AboutLibrary from "../components/AboutLibrary";
import OurTeam from "../components/OurTeam";

import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">
      {/* Floating book decoration */}
      <div className="floating-book">📚</div>
      <div className="floating-book">📖</div>
      <div className="floating-book">📕</div>
      <div className="floating-book">📗</div>
      
      <div className="home-container">
        {/* 1️⃣ TOP STRIP / ANNOUNCEMENT */}
        <BreakingNotice />

        {/* 2️⃣ NOTICE BOARD + LIBRARIAN DESK */}
        <NoticeSection />

        {/* 3️⃣ PRINCIPAL'S MESSAGE */}
        <PrincipalMessage />
        

        <section className="quick-access-section">
  <div className="section-header">
    <h2>
      <span className="header-icon">⚡</span>
      Quick Library Access
      <span className="header-subtitle">Instant access to essential resources</span>
    </h2>
  </div>
  
  <div className="quick-access-grid">
    <a href="https://vcfw-opac.l2c2.co.in/cgi-bin/koha/opac-search.pl?q=a" 
       target="_blank" 
       rel="noopener noreferrer"
       className="quick-access-card web-opac">
      <div className="card-icon-wrapper">
        <span className="card-icon">🔍</span>
        <div className="icon-glow"></div>
      </div>
      <div className="card-content">
        <h3>Web OPAC Search</h3>
        <p>Search library catalog online with advanced filters</p>
      </div>
      <div className="card-badge">Live</div>
      <div className="hover-effect"></div>
    </a>
    
    <a href="https://vcfw.in/oer_portal/" 
       target="_blank" 
       rel="noopener noreferrer"
       className="quick-access-card oer">
      <div className="card-icon-wrapper">
        <span className="card-icon">🗃️</span>
        <div className="icon-glow"></div>
      </div>
      <div className="card-content">
        <h3>OER Repository</h3>
        <p>Open Educational Resources & digital content</p>
      </div>
      <div className="card-badge">Updated</div>
      <div className="hover-effect"></div>
    </a>
    
    <a href="https://vcfw-opac.l2c2.co.in/cgi-bin/koha/opac-page.pl?page_id=62" 
       target="_blank" 
       rel="noopener noreferrer"
       className="quick-access-card papers">
      <div className="card-icon-wrapper">
        <span className="card-icon">📋</span>
        <div className="icon-glow"></div>
      </div>
      <div className="card-content">
        <h3>Question Papers</h3>
        <p>Previous year question papers archive</p>
      </div>
      <div className="card-badge">Archive</div>
      <div className="hover-effect"></div>
    </a>
    
    <a href="https://vcfw.in/eshikshak/" 
       target="_blank" 
       rel="noopener noreferrer"
       className="quick-access-card portal">
      <div className="card-icon-wrapper">
        <span className="card-icon">👩‍🏫</span>
        <div className="icon-glow"></div>
      </div>
      <div className="card-content">
        <h3>E-Shikshak Portal</h3>
        <p>Digital teaching & learning resources</p>
      </div>
      <div className="card-badge">Portal</div>
      <div className="hover-effect"></div>
    </a>
    
    <a href="https://employmentnews.gov.in/NewEmp/Home.aspx" 
       target="_blank" 
       rel="noopener noreferrer"
       className="quick-access-card news">
      <div className="card-icon-wrapper">
        <span className="card-icon">🗞️</span>
        <div className="icon-glow"></div>
      </div>
      <div className="card-content">
        <h3>Employment News</h3>
        <p>Latest job opportunities & career news</p>
      </div>
      <div className="card-badge">External</div>
      <div className="hover-effect"></div>
    </a>
  </div>
</section>
        {/* 5️⃣ MAIN CONTENT */}
        <PageContainer>
          <RanganathanSection />
          <AboutLibrary />
          <OurTeam />
          
          
        </PageContainer>
      </div>
    </div>
  );
}