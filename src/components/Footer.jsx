import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
     
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-800">
      
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Sindh Tour</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Explore the rich culture, history, and natural beauty of Sindh.
            From desert landscapes to heritage sites — your unforgettable
            journey starts here.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-emerald-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/destinations" className="hover:text-emerald-400 transition">
                Destinations
              </a>
            </li>
            <li>
              <a href="/resorts" className="hover:text-emerald-400 transition">
                Resorts
              </a>
            </li>
            <li>
              <a href="/packages" className="hover:text-emerald-400 transition">
                Packages
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-emerald-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-emerald-600 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-emerald-600 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-emerald-600 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-emerald-600 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} Sindh Tour. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
