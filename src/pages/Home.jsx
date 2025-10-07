import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/appwrite";
import Container from "../components/Container";

function Home() {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [resorts, setResorts] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const heroImages = [
    "https://www.laurewanders.com/wp-content/uploads/2024/12/Things-to-do-in-Sindh-00001.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/8b/0a/68/makli-hill.jpg?w=1200&h=-1&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/e8/9f/4d/tomb-of-dewan-shurfa.jpg?w=1400&h=-1&s=1",
    "https://thumbs.dreamstime.com/b/chaukhandi-tombs-cemetery-east-karachi-sindh-province-pakistan-historical-chaukhandi-tombs-cemetery-east-378889052.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const destRes = await service.getDestinations();
        const destWithPreviews = (destRes?.documents || []).map((d) => ({
          ...d,
          preview: service.getFileUrl(
            Array.isArray(d.images) ? d.images[0] : d.images
          ),
        }));
        setDestinations(destWithPreviews);

        const resortRes = await service.getResorts();
        const resortsWithPreviews = (resortRes?.documents || []).map((r) => ({
          ...r,
          preview: service.getFileUrl(
            Array.isArray(r.images) ? r.images[0] : r.images
          ),
        }));
        setResorts(resortsWithPreviews);

        const packageRes = await service.getPackages();
        const packagesWithPreviews = (packageRes?.documents || []).map((p) => ({
          ...p,
          preview: service.getFileUrl(
            Array.isArray(p.images) ? p.images[0] : p.images
          ),
        }));
        setPackages(packagesWithPreviews);

        setLoading(false);
      } catch (err) {
        console.error("API fetch error:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

 
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#D4A373] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-[#3B2F2F] font-semibold">
          </p>
        </div>
      </div>
    );

  return (
    <div className="bg-[#FDFBF7]">
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center">
     
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-center bg-cover transition-opacity duration-[2000ms] ease-in-out ${
              index === currentImage ? "opacity-100 z-0" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
            }}
          />
        ))}

       
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="relative z-20 max-w-3xl px-6 text-white animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Explore Sindh with Us
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6">
            Discover breathtaking destinations, luxury resorts, and exclusive
            travel packages.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/booking/:id")}
              className="bg-[#D4A373] text-white px-6 py-3 rounded-lg shadow hover:bg-[#b07c56] transition font-bold"
            >
              Book Now
            </button>
            <button
              onClick={() => navigate("/about-us")}
              className="bg-white text-[#3B2F2F] px-6 py-3 rounded-lg shadow hover:bg-gray-200 transition font-bold"
            >
              About Us
            </button>
          </div>
        </div>
      </section>

      <Container>
        <section className="py-16 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">
              Why Travel with <strong>Tour de Indus?</strong>
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We bring you the most authentic experiences of Sindh – from the
              dunes of Tharparkar to the serenity of Keenjhar Lake. Our
              dedicated services, curated resorts, and special travel packages
              ensure your journey is unforgettable.
            </p>
            <button
              onClick={() => navigate("/destinations")}
              className="bg-[#3B2F2F] text-white px-6 py-3 rounded-lg shadow hover:bg-[#5a4646] transition"
            >
              Explore More
            </button>
          </div>
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
              alt="Sindh Tourism"
              className="rounded-xl shadow-lg"
            />
          </div>
        </section>
      </Container>
      <Container>
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {destinations.slice(0, 3).map((d) => (
              <div
                key={d.$id}
                onClick={() => navigate(`/destinations/${d.$id}`)}
                className="cursor-pointer rounded-lg shadow-lg bg-white overflow-hidden hover:scale-[1.02] transition"
              >
                <img
                  src={d.preview}
                  alt={d.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2">{d.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {d.description}
                  </p>
                  <small className="text-gray-500">{d.location}</small>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>

      <section className="py-16 bg-[#F9F5F1]">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">
            Luxury Resorts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {resorts.slice(0, 3).map((r) => (
              <div
                key={r.$id}
                onClick={() => navigate(`/resorts/${r.$id}`)}
                className="cursor-pointer rounded-lg shadow-md bg-white overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={r.preview}
                  alt={r.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-semibold text-lg">{r.name}</h3>
                  <small className="text-gray-500">{r.location}</small>
                  <div className="mt-2 font-medium text-[#3B2F2F]">
                    {r.price_per_night
                      ? `PKR ${r.price_per_night}`
                      : "From PKR --"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container>
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Exclusive Travel Packages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {packages.slice(0, 3).map((p) => (
              <div
                key={p.$id}
                onClick={() => navigate(`/packages/${p.$id}`)}
                className="cursor-pointer rounded-lg shadow-md bg-white overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={p.preview}
                  alt={p.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {p.description}
                  </p>
                  <div className="mt-2 font-medium text-[#3B2F2F]">
                    {p.price ? `PKR ${p.price}` : "Contact for price"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>

      <section className="py-20 bg-[#3B2F2F] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Plan Your Next Trip Today</h2>
        <p className="text-lg mb-8">
          Sindh Tourism Development Corporation is here to make your journey
          memorable.
        </p>
        <button
          onClick={() => navigate("/contact")}
          className="bg-[#D4A373] text-white px-8 py-4 rounded-lg shadow hover:bg-[#b07c56] transition"
        >
          Contact Us
        </button>
      </section>
    </div>
  );
}

export default Home;
