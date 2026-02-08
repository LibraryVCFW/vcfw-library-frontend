import React, { useEffect, useRef, useState } from "react";
import { getNotices } from "../services/api";
import "./NoticeSection.css";
import librarianImg from "../assets/librarian.jpg";

function NoticeSection() {
  const scrollRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState("");

  /* FETCH NOTICES (SAFE) */
  const loadNotices = async () => {
    try {
      const data = await getNotices();
      if (!Array.isArray(data)) {
        throw new Error("Invalid notice data");
      }
      setNotices(data);
      setError("");
    } catch (err) {
      console.error("Error loading notices", err);
      setError("Unable to load notices");
      setNotices([]);
    }
  };

  useEffect(() => {
    console.log("Fetching notices...");
    loadNotices();

    const interval = setInterval(loadNotices, 30000);
    return () => clearInterval(interval);
  }, []);

  /* AUTO SCROLL */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || paused || notices.length === 0) return;

    const interval = setInterval(() => {
      container.scrollTop += 1;
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight
      ) {
        container.scrollTop = 0;
      }
    }, 40);

    return () => clearInterval(interval);
  }, [paused, notices]);

  return (
    <>
      <div className="notice-section">
        {/* NOTICE BOARD */}
        <div
          className="notice-board"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onClick={() => setOpen(true)}
        >
          <div className="notice-header">Notice Board</div>

          <div className="notice-body" ref={scrollRef}>
            <div className="scrolling-container">
              {error && <p className="no-notice">{error}</p>}

              {!error && notices.length === 0 && (
                <p className="no-notice">No notices available</p>
              )}

              {notices.map((n) => (
                <div key={n._id} className="notice-item">
                  <p className="notice-title">📌 {n.title}</p>
                  <p className="notice-desc">{n.description}</p>

                  {n.link && (
                    <a
                      href={n.link}
                      target="_blank"
                      rel="noreferrer"
                      className="notice-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View / Download
                    </a>
                  )}
                </div>
              ))}

              {/* DUPLICATE FOR SMOOTH LOOP */}
              {notices.map((n) => (
                <div key={`loop-${n._id}`} className="notice-item">
                  <p className="notice-title">📌 {n.title}</p>
                  <p className="notice-desc">{n.description}</p>

                  {n.link && (
                    <a
                      href={n.link}
                      target="_blank"
                      rel="noreferrer"
                      className="notice-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View / Download
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="notice-footer">
            Click to view all notices
          </div>
        </div>

        {/* LIBRARIAN DESK */}
        <div className="librarian-desk">
          <h3>Librarian's Desk</h3>

          <div className="librarian-content">
            <img src={librarianImg} alt="Librarian" />

            <div className="librarian-text">
              <p>
                Welcome to the Vidyasagar College for Women Library! Our mission is to support your academic journey by providing a rich collection of resources and a conducive environment for learning and research. From our Central Library's vast collection of books, journals, and e-resources to the specialized Seminar Library for humanities, we strive to meet your academic and intellectual needs.
              </p>

              <p>
                We encourage students and faculty to explore our facilities, including the KOHA Library Management System and Web OPAC, for seamless access to materials. Your feedback and suggestions are always welcome as we work to enhance our services.
                Happy Reading!
              </p>

              <p className="signature">
                — Librarian
                <br />
                Vidyasagar College for Women
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="notice-modal">
          <div className="notice-modal-content">
            <span className="close-btn" onClick={() => setOpen(false)}>
              ✖
            </span>

            <h2>Notice Board</h2>

            {notices.map((n) => (
              <div key={`modal-${n._id}`} className="modal-notice">
                <h4>{n.title}</h4>
                <p>{n.description}</p>

                {n.link && (
                  <a href={n.link} target="_blank" rel="noreferrer">
                    View / Download
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default NoticeSection;