import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminBooking from "../components/AdminBooking";

function AdminBookingPage() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isAdmin");
    if (isLoggedIn === "true") {
      setAuthorized(true);
      return;
    }

    const adminPassword = "admin123";
    const entered = prompt("🔐 Enter admin password to access bookings:");

    if (entered === adminPassword) {
      sessionStorage.setItem("isAdmin", "true");
      setAuthorized(true);
    } else {
      alert("❌ Access Denied");
      navigate("/");
    }
  }, [navigate]);

  if (!authorized)
    return (
      <div className="text-center py-10 text-[#6F4E37] text-lg font-semibold">
        Verifying access...
      </div>
    );

  return (
    <div className="py-8 bg-[#FFF9F3] min-h-screen">
      <AdminBooking />
    </div>
  );
}

export default AdminBookingPage;
