import React from "react";
import { useLocation } from "react-router-dom";
import { Booking } from "../components";

function BookingPage() {
  const location = useLocation();
  console.log(" Current route:", location.pathname);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <Booking />
    </div>
  );
}

export default BookingPage;
