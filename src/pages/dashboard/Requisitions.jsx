import { useEffect, useState } from "react";
import {
  getRequisitions,
  updateRequisitionStatus,
} from "../../services/api";

export default function Requisitions() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getRequisitions();
      setData(Array.isArray(res) ? res : []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load requisitions");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id) => {
    if (!window.confirm("Mark this requisition as processed?")) return;
    
    try {
      await updateRequisitionStatus(id, "Processed");
      loadData();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  /* SEARCH FILTER */
  const filtered = data.filter((r) =>
    (r.title || "").toLowerCase().includes(search.toLowerCase())
  );

  /* PAGINATION */
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  const getStatusColor = (status) => {
    return status === "Processed" ? "#10b981" : "#f59e0b";
  };

  const getStatusBgColor = (status) => {
    return status === "Processed" ? "#10b98120" : "#f59e0b20";
  };

  const getTypeColor = (type) => {
    switch(type?.toLowerCase()) {
      case "book": return "#4f46e5";
      case "journal": return "#d4a76a";
      default: return "#8b7355";
    }
  };

  const getTypeBgColor = (type) => {
    switch(type?.toLowerCase()) {
      case "book": return "#4f46e520";
      case "journal": return "#d4a76a20";
      default: return "#8b735520";
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
          Book & Journal Requisitions
        </h1>
        <p style={{ color: "#8b7355", fontSize: "16px" }}>
          Manage and process book and journal requests from students and faculty
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

      {/* STATS & SEARCH BAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        flexWrap: "wrap",
        gap: "20px"
      }}>
        <div style={{
          padding: "15px 25px",
          background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(139, 115, 85, 0.08)",
          border: "1px solid #f5e6d3"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #d4a76a, #8b7355)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold"
            }}>
              📋
            </div>
            <div>
              <p style={{
                fontSize: "12px",
                color: "#8b7355",
                margin: "0",
                fontWeight: "600"
              }}>
                Total Requisitions
              </p>
              <p style={{
                fontSize: "24px",
                fontWeight: "800",
                color: "#5d4c3a",
                margin: "0"
              }}>
                {filtered.length}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          position: "relative",
          width: "100%",
          maxWidth: "400px"
        }}>
          <input
            placeholder="Search by Book / Journal Title..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            style={{
              width: "100%",
              padding: "14px 45px 14px 20px",
              border: "2px solid #f5e6d3",
              borderRadius: "12px",
              fontSize: "15px",
              background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
              color: "#5d4c3a",
              outline: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 20px rgba(139, 115, 85, 0.08)"
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#d4a76a";
              e.currentTarget.style.boxShadow = "0 4px 25px rgba(212, 167, 106, 0.15)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#f5e6d3";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(139, 115, 85, 0.08)";
            }}
          />
          <span style={{
            position: "absolute",
            right: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#d4a76a",
            fontSize: "20px"
          }}>
            🔍
          </span>
        </div>
      </div>

      {/* TABLE */}
      <div style={{
        background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(139, 115, 85, 0.08)",
        border: "1px solid #f5e6d3",
        overflow: "hidden",
        marginBottom: "30px"
      }}>
        <div style={{
          padding: "25px",
          borderBottom: "2px solid #f5e6d3",
          background: "#fffaf7"
        }}>
          <h3 style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#5d4c3a",
            margin: "0",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <span style={{
              width: "35px",
              height: "35px",
              background: "linear-gradient(135deg, #4f46e5, #3730a3)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold"
            }}>📚</span>
            All Requisitions ({filtered.length})
          </h3>
        </div>

        {loading ? (
          <div style={{
            padding: "60px 20px",
            textAlign: "center",
            color: "#8b7355"
          }}>
            <div style={{
              width: "50px",
              height: "50px",
              border: "4px solid #f5e6d3",
              borderTop: "4px solid #d4a76a",
              borderRadius: "50%",
              margin: "0 auto 20px",
              animation: "spin 1s linear infinite"
            }}></div>
            <p style={{ margin: "0", fontSize: "16px" }}>Loading requisitions...</p>
          </div>
        ) : (
          <>
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
                      Requester
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
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ 
                        padding: "60px 20px", 
                        textAlign: "center",
                        color: "#8b7355",
                        fontSize: "16px"
                      }}>
                        <div style={{
                          fontSize: "48px",
                          marginBottom: "20px",
                          opacity: "0.5"
                        }}>
                          📭
                        </div>
                        No requisitions found
                      </td>
                    </tr>
                  ) : (
                    paginated.map((r) => {
                      const status = r.status || "Pending";
                      const type = r.type || "Book";

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
                            padding: "16px"
                          }}>
                            <span style={{
                              padding: "8px 16px",
                              background: getTypeBgColor(type),
                              color: getTypeColor(type),
                              borderRadius: "20px",
                              fontWeight: "600",
                              fontSize: "13px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px"
                            }}>
                              {type === "Book" ? "📚" : "📰"}
                              {type}
                            </span>
                          </td>
                          <td style={{
                            padding: "16px",
                            color: "#5d4c3a",
                            fontWeight: "500",
                            fontSize: "14px"
                          }}>
                            {r.name}
                          </td>
                          <td style={{
                            padding: "16px",
                            color: "#8b7355",
                            fontWeight: "500",
                            fontSize: "14px"
                          }}>
                            {r.department}
                          </td>
                          <td style={{
                            padding: "16px"
                          }}>
                            <span style={{
                              padding: "8px 16px",
                              background: getStatusBgColor(status),
                              color: getStatusColor(status),
                              borderRadius: "20px",
                              fontWeight: "600",
                              fontSize: "13px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px"
                            }}>
                              {status === "Processed" ? "✅" : "⏳"}
                              {status}
                            </span>
                          </td>
                          <td style={{
                            padding: "16px"
                          }}>
                            {status === "Pending" ? (
                              <button 
                                onClick={() => updateStatus(r._id)}
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
                                <span>✅</span>
                                Mark Processed
                              </button>
                            ) : (
                              <span style={{
                                color: "#10b981",
                                fontWeight: "600",
                                fontSize: "14px",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px"
                              }}>
                                ✅ Processed
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap"
        }}>
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            style={{
              padding: "10px 18px",
              background: page === 1 ? "#f5e6d3" : "linear-gradient(135deg, #d4a76a, #8b7355)",
              color: page === 1 ? "#8b7355" : "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: page === 1 ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              opacity: page === 1 ? 0.6 : 1
            }}
          >
            ← Previous
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (page <= 3) {
              pageNum = i + 1;
            } else if (page >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = page - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                style={{
                  padding: "10px 16px",
                  minWidth: "45px",
                  background: page === pageNum ? 
                    "linear-gradient(135deg, #8b7355, #5d4c3a)" : 
                    "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
                  color: page === pageNum ? "white" : "#5d4c3a",
                  border: page === pageNum ? "none" : "2px solid #f5e6d3",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  boxShadow: page === pageNum ? 
                    "0 4px 12px rgba(139, 115, 85, 0.3)" : 
                    "0 4px 12px rgba(139, 115, 85, 0.08)"
                }}
                onMouseOver={(e) => {
                  if (page !== pageNum) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 6px 16px rgba(139, 115, 85, 0.15)";
                  }
                }}
                onMouseOut={(e) => {
                  if (page !== pageNum) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(139, 115, 85, 0.08)";
                  }
                }}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            style={{
              padding: "10px 18px",
              background: page === totalPages ? "#f5e6d3" : "linear-gradient(135deg, #d4a76a, #8b7355)",
              color: page === totalPages ? "#8b7355" : "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: page === totalPages ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              opacity: page === totalPages ? 0.6 : 1
            }}
          >
            Next →
          </button>

          <span style={{
            color: "#8b7355",
            fontSize: "14px",
            marginLeft: "15px",
            fontWeight: "500"
          }}>
            Page {page} of {totalPages} • {filtered.length} items
          </span>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}