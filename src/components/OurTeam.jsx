import { Link } from "react-router-dom";
import "./OurTeam.css";

import librarian1 from "../assets/team/librarian1.jpeg";
import librarian2 from "../assets/team/librarian2.jpeg";
import clerk from "../assets/team/clerk.jpeg";

function OurTeam() {
  return (
    <section className="our-team">
      <h2>Our Library Team</h2>

      <p className="team-intro">
        Our library is managed by a team of qualified professionals dedicated
        to supporting teaching, learning, and research.
      </p>

      <div className="team-grid">

        {/* Librarian 1 */}
        <div className="team-card">
          <img src={librarian1} alt="Smt. Moumita Ash" />
          <h3>Smt. Moumita Ash</h3>
          <p className="designation">Librarian</p>
          <p className="qualification">MPhil, MLIS</p>
          <p className="email">📧 ashmoumita@gmail.com</p>
        </div>

        {/* Librarian 2 – CLICKABLE */}
        <Link to="/team/dr-sukanta-patra" className="team-link">
          <div className="team-card">
            <img src={librarian2} alt="Dr. Sukanta Kumar Patra" />
            <h3>Dr. Sukanta Kumar Patra</h3>
            <p className="designation">Librarian</p>
            <p className="qualification">PhD, MLIS, MBA</p>
            <p className="email">📧 skpatra1977@gmail.com</p>
          </div>
        </Link>

        {/* Library Clerk */}
        <div className="team-card">
          <img src={clerk} alt="Sri. Narottam Das" />
          <h3>Sri. Narottam Das</h3>
          <p className="designation">Library Clerk</p>
          <p className="qualification">B.A</p>
          <p className="email">📧 library.vcfw@gmail.com</p>
        </div>

      </div>
    </section>
  );
}

export default OurTeam;
