import React from "react";
import tourVideo from "../assets/video.mp4";

export default function DestinationVideos() {
  return (
    <section className="bg-[#F9F4EF] py-20 text-[#3B2F2F]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-10 text-[#5C4033]">
         Previous Tour Highlights
        </h2>

        <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-[#D4A373]/30">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[600px] object-cover rounded-2xl"
          >
            <source src={tourVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <p className="mt-8 text-[#5C4033] max-w-2xl mx-auto leading-relaxed">
          Relive the unforgettable moments from our past adventures across
          Sindh. From golden sands to lush mangroves — every frame tells a
          story.
        </p>
      </div>
    </section>
  );
}
