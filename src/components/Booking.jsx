import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import service from "../services/appwrite";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt } from "react-icons/fa";

function Booking() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

 
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await service.getPackages();
        const found = res.documents.find((p) => p.$id === id);
        setPkg(found);
      } catch (error) {
        toast.error("Failed to load package data",error);
      }
    };
    fetchPackage();
  }, [id]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      package_id: id,
      dates: formData.date,
      status: "pending",
    };

    try {
      await service.createBookings(bookingData);
      setIsConfirmed(true);
      toast.success("Booking created successfully!");
      setFormData({ name: "", email: "", phone: "", date: "" });
    } catch (error) {
      toast.error("Error creating booking: " + error.message);
    }
  };

  return (
    <div className="mt-16 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto bg-gradient-to-br from-[#5C4033] to-[#3E2C24] rounded-2xl shadow-2xl p-[2px]"
      >
        <div className="bg-[#f8f4ef] rounded-2xl p-8 py-9">
          <h2 className="text-3xl font-extrabold text-center text-[#3E2C24] mb-6">
            {pkg ? `Book ${pkg.name || pkg.title}` : "Book Your Trip"}
          </h2>

         
          <AnimatePresence>
            {isConfirmed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-green-100 text-green-800 font-semibold text-center p-4 rounded-lg mb-5 shadow-md"
              >
                 Congratulations! Your booking has been confirmed.
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-[#A78B73]" />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 p-3 border border-[#C8B6A6] bg-[#FAF8F5] rounded-lg"
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-[#A78B73]" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 p-3 border border-[#C8B6A6] bg-[#FAF8F5] rounded-lg"
              />
            </div>

            <div className="relative">
              <FaPhone className="absolute left-3 top-3 text-[#A78B73]" />
              <input
                type="text"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full pl-10 p-3 border border-[#C8B6A6] bg-[#FAF8F5] rounded-lg"
              />
            </div>

            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 text-[#A78B73]" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full pl-10 p-3 border border-[#C8B6A6] bg-[#FAF8F5] rounded-lg"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-gradient-to-r from-[#A67B5B] to-[#6F4E37] text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              Confirm Booking
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Booking;
