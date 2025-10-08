import React, { useState, useEffect } from "react";
import service from "../services/appwrite";
import { useDispatch } from "react-redux";
import { addBooking } from "../store/TourSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import { FaClock } from "react-icons/fa";

function Packages() {
  const [packages, setPackages] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await service.getPackages();
        const docs = res?.documents || [];

        const urlsObj = {};
        for (const p of docs) {
          if (p.images) {
            if (typeof p.images === "string") {
              urlsObj[p.$id] = [service.getFileUrl(p.images)];
            } else if (Array.isArray(p.images)) {
              urlsObj[p.$id] = p.images.map((id) => service.getFileUrl(id));
            }
          } else {
            urlsObj[p.$id] = ["https://via.placeholder.com/400"];
          }
        }

        setPackages(docs);
        setImageUrls(urlsObj);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleBooking = (pkg) => {
    dispatch(
      addBooking({
        id: pkg.$id,
        title: pkg.title,
        duration: pkg.duration,
        date: new Date().toISOString(),
      })
    );
    navigate(`/booking/${pkg.$id}`);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6F4E37]"></div>
      </div>
    );

  return (
    <div className="bg-white min-h-screen">
      <div
        className="relative w-full h-[300px] sm:h-[400px] bg-cover bg-center flex items-center justify-center text-white text-4xl font-extrabold tracking-wide shadow-inner"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/big-family-waiting-airport-sunny-day_149301-10501.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#3E2F25]/70"></div>
        <h1 className="relative z-10 text-center text-2xl sm:text-5xl drop-shadow-lg">
          Explore Sindh Tour Packages
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-3xl font-bold mb-10 text-center text-[#3E2F25]">
          Popular Travel Packages
        </h2>

        {packages.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No packages available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {packages.map((pkg) => {
              const images = imageUrls[pkg.$id] || [];

              return (
                <div
                  key={pkg.$id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-[#E0D4C2] transition-all hover:-translate-y-3 hover:shadow-2xl duration-300"
                >
                  {images.length > 1 ? (
                    <Swiper spaceBetween={10} slidesPerView={1} loop>
                      {images.map((url, idx) => (
                        <SwiperSlide key={idx}>
                          <img
                            src={url}
                            alt={pkg.title}
                            className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <img
                      src={images[0]}
                      alt={pkg.title}
                      className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#3E2F25] mb-2 group-hover:text-[#6F4E37] transition">
                      {pkg.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {pkg.description}
                    </p>

                    <div className="flex justify-start items-center mt-5 text-gray-700 text-sm">
                      <span className="flex items-center gap-2">
                        <FaClock className="text-[#6F4E37]" />{" "}
                        {pkg.duration || "3 Days / 2 Nights"}
                      </span>
                    </div>

                    <button
                      onClick={() => handleBooking(pkg)}
                      className="mt-6 w-full bg-[#6F4E37] hover:bg-[#5C3E2C] text-white py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Packages;
