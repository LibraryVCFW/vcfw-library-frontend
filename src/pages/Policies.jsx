import React, { useState } from "react";
import "./Policies.css";

const Policies = () => {
  const [activeSection, setActiveSection] = useState("laws");

  const libraryLaws = [
    { 
      emoji: "📚",
      title: "Books Are For Use", 
      description: "Maximizing accessibility and utility of library materials for all users." 
    },
    { 
      emoji: "👤",
      title: "Every Reader His/Her Book", 
      description: "Ensuring appropriate resources match every user's needs and interests." 
    },
    { 
      emoji: "🔍",
      title: "Every Book Its Reader", 
      description: "Connecting each resource with its ideal audience through smart cataloging." 
    },
    { 
      emoji: "⏱️",
      title: "Save The Time Of The Reader", 
      description: "Efficient organization and service delivery for quick access." 
    },
    { 
      emoji: "🌱",
      title: "The Library Is A Growing Organism", 
      description: "Continuous evolution, expansion, and adaptation of resources and services." 
    }
  ];

  const quickTerms = [
    {
      category: "Library Card",
      emoji: "🪪",
      points: [
        "Non-transferable • Personal responsibility",
        "Must carry at all times • Show on request",
        "Loss report immediately • Rs.5 fine for duplicate"
      ]
    },
    {
      category: "Borrowing Limits",
      emoji: "📖",
      points: [
        "Students: Honors - 3 books | General - 2 books",
        "Teaching Staff: 10 books",
        "Part-time Staff: 5 books | Non-teaching: 3 books"
      ]
    },
    {
      category: "Fines & Penalties",
      emoji: "💰",
      points: [
        "Students: ₹0.50/day after 7 days overdue",
        "Staff: ₹1/day after 2 months overdue",
        "Damaged books: Replacement cost + fine"
      ]
    },
    {
      category: "Access & Conduct",
      emoji: "🤫",
      points: [
        "Silence zones • No food/drinks",
        "Mobile on silent • No smoking",
        "Respect staff • Follow instructions"
      ]
    }
  ];

  const faqItems = [
    { 
      question: "How do I get a Library Card?", 
      answer: "Register with your institutional ID proof and submit one passport-size photo at the Central Library desk.",
      emoji: "🪪"
    },
    { 
      question: "Lost Library Card?", 
      answer: "Submit 'No Dues' certificate from department and pay ₹5 for duplicate card.",
      emoji: "⚠️"
    },
    { 
      question: "Computer Access?", 
      answer: "Available at Central Library & Seminar Library during working hours.",
      emoji: "💻"
    },
    { 
      question: "Off-campus Database Access?", 
      answer: "Register with Librarian for login credentials to access from anywhere.",
      emoji: "🌐"
    },
    { 
      question: "Library Hours?", 
      answer: "8:00 AM to 2:00 PM, Monday to Saturday.",
      emoji: "⏰"
    },
    { 
      question: "Printing & Photocopy?", 
      answer: "₹1 per page. Available at Central Library. Cash payment only.",
      emoji: "🖨️"
    },
    { 
      question: "Can I borrow Journals/CDs?", 
      answer: "No. Reference material stays in library. CDs/DVDs not for loan.",
      emoji: "📰"
    },
    { 
      question: "Pay Fines Where?", 
      answer: "Central Library counter. Cash payment during working hours.",
      emoji: "💸"
    }
  ];

  return (
    <div className="policies-page">
      {/* Animated Background Elements */}
      <div className="floating-books">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="floating-book" style={{ animationDelay: `${i * 0.5}s` }}>
            📚
          </div>
        ))}
      </div>

      <div className="policy-container">
        {/* Header */}
        <header className="policy-header">
          <h1 className="policy-main-title">
            <span className="title-emoji">📚</span>
            Library Policies & Regulations
          </h1>
          <p className="policy-tagline">
            Guiding principles and rules for optimal library experience
          </p>
        </header>

        {/* Navigation */}
        <nav className="policy-nav">
          <button 
            className={`nav-btn ${activeSection === "laws" ? "active" : ""}`}
            onClick={() => setActiveSection("laws")}
          >
            <span className="nav-emoji">📘</span> Five Laws
          </button>
          <button 
            className={`nav-btn ${activeSection === "terms" ? "active" : ""}`}
            onClick={() => setActiveSection("terms")}
          >
            <span className="nav-emoji">⚖️</span> Terms & Conditions
          </button>
          <button 
            className={`nav-btn ${activeSection === "faq" ? "active" : ""}`}
            onClick={() => setActiveSection("faq")}
          >
            <span className="nav-emoji">❓</span> FAQ
          </button>
        </nav>

        {/* Main Content */}
        <main className="policy-main-content">
          
          {/* Five Laws Section */}
          {activeSection === "laws" && (
            <section className="laws-section animated-fadeIn">
              <div className="section-header">
                <h2><span className="section-emoji">📘</span> Five Laws of Library Science</h2>
                <p className="section-subtitle">Foundational principles guiding modern library services</p>
              </div>
              
              <div className="laws-grid">
                {libraryLaws.map((law, index) => (
                  <div className="law-card" key={index}>
                    <div className="law-emoji" style={{ animationDelay: `${index * 0.2}s` }}>
                      {law.emoji}
                    </div>
                    <div className="law-number">0{index + 1}</div>
                    <h3 className="law-title">{law.title}</h3>
                    <p className="law-desc">{law.description}</p>
                    <div className="law-decoration"></div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Terms & Conditions Section */}
          {activeSection === "terms" && (
            <section className="terms-section animated-fadeIn">
              <div className="section-header">
                <h2><span className="section-emoji">⚖️</span> Terms & Conditions</h2>
                <p className="section-subtitle">Essential guidelines for library usage</p>
              </div>

              <div className="terms-grid">
                {quickTerms.map((term, index) => (
                  <div className="term-card" key={index}>
                    <div className="term-emoji">{term.emoji}</div>
                    <h3 className="term-category">{term.category}</h3>
                    <ul className="term-points">
                      {term.points.map((point, idx) => (
                        <li key={idx}>
                          <span className="point-bullet">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="detailed-terms">
                <h3><span className="section-emoji">💡</span> Key Points to Remember</h3>
                <div className="key-points">
                  <div className="key-point">
                    <span className="key-emoji">🔄</span>
                    <div>
                      <strong>Membership:</strong> Renew annually with Fee Book/Joining Letter
                    </div>
                  </div>
                  <div className="key-point">
                    <span className="key-emoji">📅</span>
                    <div>
                      <strong>Borrowing Period:</strong> Students - 14 days | Staff - 30 days
                    </div>
                  </div>
                  <div className="key-point">
                    <span className="key-emoji">📚</span>
                    <div>
                      <strong>Reference Material:</strong> Library use only | No borrowing
                    </div>
                  </div>
                  <div className="key-point">
                    <span className="key-emoji">✅</span>
                    <div>
                      <strong>No Dues Certificate:</strong> Mandatory before exams/retirement
                    </div>
                  </div>
                  <div className="key-point">
                    <span className="key-emoji">📝</span>
                    <div>
                      <strong>Suggestions:</strong> Welcome via suggestion box
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* FAQ Section */}
          {activeSection === "faq" && (
            <section className="faq-section animated-fadeIn">
              <div className="section-header">
                <h2><span className="section-emoji">❓</span> Frequently Asked Questions</h2>
                <p className="section-subtitle">Quick answers to common queries</p>
              </div>

              <div className="faq-grid">
                {faqItems.map((faq, index) => (
                  <div className="faq-card" key={index}>
                    <div className="faq-emoji">{faq.emoji}</div>
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                    <div className="faq-footer">
                      <span className="faq-number">Q{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-note">
                <p>
                  <strong>📞 Need more help?</strong> Visit Central Library desk or contact Librarian during working hours.
                </p>
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="policy-footer">
          <div className="footer-info">
            <p><strong>Vidyasagar College for Women Library</strong></p>
            <p>⏰ 8:00 AM - 2:00 PM | 📍 Central Library Building</p>
            <p>📞 Contact: Librarian Office | 📧 vcfwlibrary@gmail.com</p>
          </div>
          <div className="footer-note">
            <p>Policies updated: February 2024 | Subject to change without notice</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Policies;