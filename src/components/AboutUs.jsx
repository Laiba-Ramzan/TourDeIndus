import React from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold mb-6 text-[#3E2F25]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          About <span className="text-[#6F4E37]">Tour De Indus</span>
        </motion.h2>

        <motion.p
          className="text-gray-700 leading-relaxed mb-12 max-w-3xl mx-auto text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Welcome to <span className="font-semibold text-[#6F4E37]">Tour De Indus</span> – 
          your gateway to exploring the <span className="text-[#3E2F25] font-medium">rich history</span>, 
          breathtaking landscapes, and cultural heritage of Sindh, Pakistan. <br />
          From the ancient ruins of <span className="font-semibold">Mithi</span> to 
          the serene beauty of <span className="font-semibold">Keenjhar Lake</span>, 
          we help you uncover the hidden gems of Sindh with comfort and ease.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Our Mission",
              desc: "To provide unforgettable travel experiences while preserving the cultural and natural beauty of Sindh."
              
            },
            {
              title: "Why Choose Us?",
              desc: "Easy bookings, trusted resorts, and carefully designed packages for every traveler."
              
            },
            {
              title: "Our Values",
              desc: "Safety, reliability, and respect for heritage and culture are at the core of everything we do."
              
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-[#FFF9F4] border border-[#E0D4C2] p-8 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.2 }}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold text-[#3E2F25] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={() => navigate("/packages")}
          className="mt-12 px-8 py-3 bg-[#6F4E37] hover:bg-[#5C3E2C] text-white rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Explore Packages
        </motion.button>
      </div>
    </div>
  );
}

export default AboutUs;
