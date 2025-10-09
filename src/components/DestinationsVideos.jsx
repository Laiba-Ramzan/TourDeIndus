import React from "react";
import tourVideo from "../assets/video.mp4";

export default function DestinationVideos() {
  return (
    <section className="bg-[#F9F4EF] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-[#3B2F2F]">
          Previous Tour
        </h2>

        <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-[#D4A373]/30">
          <video
            controls
            className="w-full h-[600px] object-cover rounded-2xl"
            preload="metadata"
          >
            <source src={tourVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
