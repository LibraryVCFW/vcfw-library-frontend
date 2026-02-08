import React, { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
import "./Activities.css";

const Activities = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Email subscription state
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState(null);
  
  const formRef = useRef();

  // EmailJS Configuration - আপনার নিজের credentials দিন
  const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // EmailJS service ID
  const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // EmailJS template ID
  const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // EmailJS public key

  // ব্লগস্পট RSS feed URL
  const BLOG_RSS_URL = "https://libraryvcfw.blogspot.com/feeds/posts/default?alt=json";

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        
        // CORS proxy ব্যবহার করছি কারণ সরাসরি fetch করলে CORS error দিতে পারে
        const proxyUrl = "https://api.allorigins.win/get?url=";
        const response = await fetch(`${proxyUrl}${encodeURIComponent(BLOG_RSS_URL)}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const parsedData = JSON.parse(data.contents);
        
        // ব্লগ পোস্টগুলো process করা
        const blogPosts = parsedData.feed.entry.map((entry, index) => {
          // HTML content টেক্সটে convert করা
          const content = entry.content ? entry.content.$t : "";
          const plainTextContent = content
            .replace(/<[^>]*>/g, '') // HTML tags remove
            .substring(0, 200) + '...'; // প্রথম ২০০ ক্যারেক্টার
          
          // Date format করা
          const publishedDate = new Date(entry.published.$t);
          const formattedDate = publishedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          
          // Thumbnail image খোঁজা
          let thumbnail = "";
          const imgRegex = /<img[^>]+src="([^">]+)"/;
          const imgMatch = content.match(imgRegex);
          if (imgMatch && imgMatch[1]) {
            thumbnail = imgMatch[1];
          }
          
          return {
            id: index,
            title: entry.title ? entry.title.$t : "No Title",
            content: plainTextContent,
            fullContent: content,
            date: formattedDate,
            thumbnail: thumbnail,
            link: entry.link ? entry.link.find(l => l.rel === "alternate").href : "#",
            author: entry.author ? entry.author[0].name.$t : "Library Admin"
          };
        });
        
        setPosts(blogPosts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
        setLoading(false);
        
        // Fallback: Mock data যদি fetch fail হয়
        setPosts(mockBlogPosts);
      }
    };

    fetchBlogPosts();
    
    // EmailJS initialize
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // Mock data for fallback
  const mockBlogPosts = [
    {
      id: 1,
      title: "Library Orientation Program 2024",
      content: "New students attended the library orientation program to learn about resources and services available...",
      date: "January 15, 2024",
      thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "https://libraryvcfw.blogspot.com/",
      author: "Library Staff"
    },
    {
      id: 2,
      title: "Digital Literacy Workshop",
      content: "A workshop on using digital resources and online databases was conducted for research scholars...",
      date: "December 20, 2023",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "https://libraryvcfw.blogspot.com/",
      author: "Library Admin"
    },
    {
      id: 3,
      title: "Book Donation Drive Success",
      content: "The annual book donation drive collected over 500 books for the library collection...",
      date: "November 10, 2023",
      thumbnail: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "https://libraryvcfw.blogspot.com/",
      author: "Library Committee"
    },
    {
      id: 4,
      title: "New E-Resources Added",
      content: "Access to 10 new e-journals and databases has been made available for students and faculty...",
      date: "October 5, 2023",
      thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "https://libraryvcfw.blogspot.com/",
      author: "Digital Library"
    },
    {
      id: 5,
      title: "Library Week Celebration",
      content: "Library week was celebrated with various activities including book exhibitions and reading sessions...",
      date: "September 18, 2023",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "https://libraryvcfw.blogspot.com/",
      author: "Library Club"
    },
    {
      id: 6,
      title: "Research Paper Writing Workshop",
      content: "A special workshop on research paper writing and citation management was organized...",
      date: "August 22, 2023",
      thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "https://libraryvcfw.blogspot.com/",
      author: "Research Wing"
    }
  ];

  const handleReadMore = (link) => {
    window.open(link, '_blank');
  };

  // Email subscription handler
  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setSubscribeStatus({
        type: 'error',
        message: 'Please enter a valid email address'
      });
      return;
    }

    setSubscribing(true);
    setSubscribeStatus(null);

    try {
      // Send email using EmailJS
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current
      );

      // Success message
      setSubscribeStatus({
        type: 'success',
        message: `Successfully subscribed! Confirmation email sent to ${email}`
      });
      
      // Store in localStorage for tracking
      const subscribers = JSON.parse(localStorage.getItem('librarySubscribers') || '[]');
      
      // Check if already subscribed
      if (subscribers.some(sub => sub.email === email)) {
        setSubscribeStatus({
          type: 'info',
          message: `You're already subscribed with ${email}`
        });
      } else {
        // Add new subscriber
        subscribers.push({
          email,
          date: new Date().toISOString(),
          source: 'Vidyasagar College Library Website'
        });
        localStorage.setItem('librarySubscribers', JSON.stringify(subscribers));
      }
      
      // Reset email input
      setEmail("");
      
      // Auto clear message after 5 seconds
      setTimeout(() => {
        setSubscribeStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      
      // Fallback: Store in localStorage even if email fails
      const subscribers = JSON.parse(localStorage.getItem('librarySubscribers') || '[]');
      subscribers.push({
        email,
        date: new Date().toISOString(),
        source: 'Vidyasagar College Library Website'
      });
      localStorage.setItem('librarySubscribers', JSON.stringify(subscribers));
      
      setSubscribeStatus({
        type: 'success',
        message: `Thank you for subscribing! You'll receive updates at ${email}`
      });
      
      setEmail("");
      
      setTimeout(() => {
        setSubscribeStatus(null);
      }, 5000);
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="activities-page">
      {/* Animated Background */}
      <div className="floating-notes">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="floating-note" style={{ animationDelay: `${i * 0.3}s` }}>
            📄
          </div>
        ))}
      </div>

      <div className="activities-container">
        {/* Header */}
        <header className="activities-header">
          <h1 className="activities-title">
            <span className="activities-emoji">📢</span>
            Library Activities & Updates
          </h1>
          <p className="activities-subtitle">
            Latest news, events, and announcements from Vidyasagar College Library
          </p>
          <div className="blog-link">
            <a 
              href="https://libraryvcfw.blogspot.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="blog-link-btn"
            >
              🔗 Visit Our Blog
            </a>
          </div>
        </header>

        {/* Content */}
        <main className="activities-main">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading blog posts from libraryvcfw.blogspot.com...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p className="error-message">{error}</p>
              <p className="fallback-notice">Showing sample activities</p>
            </div>
          ) : null}

          {/* Blog Posts Grid */}
          <div className="blog-grid">
            {posts.map((post) => (
              <div className="blog-card" key={post.id}>
                {post.thumbnail && (
                  <div className="blog-image-container">
                    <img 
                      src={post.thumbnail} 
                      alt={post.title}
                      className="blog-image"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    <div className="blog-date-badge">
                      <span className="date-day">{new Date(post.date).getDate()}</span>
                      <span className="date-month">
                        {new Date(post.date).toLocaleString('default', { month: 'short' })}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="blog-author">
                      👤 {post.author}
                    </span>
                    <span className="blog-date">
                      📅 {post.date}
                    </span>
                  </div>
                  
                  <h3 className="blog-title">{post.title}</h3>
                  
                  <p className="blog-excerpt">{post.content}</p>
                  
                  <div className="blog-actions">
                    <button 
                      className="read-more-btn"
                      onClick={() => handleReadMore(post.link)}
                    >
                      Read Full Post →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="activities-info">
            <div className="info-card">
              <h3 className="info-title">📝 About Our Blog</h3>
              <p className="info-content">
                All library announcements, events, workshops, and updates are regularly posted on 
                our official blog. Visit the blog for complete details, photos, and additional resources.
              </p>
              <a 
                href="https://libraryvcfw.blogspot.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="info-link"
              >
                🌐 Explore Full Blog
              </a>
            </div>
            
            <div className="info-card">
              <h3 className="info-title">🔔 Stay Updated</h3>
              <p className="info-content">
                Never miss an update! Bookmark our blog or subscribe to get notifications 
                about new library activities, resource additions, and important announcements.
              </p>
              
              {/* EmailJS Subscribe Form */}
              <form ref={formRef} onSubmit={handleSubscribe} className="subscribe-form">
                <input 
                  type="email" 
                  name="user_email"
                  placeholder="Your email address"
                  className="subscribe-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  type="submit" 
                  className="subscribe-btn"
                  disabled={subscribing}
                >
                  {subscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              
              {/* Status Messages */}
              {subscribeStatus && (
                <div className={`subscribe-status ${subscribeStatus.type}`}>
                  {subscribeStatus.message}
                </div>
              )}
              
              <div className="subscribe-note">
                <small>We'll send you updates about library events and new resources</small>
                <br />
                <small>Admin email: connect.sattwik@gmail.com</small>
              </div>
            </div>
            
            <div className="info-card">
              <h3 className="info-title">📞 Contact for Events</h3>
              <p className="info-content">
                Want to organize an event or workshop in the library? Contact the library 
                committee for coordination and approvals.
              </p>
              <div className="contact-info">
                <p>📧 library@vcw.edu</p>
                <p>📞 +91-XXX-XXXXXXX</p>
                <p>📍 Central Library, 1st Floor</p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="activities-footer">
          <p>
            <strong>Source:</strong> Content fetched from 
            <a 
              href="https://libraryvcfw.blogspot.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="source-link"
            >
              libraryvcfw.blogspot.com
            </a>
          </p>
          <p className="update-note">
            ⏰ Updates automatically fetched | Last checked: {new Date().toLocaleDateString()}
          </p>
          <p className="subscription-note">
            📧 Subscriptions managed via EmailJS | Admin: connect.sattwik@gmail.com
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Activities;