import "./AboutLibrary.css";

/* Auto load jpg + jpeg images */
const images = Object.values(
  import.meta.glob("../../assets/library/*.{jpg,jpeg}", {
    eager: true,
    import: "default",
  })
);

function AboutLibrary() {
  return (
    <section className="about-library">
      <h2>About Our Library</h2>

      {/* IMAGE SCROLLER */}
      <div className="image-scroller">
        <div className="image-track">
          {images.concat(images).map((img, index) => (
            <div className="image-box" key={index}>
              <img src={img} alt="Library view" />
            </div>
          ))}
        </div>
      </div>

      {/* SINGLE INFO CARD */}
      <div className="about-grid">
        <div className="about-card single-card">
          <p>
            The Library of Vidyasagar College for Women functions as the academic
            hub of the institution, supporting teaching, learning, and research
            activities. It is committed to empowering students and faculty by
            providing access to diverse print and digital knowledge resources
            along with modern library services.
          </p>

          <p>
            The Central Library, located at 8A Shibnarayan Das Lane, is equipped
            with air-conditioned reading rooms and houses 27,946 books, 6
            newspapers, 41 journals, 1,95,000 e-books, and 6,239 e-journals. The
            library also provides access to the INFLIBNET N-LIST Consortium.
            Infrastructure facilities include a spacious stack room, Web OPAC
            with QR code integration, a search kiosk, and a fully automated KOHA
            Library Management System.
          </p>

          <p>
            In addition to the Central Library, the college maintains a Seminar
            Library of approximately 968.13 square feet, primarily supporting
            humanities faculty and students with around 5,000 books. Seven
            departmental workstations equipped with networked computers,
            internet access, and printing facilities are available. Faculty and
            students may consult and borrow reference materials from departmental
            seminar libraries for short-term academic use.
          </p>

          <p>
            Overall, the library ensures a technology-enabled, inclusive, and
            academically supportive environment through services such as Web
            OPAC access, reading rooms, reprographic facilities, and
            subject-specific seminar libraries.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutLibrary;
