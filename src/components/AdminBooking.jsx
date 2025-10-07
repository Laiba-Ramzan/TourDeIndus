import React, { useEffect, useState } from "react";
import service from "../services/appwrite";
import {
  FaTrashAlt,
  FaCalendarAlt,
  FaEnvelope,
  FaUser,
  FaPhone,
} from "react-icons/fa";

function AdminBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await service.getBookings();
        setBookings(res.documents || []);
      } catch (error) {
        console.error("Error loading bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!confirmDelete) return;


    try {
      await service.deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b.$id !== id));
      alert(" Booking deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      alert(" Error deleting booking. Check console for details.");
    }
  };

  if (loading)
    return (
      <div className="text-center py-10 text-[#6F4E37] font-semibold text-lg">
        Loading bookings...
      </div>
    );

  if (bookings.length === 0)
    return (
      <div className="text-center py-10 text-[#A67B5B] font-semibold text-lg">
        No bookings found.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 mb-16 bg-[#FAF6F0] rounded-2xl shadow-lg border border-[#EADBC8]">
      <h2 className="text-3xl font-bold text-center text-[#4B2E1E] mb-8">
         All Bookings
      </h2>

      <div className="overflow-x-auto rounded-lg border border-[#E8DCC3] shadow-sm">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-gradient-to-r from-[#A67B5B] to-[#6F4E37] text-white">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Dates</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b, i) => (
              <tr
                key={b.$id}
                className={`border-b ${
                  i % 2 === 0 ? "bg-[#FFF8F2]" : "bg-white"
                } hover:bg-[#F5EBDD] transition-colors`}
              >
                <td className="py-3 px-4 text-[#4B2E1E]">
                  <span className="inline-flex items-center gap-2">
                    <FaUser className="text-[#A67B5B]" />
                    {b.name || "-"}
                  </span>
                </td>
                <td className="py-3 px-4 text-[#4B2E1E]">
                  <span className="inline-flex items-center gap-2">
                    <FaEnvelope className="text-[#A67B5B]" />
                    {b.email || "-"}
                  </span>
                </td>
                <td className="py-3 px-4 text-[#4B2E1E]">
                  <span className="inline-flex items-center gap-2">
                    <FaPhone className="text-[#A67B5B]" />
                    {b.phone || "-"}
                  </span>
                </td>
                <td className="py-3 px-4 text-[#4B2E1E]">
                  <span className="inline-flex items-center gap-2">
                    <FaCalendarAlt className="text-[#A67B5B]" />
                    {b.dates || "N/A"}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleDelete(b.$id)}
                    className="bg-[#8B4513] hover:bg-[#A0522D] text-white px-4 py-1.5 rounded-md shadow-md inline-flex items-center gap-2 transition"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminBooking;
