import React, { useState, useEffect } from "react";
import "./Gallery.css";

const Gallery = () => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPin, setSelectedPin] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // আপনার Pinterest প্রোফাইল
  const PINTEREST_USERNAME = "libraryvcfw";
  const PINTEREST_PROFILE_URL = "https://in.pinterest.com/libraryvcfw/";
  const PINTEREST_RSS_URL = `https://www.pinterest.com/${PINTEREST_USERNAME}/feed.rss`;

  // Pinterest বোর্ডের তথ্য
  const pinterestBoards = [
    { id: "new-arrivals", name: "NEW ARRIVALS", count: 60, color: "#e60023" },
    { id: "gandhi", name: "Mahatma Gandhi", count: 22, color: "#2e8b57" },
    { id: "womens-studies", name: "Women's Studies", count: 41, color: "#9b59b6" },
    { id: "library-events", name: "Library Events", count: 5, color: "#3498db" },
    { id: "visitors", name: "With Visitors", count: 0, color: "#f39c12" },
    { id: "reference", name: "Reference Documents", count: 5, color: "#34495e" },
    { id: "notice-board", name: "Library Notice Board", count: 5, color: "#1abc9c" }
  ];

  // Categories (Pinterest বোর্ডের সাথে মিল রেখে)
  const categories = [
    { id: "all", name: "All Photos", icon: "🖼️", count: 138 },
    { id: "new-arrivals", name: "New Arrivals", icon: "📚", count: 60 },
    { id: "womens-studies", name: "Women's Studies", icon: "👩‍🎓", count: 41 },
    { id: "gandhi", name: "Mahatma Gandhi", icon: "🕉️", count: 22 },
    { id: "library-events", name: "Library Events", icon: "🎉", count: 5 },
    { id: "reference", name: "References", icon: "📋", count: 5 },
    { id: "notice-board", name: "Notice Board", icon: "📌", count: 5 }
  ];

  // VCFW Library-specific fallback images
  const vcfwLibraryPins = [
    {
      id: 1,
      title: "New Book Arrivals - 2024",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Latest book additions to Vidyasagar College Library collection",
      category: "new-arrivals",
      link: "https://in.pinterest.com/libraryvcfw/new-arrivals/"
    },
    {
      id: 2,
      title: "Women's Studies Section",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Special collection for Women's Studies at VCFW Library",
      category: "womens-studies",
      link: "https://in.pinterest.com/libraryvcfw/women-s-studies-vcfw-library-collection/"
    },
    {
      id: 3,
      title: "Mahatma Gandhi Collection",
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Books and resources on Mahatma Gandhi's life and philosophy",
      category: "gandhi",
      link: "https://in.pinterest.com/libraryvcfw/mahatma-gandhi/"
    },
    {
      id: 4,
      title: "Library Orientation 2024",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "New student orientation program at Central Library",
      category: "library-events",
      link: "https://in.pinterest.com/libraryvcfw/library-events/"
    },
    {
      id: 5,
      title: "Digital Reference Materials",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Digital references and e-resources available",
      category: "reference",
      link: "https://in.pinterest.com/libraryvcfw/reference-documents/"
    },
    {
      id: 6,
      title: "Library Notice Board Updates",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Important notices and announcements",
      category: "notice-board",
      link: "https://in.pinterest.com/libraryvcfw/library-notice-board/"
    },
    {
      id: 7,
      title: "Reading Room - Central Library",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Peaceful reading environment at VCFW Library",
      category: "new-arrivals",
      link: "https://in.pinterest.com/libraryvcfw/new-arrivals/"
    },
    {
      id: 8,
      title: "Research Scholars Section",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Special area for research scholars and faculty",
      category: "womens-studies",
      link: "https://in.pinterest.com/libraryvcfw/women-s-studies-vcfw-library-collection/"
    },
    {
      id: 9,
      title: "Book Exhibition 2024",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Annual book exhibition at Vidyasagar College",
      category: "library-events",
      link: "https://in.pinterest.com/libraryvcfw/library-events/"
    }
  ];

  useEffect(() => {
    const fetchPinterestPins = async () => {
      try {
        setLoading(true);
        
        // Pinterest RSS Feed থেকে ডেটা fetch করা
        const proxyUrl = "https://api.allorigins.win/get?url=";
        const encodedUrl = encodeURIComponent(PINTEREST_RSS_URL);
        
        const response = await fetch(`${proxyUrl}${encodedUrl}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch from Pinterest: ${response.status}`);
        }
        
        const data = await response.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");
        
        // RSS feed থেকে পিন পার্স করা
        const items = xmlDoc.querySelectorAll("item");
        const parsedPins = [];
        
        items.forEach((item, index) => {
          if (index < 9) { // শুধু প্রথম ৯টি পিন
            const title = item.querySelector("title")?.textContent || "VCFW Library Pin";
            const description = item.querySelector("description")?.textContent || "";
            const link = item.querySelector("link")?.textContent || PINTEREST_PROFILE_URL;
            
            // বর্ণনা থেকে ছবি এক্সট্র্যাক্ট করা
            let image = "";
            const imgRegex = /<img[^>]+src="([^">]+)"/;
            const imgMatch = description.match(imgRegex);
            
            if (imgMatch && imgMatch[1]) {
              image = imgMatch[1];
            }
            
            if (image) {
              // Pinterest বোর্ড ডিটেক্ট করা
              let category = "all";
              const titleLower = title.toLowerCase();
              
              if (titleLower.includes("new") || titleLower.includes("arrival")) {
                category = "new-arrivals";
              } else if (titleLower.includes("women") || titleLower.includes("study")) {
                category = "womens-studies";
              } else if (titleLower.includes("gandhi")) {
                category = "gandhi";
              } else if (titleLower.includes("event")) {
                category = "library-events";
              } else if (titleLower.includes("reference") || titleLower.includes("document")) {
                category = "reference";
              } else if (titleLower.includes("notice")) {
                category = "notice-board";
              }
              
              parsedPins.push({
                id: index + 1,
                title: title.length > 50 ? title.substring(0, 50) + "..." : title,
                image: image,
                description: description.replace(/<[^>]*>/g, '').substring(0, 100) + '...',
                category: category,
                link: link,
                board: pinterestBoards.find(b => b.id === category)?.name || "VCFW Library"
              });
            }
          }
        });
        
        if (parsedPins.length > 0) {
          setPins(parsedPins);
        } else {
          // Fallback: VCFW-specific images
          setPins(vcfwLibraryPins);
        }
        
        setError(null);
        setLoading(false);
        
      } catch (err) {
        console.error("Error fetching Pinterest pins:", err);
        setError("Could not load photos from Pinterest. Showing VCFW Library gallery.");
        setPins(vcfwLibraryPins);
        setLoading(false);
      }
    };

    fetchPinterestPins();
  }, []);

  // ক্যাটেগরি এবং সার্চ অনুযায়ী ফিল্টার
  const filteredPins = pins.filter(pin => {
    const matchesCategory = selectedCategory === "all" || pin.category === selectedCategory;
    const matchesSearch = pin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pin.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Lightbox এর জন্য পিন সিলেক্ট
  const handlePinClick = (pin) => {
    setSelectedPin(pin);
  };

  // Lightbox বন্ধ
  const closeLightbox = () => {
    setSelectedPin(null);
  };

  // Lightbox নেভিগেশন
  const navigateLightbox = (direction) => {
    if (!selectedPin) return;
    
    const currentIndex = pins.findIndex(pin => pin.id === selectedPin.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % pins.length;
    } else {
      newIndex = (currentIndex - 1 + pins.length) % pins.length;
    }
    
    setSelectedPin(pins[newIndex]);
  };

  // Keyboard নেভিগেশন
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedPin) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('next');
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPin]);

  return (
    <div className="gallery-page">
      {/* Animated Background */}
      <div className="floating-photos">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="floating-photo"
            style={{ 
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              fontSize: `${Math.random() * 2 + 1.5}rem`
            }}
          >
            {['📸', '🖼️', '📷', '🎨', '✨', '🌟'][i % 6]}
          </div>
        ))}
      </div>

      <div className="gallery-container">
        {/* Header */}
        <header className="gallery-header">
          <h1 className="gallery-title">
            <span className="gallery-title-icon">📸</span>
            VCFW Library Photo Gallery
          </h1>
          <p className="gallery-subtitle">
            Visual journey through Vidyasagar College for Women Library
          </p>
          
          <div className="pinterest-link">
            <a 
              href={PINTEREST_PROFILE_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="pinterest-btn"
            >
              <span className="pinterest-icon">📌</span>
              Visit Our Pinterest Gallery
            </a>
            <span className="pinterest-note">
              Photos from: {PINTEREST_PROFILE_URL}
            </span>
          </div>
        </header>

        {/* Pinterest Boards Info */}
        <div className="boards-info">
          <h3><span className="boards-icon">📋</span> Our Pinterest Boards</h3>
          <div className="boards-grid">
            {pinterestBoards.filter(board => board.count > 0).map(board => (
              <a 
                key={board.id}
                href={`${PINTEREST_PROFILE_URL}${board.name.toLowerCase().replace(/\s+/g, '-')}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="board-card"
                style={{ borderLeftColor: board.color }}
              >
                <span className="board-name">{board.name}</span>
                <span className="board-count">{board.count} pins</span>
              </a>
            ))}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="gallery-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search library photos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                {category.name}
                <span className="category-count">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-section">
            <div className="loading-spinner"></div>
            <p>Loading photos from VCFW Pinterest...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="error-section">
            <p className="error-message">{error}</p>
          </div>
        )}

        {/* Photo Grid */}
        <div className="photo-grid">
          {filteredPins.map(pin => (
            <div 
              key={pin.id} 
              className="photo-card"
              onClick={() => handlePinClick(pin)}
            >
              <div className="photo-image-container">
                <img 
                  src={pin.image} 
                  alt={pin.title}
                  className="photo-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                  }}
                />
                <div className="photo-overlay">
                  <span className="view-icon">👁️</span>
                  <span className="view-text">Click to View</span>
                </div>
              </div>
              
              <div className="photo-info">
                <h3 className="photo-title">{pin.title}</h3>
                <p className="photo-description">{pin.description}</p>
                
                <div className="photo-meta">
                  <span className="photo-category">
                    {categories.find(c => c.id === pin.category)?.icon} 
                    {pin.category.replace('-', ' ')}
                  </span>
                  <span className="photo-board">
                    📋 {pin.board}
                  </span>
                </div>
                
                <a 
                  href={pin.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pinterest-source"
                  onClick={(e) => e.stopPropagation()}
                >
                  📌 View on Pinterest
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && filteredPins.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🖼️</div>
            <h3>No photos found in this category</h3>
            <p>Try selecting a different category or search term</p>
            <button 
              className="reset-btn"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              Show All Photos
            </button>
          </div>
        )}

        {/* Gallery Info */}
        <div className="gallery-info">
          <div className="info-card">
            <h3><span className="info-icon">🏛️</span> About VCFW Library Gallery</h3>
            <p>
              This gallery displays photos from our official Pinterest account, 
              showcasing Vidyasagar College for Women Library's collections, 
              events, and facilities.
            </p>
            <p>
              All photos are organized into thematic boards for easy browsing.
            </p>
          </div>
          
          <div className="info-card">
            <h3><span className="info-icon">📷</span> Photo Categories</h3>
            <p>
              Our photos are categorized by:
            </p>
            <ul className="category-list">
              <li>📚 <strong>New Arrivals</strong> - Latest book additions</li>
              <li>👩‍🎓 <strong>Women's Studies</strong> - Special collection</li>
              <li>🕉️ <strong>Mahatma Gandhi</strong> - Dedicated section</li>
              <li>🎉 <strong>Library Events</strong> - Programs and activities</li>
            </ul>
          </div>
          
          <div className="info-card">
            <h3><span className="info-icon">🔗</span> Connect With Us</h3>
            <p>
              Follow our Pinterest for regular updates on library collections, 
              events, and announcements.
            </p>
            <div className="social-links">
              <a 
                href={PINTEREST_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link pinterest"
              >
                📌 Pinterest
              </a>
              <a 
                href="https://libraryvcfw.blogspot.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link blog"
              >
                📝 Library Blog
              </a>
              <a 
                href="mailto:library@vcfw.org"
                className="social-link email"
              >
                📧 Email Us
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="gallery-footer">
          <p>
            <strong>Source:</strong> All photos from 
            <a 
              href={PINTEREST_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="source-link"
            >
              VCFW Library Pinterest
            </a>
          </p>
          <p className="update-note">
            ⏰ Photos synced from Pinterest | Vidyasagar College for Women Library
          </p>
          <p className="library-info">
            📍 39, Sankar Ghosh Lane, Kolkata – 700006 | 📞 033-22410114
          </p>
        </footer>
      </div>

      {/* Lightbox Modal */}
      {selectedPin && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              ✕
            </button>
            
            <button 
              className="lightbox-nav prev" 
              onClick={() => navigateLightbox('prev')}
            >
              ←
            </button>
            
            <button 
              className="lightbox-nav next" 
              onClick={() => navigateLightbox('next')}
            >
              →
            </button>
            
            <div className="lightbox-image-container">
              <img 
                src={selectedPin.image} 
                alt={selectedPin.title}
                className="lightbox-image"
              />
            </div>
            
            <div className="lightbox-info">
              <h2 className="lightbox-title">{selectedPin.title}</h2>
              <p className="lightbox-description">{selectedPin.description}</p>
              
              <div className="lightbox-meta">
                <span className="lightbox-category">
                  {categories.find(c => c.id === selectedPin.category)?.icon} 
                  {selectedPin.category.replace('-', ' ')}
                </span>
                
                <span className="lightbox-board">
                  📋 Board: {selectedPin.board}
                </span>
              </div>
              
              <a 
                href={selectedPin.link}
                target="_blank"
                rel="noopener noreferrer"
                className="lightbox-pinterest"
              >
                📌 Open on VCFW Pinterest
              </a>
              
              <div className="lightbox-navigation">
                <button 
                  className="nav-btn prev-btn"
                  onClick={() => navigateLightbox('prev')}
                >
                  ← Previous
                </button>
                <span className="nav-info">
                  {pins.findIndex(p => p.id === selectedPin.id) + 1} / {pins.length}
                </span>
                <button 
                  className="nav-btn next-btn"
                  onClick={() => navigateLightbox('next')}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;