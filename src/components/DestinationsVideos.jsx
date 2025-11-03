import React, { useState, useEffect } from "react";
import tourVideo from "../assets/video.mp4";

// Add your tour image imports here
import tour1 from "../assets/image0.png";
import tour2 from "../assets/image!.png";
import tour3 from "../assets/image.png";
import tour4 from "../assets/image3.png";
import tour5 from "../assets/image4.png";
import tour6 from "../assets/image5.png";
import tour7 from "../assets/image6.png";
import tour8 from "../assets/image7.png";
import tour9 from "../assets/image8.png";
import tour10 from "../assets/image9.png";

export default function DestinationVideos() {
  const slides = [tour1, tour2, tour3, tour4, tour5, tour6, tour7, tour8, tour9, tour10];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="bg-[#F9F4EF] py-20 text-[#3B2F2F]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-[#5C4033]">
          Previous Tour Highlights
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-xl border border-[#D4A373]/30">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[400px] lg:h-[600px] object-cover"
            >
              <source src={tourVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden shadow-xl border border-[#D4A373]/30 h-[400px] lg:h-[600px]">
            {slides.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index + 1}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === current ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>

        <p className="mt-10 text-[#5C4033] max-w-2xl mx-auto text-center leading-relaxed">
          Relive the unforgettable moments from our past adventures across
          Sindh. From golden sands to lush mangroves — every frame tells a
          story.
        </p>
      </div>
    </section>
  );
}
