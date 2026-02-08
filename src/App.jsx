import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

/* PUBLIC PAGES */
import Home from "./pages/Home";
import About from "./pages/About";
import Policies from "./pages/Policies";
import Gallery from "./pages/Gallery";
import Submission from "./pages/Submission";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Activities from "./pages/Activities";
import Grievance from "./pages/Grievance";
import Internship from "./pages/Internship";
import Feedback from "./pages/Feedback";

import TrackGrievance from "./pages/TrackGrievance";

/* STANDALONE PROFILE */
import DrSukantaPatra from "./pages/DrSukantaPatra";

/* DASHBOARD */
import Login from "./pages/dashboard/Login";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Notices from "./pages/dashboard/Notices";
import Grievances from "./pages/dashboard/Grievances";
import Requisitions from "./pages/dashboard/Requisitions";
import ManageResources from "./pages/dashboard/ManageResources";

function App() {
  return (
    <Routes>

      {/* ===== PUBLIC WEBSITE (WITH HEADER & FOOTER) ===== */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/submission-desk" element={<Submission />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/grievance" element={<Grievance />} />
        <Route path="/track-grievance" element={<TrackGrievance />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />
      </Route>

      {/* ===== STANDALONE PROFILE (NO HEADER / FOOTER) ===== */}
      <Route
        path="/team/dr-sukanta-patra"
        element={<DrSukantaPatra />}
      />

      <Route path="/internship" element={<Internship />} />
         

      {/* ===== LOGIN ===== */}
      <Route path="/login" element={<Login />} />

      {/* ===== DASHBOARD ===== */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="notices" element={<Notices />} />
        <Route path="grievances" element={<Grievances />} />
        <Route path="requisitions" element={<Requisitions />} />
        <Route path="manage-resources" element={<ManageResources />} />
      </Route>

    </Routes>
  );
}

export default App;
