import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const user = localStorage.getItem("libraryUser");

  // user না থাকলে login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // user থাকলে ভিতরের page দেখাও
  return <Outlet />;
}
