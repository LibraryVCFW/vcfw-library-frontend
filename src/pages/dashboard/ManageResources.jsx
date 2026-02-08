import { useState, useEffect } from "react";
import { getResources, addResource, deleteResource } from "../../services/api";

export default function ManageResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    title: "",
    author: "",
    publisher: "",
    year: "",
    type: "Book",
  });

  /* LOAD */
  const loadResources = async () => {
    setLoading(true);
    try {
      const data = await getResources();
      setResources(Array.isArray(data) ? data : []);
    } catch {
      setMsg("Failed to load resources");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  /* FORM CHANGE */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ADD */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.author || !form.publisher || !form.year) {
      setMsg("All fields are required");
      return;
    }

    try {
      await addResource(form);
      setMsg("New resource added successfully");

      setForm({
        title: "",
        author: "",
        publisher: "",
        year: "",
        type: "Book",
      });

      loadResources();
    } catch {
      setMsg("Failed to add resource");
    }

    setTimeout(() => setMsg(""), 3000);
  };

  /* DELETE */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resource?")) return;

    try {
      await deleteResource(id);
      setMsg("Resource deleted successfully");
      loadResources();
    } catch {
      setMsg("Failed to delete resource");
    }

    setTimeout(() => setMsg(""), 3000);
  };

  const getTypeColor = (type) => {
    switch(type) {
      case "Book": return { bg: "#4f46e520", color: "#4f46e5", icon: "📚" };
      case "Journal": return { bg: "#d4a76a20", color: "#d4a76a", icon: "📰" };
      case "E-book": return { bg: "#10b98120", color: "#10b981", icon: "💻" };
      case "Magazine": return { bg: "#8b5cf620", color: "#8b5cf6", icon: "📰" };
      case "Audio Book": return { bg: "#f59e0b20", color: "#f59e0b", icon: "🎧" };
      default: return { bg: "#8b735520", color: "#8b7355", icon: "📖" };
    }
  };

  return (
    <div style={{ 
      padding: "30px",
      minHeight: "80vh",
      background: "linear-gradient(135deg, #fff9f0 0%, #fff5e6 100%)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      
      {/* HEADER */}
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{
          fontSize: "32px",
          fontWeight: "700",
          color: "#5d4c3a",
          marginBottom: "10px",
          background: "linear-gradient(45deg, #8b7355, #d4a76a)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          Add New Arrivals
        </h1>
        <p style={{ color: "#8b7355", fontSize: "16px" }}>
          Add new books, journals, and resources to the library catalog
        </p>
      </div>

      {/* ADD RESOURCE FORM */}
      <div style={{
        background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 8px 32px rgba(139, 115, 85, 0.08)",
        border: "1px solid #f5e6d3",
        marginBottom: "30px"
      }}>
        <h3 style={{
          fontSize: "20px",
          fontWeight: "600",
          color: "#5d4c3a",
          marginBottom: "25px",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <span style={{
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, #d4a76a, #8b7355)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold"
          }}>➕</span>
          Add New Resource
        </h3>

        <form onSubmit={handleSubmit}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "25px"
          }}>
            <div>
              <label style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#5d4c3a",
                marginBottom: "8px"
              }}>
                Title *
              </label>
              <input 
                name="title" 
                placeholder="Enter resource title" 
                value={form.title} 
                onChange={handleChange} 
                required
                style={{
                  width: "100%",
                  padding: "14px",
                  border: "2px solid #f5e6d3",
                  borderRadius: "10px",
                  fontSize: "15px",
                  background: "#fffaf7",
                  color: "#5d4c3a",
                  outline: "none",
                  transition: "all 0.3s ease"
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#d4a76a";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212, 167, 106, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#f5e6d3";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              <label style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#5d4c3a",
                marginBottom: "8px"
              }}>
                Author *
              </label>
              <input 
                name="author" 
                placeholder="Enter author name" 
                value={form.author} 
                onChange={handleChange} 
                required
                style={{
                  width: "100%",
                  padding: "14px",
                  border: "2px solid #f5e6d3",
                  borderRadius: "10px",
                  fontSize: "15px",
                  background: "#fffaf7",
                  color: "#5d4c3a",
                  outline: "none",
                  transition: "all 0.3s ease"
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#d4a76a";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212, 167, 106, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#f5e6d3";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              <label style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#5d4c3a",
                marginBottom: "8px"
              }}>
                Publisher *
              </label>
              <input 
                name="publisher" 
                placeholder="Enter publisher name" 
                value={form.publisher} 
                onChange={handleChange} 
                required
                style={{
                  width: "100%",
                  padding: "14px",
                  border: "2px solid #f5e6d3",
                  borderRadius: "10px",
                  fontSize: "15px",
                  background: "#fffaf7",
                  color: "#5d4c3a",
                  outline: "none",
                  transition: "all 0.3s ease"
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#d4a76a";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212, 167, 106, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#f5e6d3";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              <label style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#5d4c3a",
                marginBottom: "8px"
              }}>
                Publication Year *
              </label>
              <input 
                name="year" 
                placeholder="e.g., 2024" 
                value={form.year} 
                onChange={handleChange} 
                required
                style={{
                  width: "100%",
                  padding: "14px",
                  border: "2px solid #f5e6d3",
                  borderRadius: "10px",
                  fontSize: "15px",
                  background: "#fffaf7",
                  color: "#5d4c3a",
                  outline: "none",
                  transition: "all 0.3s ease"
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#d4a76a";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212, 167, 106, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#f5e6d3";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              <label style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#5d4c3a",
                marginBottom: "8px"
              }}>
                Resource Type
              </label>
              <select 
                name="type" 
                value={form.type} 
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "14px",
                  border: "2px solid #f5e6d3",
                  borderRadius: "10px",
                  fontSize: "15px",
                  background: "#fffaf7",
                  color: "#5d4c3a",
                  outline: "none",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#d4a76a";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212, 167, 106, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#f5e6d3";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <option>Book</option>
                <option>Journal</option>
                <option>E-book</option>
                <option>Magazine</option>
                <option>Audio Book</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            style={{
              padding: "16px 32px",
              background: "linear-gradient(135deg, #d4a76a, #8b7355)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 6px 20px rgba(212, 167, 106, 0.3)",
              letterSpacing: "1px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "center",
              width: "200px",
              margin: "0 auto"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(212, 167, 106, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(212, 167, 106, 0.3)";
            }}
          >
            <span>➕</span> Add Resource
          </button>
        </form>
      </div>

      {/* MESSAGE */}
      {msg && (
        <div
          style={{
            margin: "15px 0",
            padding: "20px",
            background: msg.includes("Failed") ? "#fee" : "#f0fff4",
            border: msg.includes("Failed") ? "2px solid #fcc" : "2px solid #bbf7d0",
            borderRadius: "12px",
            color: msg.includes("Failed") ? "#d00" : "#065f46",
            fontWeight: "500",
            fontSize: "15px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            animation: "slideIn 0.3s ease"
          }}
        >
          <span style={{ fontSize: "20px" }}>
            {msg.includes("Failed") ? "⚠️" : "✅"}
          </span>
          {msg}
        </div>
      )}

      {/* RESOURCES TABLE */}
      <div style={{
        background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
        borderRadius: "20px",
        boxShadow: "0 8px 32px rgba(139, 115, 85, 0.08)",
        border: "1px solid #f5e6d3",
        overflow: "hidden"
      }}>
        <div style={{
          padding: "25px",
          borderBottom: "2px solid #f5e6d3",
          background: "#fffaf7",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h3 style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#5d4c3a",
            margin: "0",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <span style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #4f46e5, #3730a3)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold"
            }}>📚</span>
            All Library Resources ({resources.length})
          </h3>
          
          {loading && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#8b7355",
              fontSize: "14px"
            }}>
              <div style={{
                width: "20px",
                height: "20px",
                border: "2px solid #f5e6d3",
                borderTop: "2px solid #d4a76a",
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
              }}></div>
              Loading...
            </div>
          )}
        </div>

        {!loading && resources.length === 0 ? (
          <div style={{
            padding: "60px 20px",
            textAlign: "center",
            color: "#8b7355",
            fontSize: "16px",
            fontWeight: "500"
          }}>
            <div style={{
              fontSize: "64px",
              marginBottom: "20px",
              opacity: "0.5"
            }}>
              📚
            </div>
            No resources found. Add your first resource above!
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "900px"
            }}>
              <thead>
                <tr style={{
                  background: "linear-gradient(135deg, #f5e6d3, #e8d9c5)"
                }}>
                  <th style={{
                    padding: "18px 16px",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#5d4c3a",
                    fontSize: "14px",
                    borderBottom: "2px solid #d4a76a",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    Title
                  </th>
                  <th style={{
                    padding: "18px 16px",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#5d4c3a",
                    fontSize: "14px",
                    borderBottom: "2px solid #d4a76a",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    Author
                  </th>
                  <th style={{
                    padding: "18px 16px",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#5d4c3a",
                    fontSize: "14px",
                    borderBottom: "2px solid #d4a76a",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    Publisher
                  </th>
                  <th style={{
                    padding: "18px 16px",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#5d4c3a",
                    fontSize: "14px",
                    borderBottom: "2px solid #d4a76a",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    Year
                  </th>
                  <th style={{
                    padding: "18px 16px",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#5d4c3a",
                    fontSize: "14px",
                    borderBottom: "2px solid #d4a76a",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    Type
                  </th>
                  <th style={{
                    padding: "18px 16px",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#5d4c3a",
                    fontSize: "14px",
                    borderBottom: "2px solid #d4a76a",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {resources.map((r) => {
                  const typeColor = getTypeColor(r.type);
                  return (
                    <tr 
                      key={r._id}
                      style={{
                        borderBottom: "1px solid #f5e6d3",
                        transition: "all 0.3s ease"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#fffaf7";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <td style={{
                        padding: "16px",
                        color: "#5d4c3a",
                        fontWeight: "600",
                        fontSize: "15px"
                      }}>
                        {r.title}
                      </td>
                      <td style={{
                        padding: "16px",
                        color: "#5d4c3a",
                        fontWeight: "500",
                        fontSize: "14px"
                      }}>
                        {r.author}
                      </td>
                      <td style={{
                        padding: "16px",
                        color: "#8b7355",
                        fontWeight: "500",
                        fontSize: "14px"
                      }}>
                        {r.publisher}
                      </td>
                      <td style={{
                        padding: "16px",
                        color: "#8b7355",
                        fontWeight: "600",
                        fontSize: "14px"
                      }}>
                        {r.year}
                      </td>
                      <td style={{
                        padding: "16px"
                      }}>
                        <span style={{
                          padding: "8px 16px",
                          background: typeColor.bg,
                          color: typeColor.color,
                          borderRadius: "20px",
                          fontWeight: "600",
                          fontSize: "13px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px"
                        }}>
                          {typeColor.icon}
                          {r.type}
                        </span>
                      </td>
                      <td style={{
                        padding: "16px"
                      }}>
                        <div style={{
                          display: "flex",
                          gap: "10px"
                        }}>
                          <button
                            disabled
                            title="Edit will be enabled in next phase"
                            style={{
                              padding: "8px 16px",
                              background: "#f5e6d3",
                              color: "#8b7355",
                              border: "2px solid #f5e6d3",
                              borderRadius: "8px",
                              fontWeight: "600",
                              cursor: "not-allowed",
                              fontSize: "13px",
                              opacity: "0.6"
                            }}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(r._id)}
                            style={{
                              padding: "8px 16px",
                              background: "linear-gradient(135deg, #ef4444, #dc2626)",
                              color: "white",
                              border: "none",
                              borderRadius: "8px",
                              fontWeight: "600",
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              fontSize: "13px",
                              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)"
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.transform = "translateY(-2px)";
                              e.currentTarget.style.boxShadow = "0 6px 16px rgba(239, 68, 68, 0.3)";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.2)";
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}