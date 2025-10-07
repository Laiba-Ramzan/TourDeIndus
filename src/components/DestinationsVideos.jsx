import React from "react";
import service from "../services/appwrite";

const defaultVideoIds = [
  "68e4c830002be4409730",
  "68e4cad1001aea21b44a",
  "68e4cb0a00331c0208db"
];

export default function DestinationVideos({ ids = defaultVideoIds }) {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 tracking-tight">
          Previous Tours
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ids.map((id) => {
            const url = service.getFileUrl(id);
            return (
              <div
                key={id}
                className="group rounded-2xl overflow-hidden shadow-md bg-white border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative">
                  <video
                    controls
                    className="w-full h-64 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                    preload="metadata"
                  >
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
