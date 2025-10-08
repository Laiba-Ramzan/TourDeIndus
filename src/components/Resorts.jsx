import React, { useEffect, useState } from "react";
import service from "../services/appwrite";

function Resorts() {
  const [resorts, setResorts] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        const res = await service.getResorts();
        const docs = res?.documents || [];

        const urlsObj = {};
        for (const r of docs) {
          if (r.images) {
            if (typeof r.images === "string") {
              urlsObj[r.$id] = [service.getFileUrl(r.images)];
            } else if (Array.isArray(r.images)) {
              urlsObj[r.$id] = r.images.map((id) => service.getFileUrl(id));
            }
          } else {
            urlsObj[r.$id] = ["https://via.placeholder.com/400"];
          }
        }

        setResorts(docs);
        setImageUrls(urlsObj);
      } catch (error) {
        console.error("Error fetching resorts:", error);
      }
    };

    fetchResorts();
  }, []);

  return (
    <div className="bg-[#FDFBF7]">
      <section className="relative h-[70vh] flex items-center justify-center text-center text-white">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/539228061.jpg?k=abc243865e20b9ce733c5df5c7e5d250e7c9f00272ba5678d8c6723dc0b04381&o=&hp=1"
          alt="Resorts Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-6">
          <h1 className="text-5xl font-bold mb-4">Luxury Resorts of Sindh</h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-200">
            Discover serene stays surrounded by nature, heritage, and comfort.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#3B2F2F]">
          Our Handpicked Resorts
        </h2>

        {resorts.length === 0 ? (
          <p className="text-center text-gray-600">No resorts available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {resorts.map((resort) => {
              const images = imageUrls[resort.$id] || [];
              return (
                <div
                  key={resort.$id}
                  className="relative rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={images[0]}
                    alt={resort.name || "Resort"}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute bottom-0 left-0 p-5 text-white">
                    <h3 className="text-xl font-semibold mb-1">{resort.name}</h3>
                    <p className="text-sm text-gray-200 line-clamp-2">
                      {resort.description}
                    </p>
                    {resort.location && (
                      <p className="text-xs text-gray-300 mt-1">
                        {resort.location}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default Resorts;
