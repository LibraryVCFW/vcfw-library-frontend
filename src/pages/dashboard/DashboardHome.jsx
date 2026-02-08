import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getNotices,
  getResources,
  getGrievances,
} from "../../services/api";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    notices: 0,
    resources: 0,
    grievances: 0,
    resolved: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const notices = await getNotices();
      const resources = await getResources();
      const grievances = await getGrievances();

      const resolvedCount = grievances.filter(
        (g) => g.status === "Resolved"
      ).length;

      setStats({
        notices: notices.length,
        resources: resources.length,
        grievances: grievances.length,
        resolved: grievances.length
          ? Math.round((resolvedCount / grievances.length) * 100)
          : 0,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        padding: "60px 30px", 
        textAlign: "center",
        background: "linear-gradient(135deg, #fff9f0 0%, #fff5e6 100%)",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div style={{
          width: "60px",
          height: "60px",
          border: "4px solid #f5e6d3",
          borderTop: "4px solid #d4a76a",
          borderRadius: "50%",
          marginBottom: "20px",
          animation: "spin 1s linear infinite"
        }}></div>
        <p style={{ 
          color: "#8b7355", 
          fontSize: "16px",
          fontFamily: "'Segoe UI', sans-serif" 
        }}>
          Loading dashboard...
        </p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: "30px",
      minHeight: "80vh",
      background: "linear-gradient(135deg, #fff9f0 0%, #fff5e6 100%)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      
      {/* ================= HEADER ================= */}
      <div style={{ 
        marginBottom: "40px",
        textAlign: "center"
      }}>
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
          Library Dashboard
        </h1>
        <p style={{ 
          fontSize: "16px",
          color: "#8b7355",
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: "1.6"
        }}>
          Welcome back! Here's your complete overview of library activities
        </p>
      </div>

      {/* ================= STATISTICS CARDS ================= */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "25px",
        marginBottom: "50px"
      }}>
        <div style={{
          background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(139, 115, 85, 0.08)",
          border: "1px solid #f5e6d3",
          transition: "all 0.3s ease",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(139, 115, 85, 0.15)";
          e.currentTarget.style.borderColor = "#d4a76a";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(139, 115, 85, 0.08)";
          e.currentTarget.style.borderColor = "#f5e6d3";
        }}>
          <div style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, #d4a76a22, #8b735511)",
            borderRadius: "0 16px 0 80px"
          }}></div>
          <h3 style={{ 
            fontSize: "14px",
            fontWeight: "600",
            color: "#8b7355",
            marginBottom: "15px",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}>
            Total Notices
          </h3>
          <p style={{ 
            fontSize: "40px",
            fontWeight: "800",
            margin: "0",
            color: "#d4a76a",
            textShadow: "2px 2px 4px rgba(0,0,0,0.05)"
          }}>
            {stats.notices}
          </p>
          <div style={{
            display: "flex",
            alignItems: "center",
            marginTop: "15px"
          }}>
            <span style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              backgroundColor: "#d4a76a",
              borderRadius: "50%",
              marginRight: "8px"
            }}></span>
            <span style={{ 
              fontSize: "14px",
              color: "#8b7355",
              fontWeight: "500"
            }}>
              Active announcements
            </span>
          </div>
        </div>

        <div style={{
          background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(139, 115, 85, 0.08)",
          border: "1px solid #f5e6d3",
          transition: "all 0.3s ease",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(139, 115, 85, 0.15)";
          e.currentTarget.style.borderColor = "#d4a76a";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(139, 115, 85, 0.08)";
          e.currentTarget.style.borderColor = "#f5e6d3";
        }}>
          <div style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, #d4a76a22, #8b735511)",
            borderRadius: "0 16px 0 80px"
          }}></div>
          <h3 style={{ 
            fontSize: "14px",
            fontWeight: "600",
            color: "#8b7355",
            marginBottom: "15px",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}>
            Library Resources
          </h3>
          <p style={{ 
            fontSize: "40px",
            fontWeight: "800",
            margin: "0",
            color: "#d4a76a",
            textShadow: "2px 2px 4px rgba(0,0,0,0.05)"
          }}>
            {stats.resources}
          </p>
          <div style={{
            display: "flex",
            alignItems: "center",
            marginTop: "15px"
          }}>
            <span style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              backgroundColor: "#d4a76a",
              borderRadius: "50%",
              marginRight: "8px"
            }}></span>
            <span style={{ 
              fontSize: "14px",
              color: "#8b7355",
              fontWeight: "500"
            }}>
              Books & materials
            </span>
          </div>
        </div>

        <div style={{
          background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(139, 115, 85, 0.08)",
          border: "1px solid #f5e6d3",
          transition: "all 0.3s ease",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(139, 115, 85, 0.15)";
          e.currentTarget.style.borderColor = "#d4a76a";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(139, 115, 85, 0.08)";
          e.currentTarget.style.borderColor = "#f5e6d3";
        }}>
          <div style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, #d4a76a22, #8b735511)",
            borderRadius: "0 16px 0 80px"
          }}></div>
          <h3 style={{ 
            fontSize: "14px",
            fontWeight: "600",
            color: "#8b7355",
            marginBottom: "15px",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}>
            Active Grievances
          </h3>
          <p style={{ 
            fontSize: "40px",
            fontWeight: "800",
            margin: "0",
            color: "#d4a76a",
            textShadow: "2px 2px 4px rgba(0,0,0,0.05)"
          }}>
            {stats.grievances}
          </p>
          <div style={{
            display: "flex",
            alignItems: "center",
            marginTop: "15px"
          }}>
            <span style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              backgroundColor: stats.grievances > 0 ? "#e74c3c" : "#2ecc71",
              borderRadius: "50%",
              marginRight: "8px"
            }}></span>
            <span style={{ 
              fontSize: "14px",
              color: "#8b7355",
              fontWeight: "500"
            }}>
              {stats.grievances > 0 ? "Needs attention" : "All resolved"}
            </span>
          </div>
        </div>

        <div style={{
          background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(139, 115, 85, 0.08)",
          border: "1px solid #f5e6d3",
          transition: "all 0.3s ease",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(139, 115, 85, 0.15)";
          e.currentTarget.style.borderColor = "#d4a76a";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(139, 115, 85, 0.08)";
          e.currentTarget.style.borderColor = "#f5e6d3";
        }}>
          <div style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, #d4a76a22, #8b735511)",
            borderRadius: "0 16px 0 80px"
          }}></div>
          <h3 style={{ 
            fontSize: "14px",
            fontWeight: "600",
            color: "#8b7355",
            marginBottom: "15px",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}>
            Resolution Rate
          </h3>
          <p style={{ 
            fontSize: "40px",
            fontWeight: "800",
            margin: "0",
            color: "#d4a76a",
            textShadow: "2px 2px 4px rgba(0,0,0,0.05)"
          }}>
            {stats.resolved}%
          </p>
          <div style={{
            display: "flex",
            alignItems: "center",
            marginTop: "15px"
          }}>
            <span style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              backgroundColor: stats.resolved >= 80 ? "#2ecc71" : "#f39c12",
              borderRadius: "50%",
              marginRight: "8px"
            }}></span>
            <span style={{ 
              fontSize: "14px",
              color: "#8b7355",
              fontWeight: "500"
            }}>
              {stats.resolved >= 80 ? "Excellent" : "Needs improvement"}
            </span>
          </div>
        </div>
      </div>

      {/* ================= ACTION CARDS ================= */}
      <div style={{ 
        marginBottom: "40px",
        textAlign: "center"
      }}>
        <h2 style={{ 
          fontSize: "24px",
          fontWeight: "600",
          color: "#5d4c3a",
          marginBottom: "30px",
          position: "relative",
          display: "inline-block"
        }}>
          Quick Actions
          <span style={{
            position: "absolute",
            bottom: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "3px",
            background: "linear-gradient(90deg, #d4a76a, #8b7355)",
            borderRadius: "2px"
          }}></span>
        </h2>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "25px"
      }}>
        <Link to="notices" style={{
          display: "block",
          textDecoration: "none",
          background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
          borderRadius: "16px",
          padding: "30px 25px",
          boxShadow: "0 8px 32px rgba(139, 115, 85, 0.08)",
          transition: "all 0.4s ease",
          border: "1px solid #f5e6d3",
          position: "relative",
          overflow: "hidden"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 16px 40px rgba(139, 115, 85, 0.15)";
          e.currentTarget.style.borderColor = "#d4a76a";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(139, 115, 85, 0.08)";
          e.currentTarget.style.borderColor = "#f5e6d3";
        }}>
          <div style={{
            position: "absolute",
            top: "20px",
            right: "20px",
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
          }}>📢</div>
          <h3 style={{ 
            fontSize: "20px",
            fontWeight: "700",
            color: "#5d4c3a",
            marginBottom: "12px",
            paddingRight: "50px"
          }}>
            Manage Notices
          </h3>
          <p style={{ 
            fontSize: "14px",
            color: "#8b7355",
            lineHeight: "1.6",
            marginBottom: "20px"
          }}>
            Post, edit or remove library announcements and updates
          </p>
          <div style={{
            display: "flex",
            alignItems: "center",
            color: "#d4a76a",
            fontWeight: "600",
            fontSize: "14px"
          }}>
            <span>Access Panel</span>
            <span style={{ marginLeft: "8px", fontSize: "18px" }}>→</span>
          </div>
        </Link>

        <Link to="grievances" style={{
          display: "block",
          textDecoration: "none",
          background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
          borderRadius: "16px",
          padding: "30px 25px",
          boxShadow: "0 8px 32px rgba(139, 115, 85, 0.08)",
          transition: "all 0.4s ease",
          border: "1px solid #f5e6d3",
          position: "relative",
          overflow: "hidden"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 16px 40px rgba(139, 115, 85, 0.15)";
          e.currentTarget.style.borderColor = "#d4a76a";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(139, 115, 85, 0.08)";
          e.currentTarget.style.borderColor = "#f5e6d3";
        }}>
          <div style={{
            position: "absolute",
            top: "20px",
            right: "20px",
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
          }}>⚖️</div>
          <h3 style={{ 
            fontSize: "20px",
            fontWeight: "700",
            color: "#5d4c3a",
            marginBottom: "12px",
            paddingRight: "50px"
          }}>
            Manage Grievances
          </h3>
          <p style={{ 
            fontSize: "14px",
            color: "#8b7355",
            lineHeight: "1.6",
            marginBottom: "20px"
          }}>
            View and resolve user complaints and feedback
          </p>
          <div style={{
            display: "flex",
            alignItems: "center",
            color: "#d4a76a",
            fontWeight: "600",
            fontSize: "14px"
          }}>
            <span>Access Panel</span>
            <span style={{ marginLeft: "8px", fontSize: "18px" }}>→</span>
          </div>
        </Link>

        <Link to="requisitions" style={{
          display: "block",
          textDecoration: "none",
          background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
          borderRadius: "16px",
          padding: "30px 25px",
          boxShadow: "0 8px 32px rgba(139, 115, 85, 0.08)",
          transition: "all 0.4s ease",
          border: "1px solid #f5e6d3",
          position: "relative",
          overflow: "hidden"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 16px 40px rgba(139, 115, 85, 0.15)";
          e.currentTarget.style.borderColor = "#d4a76a";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(139, 115, 85, 0.08)";
          e.currentTarget.style.borderColor = "#f5e6d3";
        }}>
          <div style={{
            position: "absolute",
            top: "20px",
            right: "20px",
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
          }}>📚</div>
          <h3 style={{ 
            fontSize: "20px",
            fontWeight: "700",
            color: "#5d4c3a",
            marginBottom: "12px",
            paddingRight: "50px"
          }}>
            Book Requisitions
          </h3>
          <p style={{ 
            fontSize: "14px",
            color: "#8b7355",
            lineHeight: "1.6",
            marginBottom: "20px"
          }}>
            Process book requests, orders and acquisition
          </p>
          <div style={{
            display: "flex",
            alignItems: "center",
            color: "#d4a76a",
            fontWeight: "600",
            fontSize: "14px"
          }}>
            <span>Access Panel</span>
            <span style={{ marginLeft: "8px", fontSize: "18px" }}>→</span>
          </div>
        </Link>

        <Link to="manage-resources" style={{
          display: "block",
          textDecoration: "none",
          background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
          borderRadius: "16px",
          padding: "30px 25px",
          boxShadow: "0 8px 32px rgba(139, 115, 85, 0.08)",
          transition: "all 0.4s ease",
          border: "1px solid #f5e6d3",
          position: "relative",
          overflow: "hidden"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 16px 40px rgba(139, 115, 85, 0.15)";
          e.currentTarget.style.borderColor = "#d4a76a";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(139, 115, 85, 0.08)";
          e.currentTarget.style.borderColor = "#f5e6d3";
        }}>
          <div style={{
            position: "absolute",
            top: "20px",
            right: "20px",
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
          }}>➕</div>
          <h3 style={{ 
            fontSize: "20px",
            fontWeight: "700",
            color: "#5d4c3a",
            marginBottom: "12px",
            paddingRight: "50px"
          }}>
            Add New Arrivals
          </h3>
          <p style={{ 
            fontSize: "14px",
            color: "#8b7355",
            lineHeight: "1.6",
            marginBottom: "20px"
          }}>
            Add new books and resources to the library catalog
          </p>
          <div style={{
            display: "flex",
            alignItems: "center",
            color: "#d4a76a",
            fontWeight: "600",
            fontSize: "14px"
          }}>
            <span>Access Panel</span>
            <span style={{ marginLeft: "8px", fontSize: "18px" }}>→</span>
          </div>
        </Link>
      </div>
    </div>
  );
}