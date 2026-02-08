import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const IDLE_TIME = 15 * 60 * 1000; // 15 minutes

export default function DashboardLayout() {
  const navigate = useNavigate();
  const userRaw = localStorage.getItem("libraryUser");

  if (!userRaw) {
    return <Navigate to="/login" replace />;
  }

  let user;
  try {
    user = JSON.parse(userRaw);
  } catch {
    localStorage.removeItem("libraryUser");
    return <Navigate to="/login" replace />;
  }

  /* ===== AUTO LOGOUT ===== */
  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.removeItem("libraryUser");
        alert("Session expired. Please login again.");
        navigate("/login");
      }, IDLE_TIME);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div style={{ padding: "20px" }}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>{user.role}</p>
        </div>

        <div style={styles.headerBtns}>
          <button onClick={() => navigate(-1)}>⬅ Back</button>
          <button
            onClick={() => {
              localStorage.removeItem("libraryUser");
              navigate("/login");
            }}
            style={{ background: "#e74c3c", color: "#fff" }}
          >
            Logout
          </button>
        </div>
      </div>

      <Outlet />
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f1f5f9",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "20px",
  },
  headerBtns: {
    display: "flex",
    gap: "10px",
  },
};
