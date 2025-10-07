import React, { useState } from "react";
import service from "../services/appwrite";
import { toast } from "react-toastify";
import { FaWhatsapp, FaFacebook, FaEnvelope, FaUser } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await service.createContactRequest({
        ...formData,
        whatsapp: "03158617013",
        facebook: "https://www.facebook.com/share/1B1T4NtWiF/",
      });

      toast.success("Your message has been sent!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send your message!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 mb-20">
      <div className="bg-gradient-to-r from-[#A67B5B] to-[#6F4E37] rounded-2xl p-8 text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-4 text-center">Get in Touch</h2>
        <p className="text-center text-sm mb-6 opacity-90">
          We’d love to hear from you! Reach us directly through WhatsApp or Facebook.
        </p>

        <div className="flex justify-center gap-10 text-lg font-semibold">
          <a
            href="https://wa.me/923158617013"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-green-300 transition"
          >
            <FaWhatsapp className="text-2xl text-green-300" /> 0315-8617013
          </a>

          <a
            href="https://www.facebook.com/share/1B1T4NtWiF/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-300 transition"
          >
            <FaFacebook className="text-2xl text-blue-300" /> Facebook
          </a>
        </div>
      </div>

      <div className="bg-[#f8f4ef] rounded-2xl shadow-lg p-8 mt-8">
        <h3 className="text-2xl font-bold text-center text-[#3E2C24] mb-6">
          Send Us a Message
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-[#A67B5B]" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 p-3 border border-[#C8B6A6] bg-[#FAF8F5] rounded-lg focus:outline-none focus:border-[#A67B5B]"
              required
            />
          </div>

         
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-[#A67B5B]" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 p-3 border border-[#C8B6A6] bg-[#FAF8F5] rounded-lg focus:outline-none focus:border-[#A67B5B]"
              required
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-[#C8B6A6] bg-[#FAF8F5] rounded-lg h-32 focus:outline-none focus:border-[#A67B5B]"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#A67B5B] to-[#6F4E37] text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
