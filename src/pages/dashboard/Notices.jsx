import { useEffect, useState } from "react";
import {
  getNotices,
  addNotice,
  updateNotice,
  deleteNotice,
} from "../../services/api";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* LOAD NOTICES */
  const loadNotices = async () => {
    try {
      const data = await getNotices();
      if (!Array.isArray(data)) {
        throw new Error("Invalid notice data");
      }
      setNotices(data);
      setError("");
    } catch (err) {
      console.error("Load notices error:", err);
      setError("Failed to load notices");
      setNotices([]);
    }
  };

  useEffect(() => {
    loadNotices();
  }, []);

  /* RESET FORM */
  const resetForm = () => {
    setForm({ title: "", description: "", link: "" });
    setEditId(null);
  };

  /* ADD / UPDATE NOTICE */
  const submitNotice = async () => {
    if (!form.title || !form.description) {
      return alert("Title and description are required");
    }

    if (form.link && !form.link.startsWith("http")) {
      return alert("Link must start with http or https");
    }

    setLoading(true);

    try {
      if (editId) {
        const updated = await updateNotice(editId, form);
        setNotices(
          notices.map((n) => (n._id === updated._id ? updated : n))
        );
      } else {
        const created = await addNotice(form);
        setNotices([created, ...notices]);
      }

      resetForm();
    } catch (err) {
      console.error("Notice save error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* EDIT */
  const editNotice = (notice) => {
    setEditId(notice._id);
    setForm({
      title: notice.title,
      description: notice.description,
      link: notice.link || "",
    });
  };

  /* DELETE */
  const removeNotice = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;

    try {
      await deleteNotice(id);
      setNotices(notices.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Delete notice error:", err);
      alert("Failed to delete notice");
    }
  };

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
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
          Notice Management
        </h1>
        <p style={{ color: "#8b7355", fontSize: "16px" }}>
          Create, edit and manage library announcements and updates
        </p>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div style={{
          padding: "15px 20px",
          background: "#fee",
          border: "2px solid #fcc",
          borderRadius: "10px",
          color: "#d00",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <span style={{ fontSize: "18px" }}>⚠️</span>
          {error}
        </div>
      )}

      {/* ADD/EDIT NOTICE FORM */}
      <div style={{
        background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 8px 32px rgba(139, 115, 85, 0.08)",
        border: "1px solid #f5e6d3",
        marginBottom: "40px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginBottom: "25px"
        }}>
          <div style={{
            width: "50px",
            height: "50px",
            background: editId ? 
              "linear-gradient(135deg, #f59e0b, #d97706)" : 
              "linear-gradient(135deg, #d4a76a, #8b7355)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "24px",
            fontWeight: "bold"
          }}>
            {editId ? "✏️" : "➕"}
          </div>
          <div>
            <h2 style={{
              fontSize: "22px",
              fontWeight: "600",
              color: "#5d4c3a",
              margin: "0 0 5px 0"
            }}>
              {editId ? "Edit Notice" : "Create New Notice"}
            </h2>
            <p style={{
              color: "#8b7355",
              fontSize: "14px",
              margin: "0"
            }}>
              {editId ? "Update the notice details below" : "Fill in the notice details below"}
            </p>
          </div>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}>
          <div>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "600",
              color: "#5d4c3a",
              marginBottom: "8px"
            }}>
              Notice Title *
            </label>
            <input
              placeholder="Enter notice title..."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
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
              Description *
            </label>
            <textarea
              placeholder="Enter notice description..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows="4"
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
                resize: "vertical",
                minHeight: "120px",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
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
              Link (Optional)
            </label>
            <input
              placeholder="Enter URL or PDF link (optional)..."
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
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
            <p style={{
              fontSize: "12px",
              color: "#8b7355",
              marginTop: "5px",
              fontStyle: "italic"
            }}>
              Must start with http:// or https://
            </p>
          </div>

          <div style={{
            display: "flex",
            gap: "15px",
            marginTop: "10px"
          }}>
            <button 
              onClick={submitNotice} 
              disabled={loading}
              style={{
                padding: "14px 28px",
                background: editId ? 
                  "linear-gradient(135deg, #f59e0b, #d97706)" : 
                  "linear-gradient(135deg, #d4a76a, #8b7355)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                fontSize: "15px",
                boxShadow: "0 4px 12px rgba(212, 167, 106, 0.2)",
                opacity: loading ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(212, 167, 106, 0.3)";
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(212, 167, 106, 0.2)";
                }
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: "18px",
                    height: "18px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid white",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                  }}></div>
                  {editId ? "Updating..." : "Adding..."}
                </>
              ) : (
                <>
                  {editId ? "✏️ Update Notice" : "➕ Add Notice"}
                </>
              )}
            </button>

            {editId && (
              <button
                onClick={resetForm}
                style={{
                  padding: "14px 28px",
                  background: "#fffaf7",
                  color: "#8b7355",
                  border: "2px solid #f5e6d3",
                  borderRadius: "10px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "15px"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#f5e6d3";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "#fffaf7";
                }}
              >
                ✖️ Discard
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ALL NOTICES */}
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
            }}>📢</span>
            All Notices ({notices.length})
          </h3>
        </div>

        <div style={{ padding: "10px" }}>
          {notices.length === 0 ? (
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
                📭
              </div>
              No notices found. Create your first notice above!
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "20px",
              padding: "20px"
            }}>
              {notices.map((n) => (
                <div
                  key={n._id}
                  style={{
                    background: "#fffaf7",
                    padding: "25px",
                    borderRadius: "16px",
                    border: "2px solid #f5e6d3",
                    transition: "all 0.3s ease",
                    position: "relative"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(139, 115, 85, 0.12)";
                    e.currentTarget.style.borderColor = "#d4a76a";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "#f5e6d3";
                  }}
                >
                  {/* Date badge */}
                  {n.createdAt && (
                    <div style={{
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      padding: "6px 12px",
                      background: "#f5e6d3",
                      color: "#8b7355",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "600"
                    }}>
                      📅 {getFormattedDate(n.createdAt)}
                    </div>
                  )}

                  <h4 style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#5d4c3a",
                    marginBottom: "15px",
                    paddingRight: "80px",
                    lineHeight: "1.4"
                  }}>
                    {n.title}
                  </h4>

                  <p style={{
                    color: "#8b7355",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    marginBottom: "20px",
                    minHeight: "60px"
                  }}>
                    {n.description}
                  </p>

                  {n.link && (
                    <div style={{ marginBottom: "20px" }}>
                      <a 
                        href={n.link} 
                        target="_blank" 
                        rel="noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 18px",
                          background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                          color: "white",
                          textDecoration: "none",
                          borderRadius: "8px",
                          fontWeight: "600",
                          fontSize: "14px",
                          transition: "all 0.3s ease"
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.3)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <span>🔗</span>
                        View / Download
                      </a>
                    </div>
                  )}

                  <div style={{
                    display: "flex",
                    gap: "10px",
                    borderTop: "1px solid #f5e6d3",
                    paddingTop: "20px"
                  }}>
                    <button 
                      onClick={() => editNotice(n)}
                      style={{
                        flex: "1",
                        padding: "10px 16px",
                        background: "linear-gradient(135deg, #f59e0b, #d97706)",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        fontSize: "13px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        justifyContent: "center"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <span>✏️</span> Edit
                    </button>

                    <button
                      onClick={() => removeNotice(n._id)}
                      style={{
                        flex: "1",
                        padding: "10px 16px",
                        background: "linear-gradient(135deg, #ef4444, #dc2626)",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        fontSize: "13px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        justifyContent: "center"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <span>🗑️</span> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}