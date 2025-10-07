import React from "react";
import { Link } from "react-router-dom";

function PackageCard({ pkg }) {
    console.log(" PackageCard loaded, pkg:", pkg);
  return (
    <div className="bg-[#f9f6f2] rounded-2xl shadow-md border border-[#d8cbb6] p-5 hover:shadow-xl transition">
      <h3 className="text-2xl font-bold text-[#3E2C24] mb-2">{pkg.name}</h3>
      <p className="text-[#5C4033] mb-4">{pkg.description}</p>
      <p className="text-sm text-[#6F4E37] mb-2">
        <strong>Price:</strong> {pkg.price} PKR
      </p>

      <Link
        to={`/booking/${pkg.$id}`}
        className="inline-block mt-3 bg-gradient-to-r from-[#A67B5B] to-[#6F4E37] text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
      >
        Book Now
      </Link>
    </div>
  );
}

export default PackageCard;
