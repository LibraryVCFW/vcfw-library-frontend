console.log("NAVBAR RENDERED");

import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <NavLink to="/">
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/policies">
            <span>Policies</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">
            <span>About Us</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/gallery">
            <span>Gallery</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/submission-desk">
            <span>Submission Desk</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/resources">
            <span>Resources</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/activities">
            <span>Activities</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/grievance">
            <span>Grievance Cell</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact">
            <span>Contact Us</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}