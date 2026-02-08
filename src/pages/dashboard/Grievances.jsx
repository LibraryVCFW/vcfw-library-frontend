import { useEffect, useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "https://vcfw-library-backend.onrender.com";

export default function Grievances() {


  const [data, setData] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [reply, setReply] = useState("");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadGrievances();
    loadStats();
  }, []);

  const loadGrievances = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/grievances`, {
      headers: {
        "Accept": "application/json"
      },
      cache: "no-store" // 🔥 Netlify 304 cache avoid
    });

    if (!res.ok) {
      throw new Error("Failed to fetch grievances");
    }

    const json = await res.json();
    setData(Array.isArray(json) ? json : []);
  } catch (err) {
    console.error("Load grievances error:", err);
    setData([]);
  }
};


  const loadStats = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/grievances/stats`, {
      headers: { "Accept": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch stats");
    }

    const json = await res.json();
    setStats(json);
  } catch (err) {
    console.error("Load stats error:", err);
    setStats(null);
  }
};


  const resolveGrievance = async (id) => {
  if (!reply.trim()) {
    alert("Reply required");
    return;
  }

  try {
    const res = await fetch(
      `${API_BASE}/api/grievances/${id}/resolve`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to resolve grievance");
    }

    setActiveId(null);
    setReply("");
    loadGrievances();
    loadStats();
  } catch (err) {
    console.error("Resolve grievance error:", err);
    alert("Unable to resolve grievance. Try again.");
  }
};


  const getStatusColor = (status) => {
    return status === "Resolved" ? "#10b981" : "#f59e0b";
  };

  const getStatusBgColor = (status) => {
    return status === "Resolved" ? "#10b98120" : "#f59e0b20";
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
          Grievance Management
        </h1>
        <p style={{ color: "#8b7355", fontSize: "16px" }}>
          Review and resolve student and teacher grievances
        </p>
      </div>

      {/* ================= STATISTICS ================= */}
      {stats && (
        <div style={{
          display: "flex",
          gap: "25px",
          marginBottom: "40px",
          flexWrap: "wrap"
        }}>
          <div style={{
            flex: "1",
            minWidth: "200px",
            background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
            padding: "25px",
            borderRadius: "16px",
            textAlign: "center",
            boxShadow: "0 8px 32px rgba(139, 115, 85, 0.08)",
            border: "1px solid #f5e6d3",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(139, 115, 85, 0.15)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(139, 115, 85, 0.08)";
          }}>
            <h4 style={{
              marginBottom: "12px",
              color: "#8b7355",
              fontSize: "14px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}>
              Total Submitted
            </h4>
            <p style={{
              fontSize: "36px",
              fontWeight: "800",
              color: "#d4a76a",
              margin: "0",
              textShadow: "2px 2px 4px rgba(0,0,0,0.05)"
            }}>
              {stats.students.submitted + stats.teachers.submitted}
            </p>
          </div>

          <div style={{
            flex: "1",
            minWidth: "200px",
            background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
            padding: "25px",
            borderRadius: "16px",
            textAlign: "center",
            boxShadow: "0 8px 32px rgba(139, 115, 85, 0.08)",
            border: "1px solid #f5e6d3",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(139, 115, 85, 0.15)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(139, 115, 85, 0.08)";
          }}>
            <h4 style={{
              marginBottom: "12px",
              color: "#8b7355",
              fontSize: "14px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}>
              Total Resolved
            </h4>
            <p style={{
              fontSize: "36px",
              fontWeight: "800",
              color: "#10b981",
              margin: "0",
              textShadow: "2px 2px 4px rgba(0,0,0,0.05)"
            }}>
              {stats.students.resolved + stats.teachers.resolved}
            </p>
          </div>

          <div style={{
            flex: "1",
            minWidth: "200px",
            background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
            padding: "25px",
            borderRadius: "16px",
            textAlign: "center",
            boxShadow: "0 8px 32px rgba(139, 115, 85, 0.08)",
            border: "1px solid #f5e6d3",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(139, 115, 85, 0.15)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(139, 115, 85, 0.08)";
          }}>
            <h4 style={{
              marginBottom: "12px",
              color: "#8b7355",
              fontSize: "14px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}>
              Student Grievances
            </h4>
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
              gap: "5px"
            }}>
              <p style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "#4f46e5",
                margin: "0",
                textShadow: "2px 2px 4px rgba(0,0,0,0.05)"
              }}>
                {stats.students.submitted}
              </p>
              <span style={{ color: "#8b7355", fontSize: "18px", fontWeight: "600" }}>/</span>
              <p style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "#10b981",
                margin: "0",
                textShadow: "2px 2px 4px rgba(0,0,0,0.05)"
              }}>
                {stats.students.resolved}
              </p>
            </div>
            <p style={{
              fontSize: "12px",
              color: "#8b7355",
              marginTop: "8px",
              fontWeight: "500"
            }}>
              Submitted • Resolved
            </p>
          </div>

          <div style={{
            flex: "1",
            minWidth: "200px",
            background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
            padding: "25px",
            borderRadius: "16px",
            textAlign: "center",
            boxShadow: "0 8px 32px rgba(139, 115, 85, 0.08)",
            border: "1px solid #f5e6d3",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(139, 115, 85, 0.15)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(139, 115, 85, 0.08)";
          }}>
            <h4 style={{
              marginBottom: "12px",
              color: "#8b7355",
              fontSize: "14px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}>
              Teacher Grievances
            </h4>
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
              gap: "5px"
            }}>
              <p style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "#d4a76a",
                margin: "0",
                textShadow: "2px 2px 4px rgba(0,0,0,0.05)"
              }}>
                {stats.teachers.submitted}
              </p>
              <span style={{ color: "#8b7355", fontSize: "18px", fontWeight: "600" }}>/</span>
              <p style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "#10b981",
                margin: "0",
                textShadow: "2px 2px 4px rgba(0,0,0,0.05)"
              }}>
                {stats.teachers.resolved}
              </p>
            </div>
            <p style={{
              fontSize: "12px",
              color: "#8b7355",
              marginTop: "8px",
              fontWeight: "500"
            }}>
              Submitted • Resolved
            </p>
          </div>
        </div>
      )}

      {/* ================= GRIEVANCES TABLE ================= */}
      <div style={{
        background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(139, 115, 85, 0.08)",
        border: "1px solid #f5e6d3",
        overflow: "hidden"
      }}>
        <div style={{
          padding: "25px",
          borderBottom: "2px solid #f5e6d3",
          background: "#fffaf7"
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
              width: "30px",
              height: "30px",
              background: "linear-gradient(135deg, #d4a76a, #8b7355)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold"
            }}>📋</span>
            All Grievances ({data.length})
          </h3>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "800px"
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
                  Tracking ID
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
                  User
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
                  Name
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
                  Department
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
                  Status
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
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((g) => (
                <tr 
                  key={g._id}
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
                    fontSize: "14px"
                  }}>
                    <span style={{
                      padding: "6px 12px",
                      background: "#f5e6d3",
                      borderRadius: "6px",
                      fontFamily: "monospace"
                    }}>
                      {g.trackingId}
                    </span>
                  </td>
                  <td style={{
                    padding: "16px",
                    color: "#5d4c3a",
                    fontWeight: "500",
                    fontSize: "14px"
                  }}>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "6px 12px",
                      background: g.userType === "Student" ? "#4f46e520" : "#d4a76a20",
                      color: g.userType === "Student" ? "#4f46e5" : "#d4a76a",
                      borderRadius: "20px",
                      fontWeight: "600",
                      fontSize: "13px"
                    }}>
                      {g.userType === "Student" ? "👨‍🎓" : "👨‍🏫"}
                      {g.userType}
                    </span>
                  </td>
                  <td style={{
                    padding: "16px",
                    color: "#5d4c3a",
                    fontWeight: "500",
                    fontSize: "15px"
                  }}>
                    {g.name}
                  </td>
                  <td style={{
                    padding: "16px",
                    color: "#8b7355",
                    fontWeight: "500",
                    fontSize: "14px"
                  }}>
                    {g.department}
                  </td>
                  <td style={{
                    padding: "16px"
                  }}>
                    <span style={{
                      padding: "8px 16px",
                      background: getStatusBgColor(g.status),
                      color: getStatusColor(g.status),
                      borderRadius: "20px",
                      fontWeight: "600",
                      fontSize: "13px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px"
                    }}>
                      {g.status === "Resolved" ? "✅" : "⏳"}
                      {g.status}
                    </span>
                  </td>
                  <td style={{
                    padding: "16px"
                  }}>
                    {g.status === "Pending" && (
                      <button 
                        onClick={() => setActiveId(g._id)}
                        style={{
                          padding: "10px 20px",
                          background: "linear-gradient(135deg, #d4a76a, #8b7355)",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          boxShadow: "0 4px 12px rgba(212, 167, 106, 0.2)"
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = "0 6px 16px rgba(212, 167, 106, 0.3)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(212, 167, 106, 0.2)";
                        }}
                      >
                        <span>💬</span>
                        Reply / Resolve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.length === 0 && (
          <div style={{
            padding: "60px 20px",
            textAlign: "center",
            color: "#8b7355",
            fontSize: "16px",
            fontWeight: "500"
          }}>
            <div style={{
              fontSize: "48px",
              marginBottom: "20px",
              opacity: "0.5"
            }}>
              📭
            </div>
            No grievances found
          </div>
        )}
      </div>

      {/* ================= REPLY BOX ================= */}
      {activeId && (
        <div style={{
          marginTop: "30px",
          padding: "30px",
          background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(139, 115, 85, 0.08)",
          border: "1px solid #f5e6d3",
          animation: "slideIn 0.3s ease"
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
              background: "linear-gradient(135deg, #d4a76a, #8b7355)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold"
            }}>
              💬
            </div>
            <div>
              <h4 style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#5d4c3a",
                margin: "0 0 5px 0"
              }}>
                Reply to Grievance
              </h4>
              <p style={{
                color: "#8b7355",
                fontSize: "14px",
                margin: "0"
              }}>
                Write your response to resolve this grievance
              </p>
            </div>
          </div>

          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type your response here..."
            style={{
              width: "100%",
              minHeight: "150px",
              padding: "20px",
              border: "2px solid #f5e6d3",
              borderRadius: "12px",
              fontSize: "15px",
              background: "#fffaf7",
              color: "#5d4c3a",
              outline: "none",
              transition: "all 0.3s ease",
              resize: "vertical",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              marginBottom: "25px"
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

          <div style={{
            display: "flex",
            gap: "15px",
            justifyContent: "flex-end"
          }}>
            <button
              onClick={() => {
                setActiveId(null);
                setReply("");
              }}
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
              Cancel
            </button>
            
            <button
              onClick={() => resolveGrievance(activeId)}
              style={{
                padding: "14px 28px",
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "15px",
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(16, 185, 129, 0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.2)";
              }}
            >
              Submit Reply & Resolve
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
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