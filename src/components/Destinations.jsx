// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import service from "../services/appwrite";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mediaUrls, setMediaUrls] = useState({});

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await service.getDestinations();
        const docs = res?.documents || [];

        const urlsObj = {};
        for (const d of docs) {
          const allMedia = [];

          if (d.images) {
            const imageIds = Array.isArray(d.images) ? d.images : [d.images];
            imageIds.forEach((id) => {
              allMedia.push({ type: "image", url: service.getFileUrl(id) });
            });
          }

          if (d.videos) {
            const videoIds = Array.isArray(d.videos) ? d.videos : [d.videos];
            videoIds.forEach((id) => {
              allMedia.push({ type: "video", url: service.getFileUrl(id) });
            });
          }

          if (allMedia.length === 0) {
            allMedia.push({
              type: "image",
              url: "https://via.placeholder.com/300",
            });
          }

          urlsObj[d.$id] = allMedia;
        }

        setDestinations(docs);
        setMediaUrls(urlsObj);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F9F4EF]">
        <div className="w-10 h-10 border-4 border-[#3B2F2F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F4EF] text-[#3B2F2F] overflow-hidden">
      <div
        className="relative h-[50vh] w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://seepakistantours.com/wp-content/uploads/2017/12/gorakh.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-[#F9F4EF]"
          >
            Discover Sindh’s Hidden Gems
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[#F9F4EF]/90 mt-4 max-w-2xl"
          >
            Explore the ancient heritage, deserts, and beaches of Sindh.
          </motion.p>
        </div>
      </div>
      <section className="px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-[#3B2F2F]">
            Top Destinations
          </h2>
          <div className="w-24 h-1 bg-[#3B2F2F] mx-auto mt-3 rounded"></div>
          <p className="text-[#5C4033] mt-4 max-w-2xl mx-auto">
            Choose from our curated list of destinations across Sindh.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {destinations.map((destination, i) => {
            const media = mediaUrls[destination.$id] || [];

            return (
              <motion.div
                key={destination.$id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition"
              >
                <Swiper spaceBetween={10} slidesPerView={1} loop>
                  {media.map((m, idx) => (
                    <SwiperSlide key={idx}>
                      {m.type === "image" ? (
                        <img
                          src={m.url}
                          alt={destination.title}
                          className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
                        />
                      ) : (
                        <video
                          src={m.url}
                          controls
                          className="w-full h-64 object-cover"
                        />
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="absolute bottom-4 left-4 right-4 text-[#3B2F2F]">
                  <h2 className="text-xl font-semibold">
                    {destination.title}
                  </h2>
                  <p className="text-sm text-[#5C4033]">
                    {destination.location}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      
    </div>
  );
}

export default Destinations;

   
