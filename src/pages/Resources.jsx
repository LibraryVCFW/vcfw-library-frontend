import { useEffect, useState } from "react";
import { getResources } from "../services/api";
import "./Resources.css";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const data = await getResources();
      setResources(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load resources");
    } finally {
      setLoading(false);
    }
  };

  const freeResources = [
    { name: "NDLI", url: "https://ndl.iitkgp.ac.in/", color: "warning" },
    { name: "JSTOR", url: "https://about.jstor.org/librarians/books/open-access-books-jstor/", color: "danger" },
    { name: "DOAJ", url: "https://doaj.org/", color: "secondary" },
    { name: "DOAB", url: "https://www.doabooks.org/", color: "success" },
    { name: "e-Gyankosh", url: "https://egyankosh.ac.in/", color: "danger" },
    { name: "Shodhganga", url: "https://shodhganga.inflibnet.ac.in:8443/jspui/", color: "white" },
    { name: "Internet Archive", url: "https://archive.org/", color: "primary" },
    { name: "J-Gate", url: "https://jgatenext.com/", color: "warning" },
    { name: "Wiley India", url: "https://www.wileyindia.com/?gad_source=1&gclid=CjwKCAiA-Oi7BhA1EiwA2rIu24rA2Swm71AuHNyPMJ0kNwGGfX3K3HyKDOORxUYy8B6zLqnzXKhg4hoCrIsQAvD_BwE", color: "danger" },
    { name: "Taylor & Francis", url: "https://www.tandfonline.com/#_blank", color: "secondary" },
    { name: "SWAYAM", url: "https://onlinecourses.swayam2.ac.in/", color: "success" },
    { name: "Open Learn", url: "https://www.open.edu/openlearn/", color: "danger" },
    { name: "South Asia Archive", url: "https://southasiacommons.net/", color: "white" },
    { name: "Cambridge Core", url: "https://www.cambridge.org/core/publications/open-access", color: "primary" },
    { name: "Elsevier", url: "https://www.elsevier.com/en-in/open-access", color: "warning" },
    { name: "UNESCO", url: "https://www.unesco.org/en/open-access", color: "danger" }
  ];

  return (
    <div className="resources-page">

      {/* ================= NEW ARRIVALS ================= */}
      <section className="resources-section">
        <h2 className="section-title">📚 New Arrivals</h2>

        {error && <p className="error-text">{error}</p>}
        {loading && <p>Loading resources…</p>}

        {!loading && resources.length === 0 && (
          <p>No new arrivals available.</p>
        )}

        {!loading && resources.length > 0 && (
          <table className="resources-table">
            <thead>
              <tr>
                <th>Sl</th>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>Year</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((r, index) => (
                <tr key={r._id}>
                  <td>{index + 1}</td>
                  <td>{r.title}</td>
                  <td>{r.author}</td>
                  <td>{r.publisher}</td>
                  <td>{r.year}</td>
                  <td>{r.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* ================= INSTITUTIONAL PUBLICATIONS ================= */}
      <section className="resources-section">
        <h2 className="section-title">🏛️ Institutional Publications</h2>

        <div className="publication-grid">
          <div className="publication-card">
            <img
              src="/placeholder-book.png"
              alt="Institutional Publication"
            />
            <a href="#" target="_blank" rel="noopener noreferrer">
              View Publication
            </a>
          </div>

          {/* Future items will be added here */}
        </div>
      </section>

      {/* ================= FREE RESOURCES ================= */}
      <section className="resources-section free-resources-section">
        <h2 className="section-title">🌐 Free Resources</h2>
        <p className="section-subtitle">Access a wide range of free educational resources from these trusted platforms</p>
        
        <div className="free-resources-container">
          <div className="free-resources-grid">
            {freeResources.map((resource, index) => (
              <a 
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`free-resource-btn btn-${resource.color}`}
              >
                <span className="resource-icon">📚</span>
                {resource.name}
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}