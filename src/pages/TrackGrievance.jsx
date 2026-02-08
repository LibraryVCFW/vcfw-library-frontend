import { useState } from "react";
import "./TrackGrievance.css";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function TrackGrievance() {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const trackGrievance = async () => {
    setError("");
    setResult(null);

    if (!trackingId.trim()) {
      setError("Please enter a Tracking ID");
      return;
    }

    try {
      const res = await fetch(
  `${API_BASE}/api/grievances/track/${trackingId}`
);

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid Tracking ID");
        return;
      }

      setResult(data);
    } catch (err) {
      setError("Unable to fetch grievance status");
    }
  };

  return (
    <div className="track-box">
      <h1>Track Your Grievance</h1>

      <input
        placeholder="Enter Tracking ID (e.g. LGR-STU-2026-1234)"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
      />

      <button onClick={trackGrievance}>
        Check Status
      </button>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result-box">
          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color:
                  result.status === "Resolved"
                    ? "green"
                    : "orange",
              }}
            >
              {result.status}
            </span>
          </p>

          <p>
            <strong>Submitted On:</strong>{" "}
            {new Date(result.createdAt).toLocaleDateString()}
          </p>

          {result.reply && (
            <div className="reply-box">
              <strong>Librarian Reply:</strong>
              <p>{result.reply}</p>
            </div>
          )}

          {result.status === "Pending" && (
            <p className="notice">
              ⏳ Your grievance will be addressed within 5 working
              days.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
