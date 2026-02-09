import { useState, useEffect, useRef } from "react";
import "./FloatingAssistant.css";

// Updated Assistant Logo Component - increased size and enhanced design
const AssistantLogo = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    {/* Human silhouette with circuit elements - enhanced design */}
    <path d="M12 4C8.134 4 5 7.134 5 11C5 14.5 7.5 17 12 17C16.5 17 19 14.5 19 11C19 7.134 15.866 4 12 4Z" 
          opacity="0.15"/>
    
    {/* Circuit nodes representing AI network */}
    <circle cx="9" cy="9" r="1.5" opacity="0.9"/>
    <circle cx="12" cy="7" r="1.5" opacity="0.9"/>
    <circle cx="15" cy="9" r="1.5" opacity="0.9"/>
    
    {/* Human head outline */}
    <circle cx="12" cy="9" r="4" fill="none" stroke="currentColor" strokeWidth="1.2"/>
    
    {/* Body and connection points */}
    <path d="M12 13V16M9 19H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    
    {/* Digital/data flow lines */}
    <path d="M9 11L7 13M15 11L17 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
    
    {/* Central connection spark */}
    <path d="M12 11L11 13H13L12 15" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.8"/>
  </svg>
);

// Rest of the code remains EXACTLY the same...
const FAQS = [
  {
    keywords: ["timing", "hours", "open", "close"],
    answer: "📚 The library is open from 10:00 AM to 5:00 PM on working days.",
    related: ["membership", "contact"]
  },
  {
    keywords: ["membership", "join", "member", "eligible"],
    answer: "🪪 All students and faculty members of Vidyasagar College for Women are eligible for library membership.",
    related: ["borrow", "timing"]
  },
  {
    keywords: ["borrow", "issue", "loan", "return", "fine"],
    answer: "📖 Books are issued as per library rules. Reference books are for in-library use only. Loan period is 14 days for students.",
    related: ["membership", "opac"]
  },
  {
    keywords: ["journal", "e-journal", "research", "article"],
    answer: "📰 The library provides access to print journals and e-journals through the INFLIBNET N-LIST consortium.",
    related: ["database", "opac"]
  },
  {
    keywords: ["opac", "search", "catalogue", "find book"],
    answer: "🔍 You can search books using the Web OPAC available in the library and through the search kiosk.",
    related: ["borrow", "journal"]
  },
  {
    keywords: ["contact", "email", "phone", "librarian"],
    answer: "📧 For queries, please contact the library at: library.vcfw@gmail.com | Phone: 033-22410114",
    related: ["timing", "membership"]
  },
  {
    keywords: ["database", "online", "digital", "eresource"],
    answer: "💻 Access digital resources through our portal. Use your institutional credentials to login.",
    related: ["journal", "opac"]
  },
  {
    keywords: ["rules", "regulation", "policy", "conduct"],
    answer: "📜 Please maintain silence, handle books carefully, and return borrowed items on time to avoid fines.",
    related: ["borrow", "membership"]
  }
];

const QUICK_QUESTIONS = [
  "What are library timings?",
  "How to become a member?",
  "How many books can I borrow?",
  "How to access e-journals?",
  "Where to search for books?",
  "Contact information?"
];

function getAnswer(question) {
  const q = question.toLowerCase();
  for (const faq of FAQS) {
    if (faq.keywords.some((k) => q.includes(k))) {
      return faq.answer;
    }
  }
  return "ℹ️ Please visit the Submission Desk or Contact page for further assistance. You can also email us at library.vcfw@gmail.com";
}

function getSuggestions(currentTopic = "") {
  if (!currentTopic) return QUICK_QUESTIONS;
  
  const q = currentTopic.toLowerCase();
  const related = [];
  
  FAQS.forEach(faq => {
    if (faq.keywords.some(k => q.includes(k)) && faq.related) {
      FAQS.forEach(f => {
        if (faq.related.some(r => f.keywords.includes(r))) {
          const question = f.keywords[0] + "?";
          related.push(question.charAt(0).toUpperCase() + question.slice(1));
        }
      });
    }
  });
  
  return [...new Set([...related.slice(0, 3), ...QUICK_QUESTIONS.slice(0, 3)])];
}

export default function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "👋 Hello! I'm your Library Assistant. How may I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState(QUICK_QUESTIONS);
  const [typing, setTyping] = useState(false);
  const chatBodyRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = {
      type: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      const botMsg = {
        type: "bot",
        text: getAnswer(input),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setTyping(false);
      setSuggestions(getSuggestions(input));
    }, 800);
  };

  const handleQuickQuestion = (question) => {
    setInput(question);
    setTimeout(() => handleSend(), 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const handleClearChat = () => {
    setMessages([
      {
        type: "bot",
        text: "👋 Conversation cleared. How may I help you?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setSuggestions(QUICK_QUESTIONS);
  };

  return (
    <>
      {/* Floating Button */}
      <button className="chat-toggle" onClick={() => setOpen(!open)}>
        <AssistantLogo size={28} />
        <span className="notification-dot"></span>
      </button>

      {open && (
        <div className="chat-box">
          <div className="chat-header">
            <div className="header-left">
              <div className="assistant-logo">
                <AssistantLogo />
              </div>
              <div>
                <span className="assistant-title">Library Assistant</span>
                <span className="assistant-status">
                  <span className="status-dot"></span> Online
                </span>
              </div>
            </div>
            <div className="header-actions">
              <button className="icon-btn" onClick={handleClearChat} title="Clear chat">
                🗑️
              </button>
              <button className="icon-btn" onClick={() => setOpen(false)} title="Close">
                ✕
              </button>
            </div>
          </div>

          <div className="chat-body" ref={chatBodyRef}>
            <div className="welcome-note">
              <p>💡 Ask me about library services, timings, membership, or resources!</p>
            </div>
            
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.type}-message`}>
                <div className="message-content">
                  {msg.text}
                </div>
                <div className="message-time">{msg.timestamp}</div>
              </div>
            ))}
            
            {typing && (
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            )}
            
            {suggestions.length > 0 && (
              <div className="suggestions">
                <div className="suggestions-label">Quick questions:</div>
                <div className="suggestions-list">
                  {suggestions.map((q, i) => (
                    <button
                      key={i}
                      className="suggestion-chip"
                      onClick={() => handleQuickQuestion(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="chat-footer">
            <div className="input-container">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about library services…"
                autoFocus
              />
              <button onClick={handleSend} className="send-btn" disabled={!input.trim()}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            <div className="footer-info">
              <span className="hint">Press Enter to send • Shift+Enter for new line</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}